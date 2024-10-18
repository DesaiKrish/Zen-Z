/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "./ui/Header.tsx";
import Sidebar from "./ui/Sidebar.tsx";
import { useNavigate } from "react-router-dom";
import { Target, Leaf, FileText, Trash, Plus, Edit, X } from "lucide-react";

export default function T(props) {
  const navigate = useNavigate();

  // Initialize tasks as an empty array to store all task data
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState<any>({
    task: "",
    dueDate: "",
    priority: "Medium",
  });
  const [taskToEdit, setTaskToEdit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("missions");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const formatDate = (dateString: string) => {
    const options = {
      year: "numeric" as const,
      month: "2-digit" as const,
      day: "2-digit" as const,
    };
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toLocaleDateString("en-US", options); // Change 'en-US' to your preferred locale if needed
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks/findAllTask", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      // Map and format the dueDate for each task
      const formattedTasks = data.data.map((task: any) => ({
        ...task,
        dueDate: formatDate(task.dueDate),
      }));

      // Set the array of tasks into state
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching user missions data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onSwitchToProfile = () => {
    navigate("/profile");
  };

  const sidebarItems = [
    { id: "missions", icon: Target, label: "Missions" },
    { id: "habitude", icon: Leaf, label: "Habitude" },
    { id: "logs", icon: FileText, label: "Logs" },
  ];
  

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // const toggleTaskStatus = (task) => {
  //   setTasks(tasks.map(t => t.id === task.id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t));
  // }

  

  const handleAddTask = async () => {
    if (newTask.task && newTask.dueDate) {
      newTask.dueDate = newTask.dueDate.split('-').reverse().join('-');
      
      try {
        const response = await fetch("http://localhost:5000/api/tasks/createTask", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: newTask.task,
            dueDate: newTask.dueDate,
            priority: newTask.priority.toLowerCase(),
            status:"pending" 
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to create task");
        }
  
        // If task creation is successful, refresh tasks by calling fetchUserData
        await fetchUserData();
  
        // Clear the form and close the modal
        setNewTask({ task: "", dueDate: "", priority: "Medium", status: "pending" });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      console.error("Task description and due date are required.");
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task); // Store the task being edited
  
    // Pre-fill the edit form with task data
    setNewTask({
      task: task.task,
      dueDate: task.dueDate.split("-").reverse().join("-"), // format date if necessary
      priority: task.priority,
      status: task.status,
    });
  
    setIsModalOpen(true); // Open the modal to edit the task
  };
  
  const handleEditTask = async () => {
    if (!taskToEdit) {
      console.error("No task selected for editing.");
      return;
    }
  
    const { updatedTask, updatedDueDate, updatedPriority, updatedStatus } = newTask;
  
    if (updatedTask || updatedDueDate || updatedPriority || updatedStatus) {
      const formattedDueDate = updatedDueDate
        ? updatedDueDate.split("-").reverse().join("-")
        : null;
  
      try {
        const response = await fetch("http://localhost:5000/api/tasks/updateTask", {
          method: "PUT", // Assuming PUT for update
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: taskToEdit.task, // Current task name from taskToEdit
            updatedTask: updatedTask || undefined,
            updatedDueDate: formattedDueDate || undefined,
            updatedPriority: updatedPriority ? updatedPriority.toLowerCase() : undefined,
            updatedStatus: updatedStatus || undefined,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
  
        await fetchUserData();  // Refresh tasks
  
        // Clear the form and close the modal
        setNewTask({ task: "", dueDate: "", priority: "Medium", status: "pending" });
        setIsModalOpen(false);
        setTaskToEdit(null); // Reset after closing
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      console.error("At least one field must be updated.");
    }
  };


  return (
    <div className="flex flex-col h-screen bg-[#c99e69]">
         <Header color="bg-black"/>
      <div className="flex flex-1 overflow-hidden">
      <Sidebar username="Krish Desai"
          profilephoto="./krishavatar2.jpeg"/>

        {/* Main content displaying all tasks */}
        <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
        <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">Missions</h2>
          <div className="flex flex-col space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => {

              let textColor = 'text-black'; // Default text color
              const bgColor = task.priority === 'high' ? 'bg-blue-300' : task.priority === 'medium' ? 'bg-[#c99e69]' : 'bg-teal-200';

              if (task.priority === 'medium') {
                textColor = 'text-white';
              }

            return(
              <div key={index} className={`p-4 ${bgColor} shadow-md rounded-lg flex flex-col relative`}>
                <div className="flex items-center">
                <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      // onChange={() => toggleTaskStatus(task)}
                      className="mr-3 appearance-none rounded-full border border-black checked:bg-[#f13060] checked:border-transparent"
                      style={{ width: '20px', height: '20px' }} // Custom size
                    />
                <h4 className={`text-xl font-semibold ${textColor}`}>{task.task}</h4>
                </div>
                <p className={`text-gray-700 ${textColor}`}>Due Date: {task.dueDate}</p>
                <p className={`text-gray-700 ${textColor}`}>Priority: {task.priority}</p>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                    onClick={() => handleEditClick(task)}
                    className="p-1 text-white rounded-md"
                    >
                      <Edit className="h-4 w-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1 text-white rounded-md"
                    >
                      <Trash className="h-4 w-4 text-black" />
                    </button>
                </div>
              </div>
        
            );
        })
    )
           :(<p>No tasks available.</p>)}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 bg-[#c99e69] text-white p-3 rounded-full shadow-lg hover:bg-[#8b7355]"
          >
            <Plus className="h-6 w-6" />
          </button>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                {/* <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label> */}
                <input
                  id="task"
                  type="text"
                  placeholder='Write your task...'
                  value={newTask.task}
                  onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <input
                  id="dueDate"
                  type="date"
                  placeholder='Due Date'
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'High' | 'Medium' | 'Low'})}
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="High">high</option>
                  <option value="Medium">medium</option>
                  <option value="Low">low</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={taskToEdit ? handleEditTask : handleAddTask}
                className="w-full bg-[#c99e69] text-white hover:bg-[#8b7355] px-4 py-2 rounded-md"
              >
                {taskToEdit ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
