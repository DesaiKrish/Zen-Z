import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { convert } from "../utils/DateConversion.js";

const createTask = asyncHandler( async (req, res) => {

    const { task, dueDate, priority, status } = req.body;

    if([task, dueDate, priority, status].some(field => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required")
    }

    const [day, month, year] = dueDate.split('-').map(num => parseInt(num, 10));

    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }

    const parsedDueDate = new Date(year, month - 1, day+1);

    if (isNaN(parsedDueDate.getTime())) {
        throw new ApiError(400, "Invalid date format. Use dd-mm-yyyy.");
    }
    console.log("User id: ",req.user._id);
    
    const newTask = await Task.create({
        task,
        dueDate: parsedDueDate,
        priority,
        status,
        user: req.user._id
    })

    const createdTask = await Task.findById(newTask._id).select("-user");

    if(!createdTask){
        throw new ApiError(500, "Something went wrong while creating task")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdTask, "Task created successfully")
    )

})

const updateTask = asyncHandler( async (req, res) => {
    
    const { task, updatedTask, updatedDueDate, updatedPriority, updatedStatus } = req.body;

    if(!updatedTask && !updatedDueDate && !updatedPriority && !updatedStatus){
        throw new ApiError(400, "Atleast update one field")
    }

    if(!task){
        throw new ApiError(400, "Current task name is required")
    }

    const userId = req.user._id;

    const currentTask = await Task.findOne({ user: userId, task: task }).exec();
    if (!currentTask) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if(updatedTask) currentTask.task = updatedTask;
    if(updatedDueDate){
        const newDate = convert(updatedDueDate);
        currentTask.dueDate = newDate;
    }
    if(updatedPriority) currentTask.priority = updatedPriority;
    if(updatedStatus) currentTask.status = updatedStatus;

    const newTask = await currentTask.save();

    if(!newTask){
        throw new ApiError(500, "Failed to update task, try again later")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, newTask, "Task updated successfully")
    )

})

const deleteTask = asyncHandler( async (req, res) => {

    const { task } = req.body;

    if(!task){
        throw new ApiError(400, "Task name is required")
    }

    const userId = req.user._id;

    const deletedTask = await Task.findOneAndDelete({ user: userId, task: task }).exec();
    if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedTask, "Task deleted successfully")
    )

})

const findAllTask = asyncHandler( async (req, res) => {

    const userId = req.user._id;

    const tasks = await Task.find({ user: userId }).select("-user").exec();

    if(!tasks){
        throw new ApiError(404, "No task found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, tasks, "All tasks")
    )

})

export{
    createTask,
    updateTask,
    deleteTask,
    findAllTask
}
