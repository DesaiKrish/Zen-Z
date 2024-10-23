import { Habit } from "../models/habit.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createHabit = asyncHandler( async (req, res) => {
    const { habit, goalFreq, goalCounter, progress, goalType } = req.body;
    
    if ([habit, goalFreq, goalCounter, progress, goalType].some(field => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const newHabit = await Habit.create({
        habit,
        goalFreq,
        goalCounter,
        progress,
        goalType,
        user: req.user._id
    })
    
    const createdHabit = await Habit.findById(newHabit._id).select("-user");
    
    if(!createdHabit){
        throw new ApiError(500, "Something went wrong while creating habit")
    }
    
    return res
    .status(201)
    .json(
        new ApiResponse(201, createdHabit, "Habit created successfully")
    )
})

const updateHabit = asyncHandler( async (req, res) => {
    const { habit, updatedHabit, updatedGoalFreq, updatedGoalCounter, updatedProgress, updatedGoalType } = req.body;

    if(!updatedHabit && !updatedGoalFreq && !updatedGoalCounter && !updatedProgress && !updatedGoalType){
        throw new ApiError(400, "Atleast update one field")
    }

    if(!habit){
        throw new ApiError(400, "Current habit name is required")
    }

    const userId = req.user._id;

    const currentHabit = await Habit.findOne({ habit: habit, user: userId }).exec();

    if (!currentHabit) {
        return res.status(404).json({ message: 'Habit not found' });
    }

    if(updatedHabit) currentHabit.habit = updatedHabit;
    if(updatedGoalFreq) currentHabit.goalFreq = updatedGoalFreq;
    if(updatedGoalCounter) currentHabit.goalCounter = updatedGoalCounter;
    if(updatedProgress) currentHabit.progress = updatedProgress;
    if(updatedGoalType) currentHabit.goalType = updatedGoalType;

    const newHabit = await currentHabit.save();

    if(!newHabit){
        throw new ApiError(500, "Failed to update habit, try again later")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, newHabit, "Habit updated successfully")
    )
})

const deleteHabit = asyncHandler( async (req, res) => {
    const { id } = req.params;
    console.log("1 "+req.params.id);
    

    if(!id){
        throw new ApiError(400, "Habit Id name is required")
    }

    const userId = req.user._id;

    const deletedHabit = await Habit.findOneAndDelete({ _id: id, user: userId }).exec();

    if(!deletedHabit){
        throw new ApiError(404, "Habit not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedHabit, "Habit deleted successfully")
    )
})

const findAllHabit = asyncHandler( async (req, res) => {
    const userId = req.user._id;

    const habits = await Habit.find({ user: userId }).select("-user").exec();

    if(!habits){
        throw new ApiError(404, "No habits found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, habits, "All Habits")
    )
})

export{
    createHabit,
    updateHabit,
    deleteHabit,
    findAllHabit
}