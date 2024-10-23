import React, { useEffect, useState } from "react";
import Header from "./ui/Header.tsx";
import Sidebar from "./ui/Sidebar.tsx";
import { Plus, Edit, Trash, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Habits() {
  const [habits, setHabits] = useState<any[]>([]);
  const [expandedHabitId, setExpandedHabitId] = useState<string | null>(null);
  const [newHabit, setNewHabit] = useState<any>({
    habit: "",
    goalFreq: 0,
    goalCounter: 0,
    progress: 0,
    goalType: "daily",
  });
  const [habitToEdit, setHabitToEdit] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHabits = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/habits/findAllHabit", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch habits");
      }

      const data = await response.json();
      const formattedHabits = data.data.map((habit: any) => ({
        ...habit,
      }));
      setHabits(formattedHabits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    if (newHabit.habit && newHabit.goalFreq > 0) {
      try {
        const response = await fetch("http://localhost:5000/api/habits/createHabit", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHabit),
        });

        if (!response.ok) {
          throw new Error("Failed to create habit");
        }

        await fetchHabits();
        setNewHabit({ habit: "", goalFreq: 0, goalCounter: 0, progress: 0, goalType: "daily" });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding habit:", error);
      }
    } else {
      console.error("Habit name and goal frequency are required.");
    }
  };

  const handleEditClick = (habit: any) => {
    setHabitToEdit(habit);
    setNewHabit({ ...habit });
    setIsModalOpen(true);
  };

  const handleEditHabit = async () => {
    if (!habitToEdit) {
      console.error("No habit selected for editing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/habits/updateHabit", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        throw new Error("Failed to update habit");
      }

      await fetchHabits();
      setNewHabit({ habit: "", goalFreq: 0, goalCounter: 0, progress: 0, goalType: "daily" });
      setIsModalOpen(false);
      setHabitToEdit(null);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleDeleteHabit = async (id: string) => {  
    try {
      const response = await fetch(`http://localhost:5000/api/habits/deleteHabit/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete habit");
      }

      await fetchHabits();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const toggleExpandHabit = (id: string) => {
    setExpandedHabitId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-screen bg-[#c99e69]">
      <Header color="bg-black" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar username="Krish Desai" profilephoto="./krishavatar2.jpg" />

        {/* Main content displaying all habits */}
        <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
          <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">Habits</h2>

          {/* Updated layout with two habit boxes per row */}
          <div className="grid grid-cols-2 gap-6">
            {habits.length > 0 ? (
              habits.map((habit, index) => {
                const isExpanded = expandedHabitId === habit._id;

                return (
                  <motion.div
                    key={habit._id}
                    className={`bg-[#c99e69] p-4 rounded-lg transition-all duration-300 cursor-pointer ${isExpanded ? "h-auto" : "h-40"}`}
                    onClick={() => toggleExpandHabit(habit._id)}
                    initial={{ scale: 1 }}
                    animate={{ scale: isExpanded ? 1.05 : 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Initially display habit, goal frequency, and goal type */}
                    <h4 className="text-3xl font-semibold text-white">{habit.habit}</h4><br/>
                    <p className="text-black">Goal: {habit.goalFreq} {habit.goalType}</p>

                    {/* Conditionally display progress bar and action buttons when expanded */}
                    {isExpanded && (
                    <div className="mt-2">
                        <p className="text-black">Progress: {habit.progress} / {habit.goalFreq}</p>
                        <div className="relative h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-black rounded-full"
                            style={{ width: `${(habit.progress / habit.goalFreq) * 100}%` }}
                        ></div>
                        </div>

                        {/* Edit and Delete buttons */}
                        <div className="flex space-x-2 mt-2">
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); // Prevent click from toggling habit expansion
                            handleEditClick(habit);
                            }}
                            className="p-2 text-black hover:bg-gray-200 rounded-md"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={(e) => {
                            e.stopPropagation(); 
                            handleDeleteHabit(habit._id);
                            }}
                            className="p-2 text-black hover:bg-gray-200 rounded-md"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                        </div>
                    </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <p>No habits available.</p>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 bg-[#c99e69] text-white p-3 rounded-full shadow-lg hover:bg-[#8b7355]"
          >
            <Plus className="h-6 w-6" />
          </button>
        </main>
      </div>

      {/* Modal for adding/editing habits */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{habitToEdit ? "Edit Habit" : "Add New Habit"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Habit"
                value={newHabit.habit}
                onChange={(e) => setNewHabit({ ...newHabit, habit: e.target.value })}
                className="mt-1 block w-full border rounded-md p-2"
              />
              <br />
              <label className="text-sm text-black">Goal Frequency</label>
              <input
                type="number"
                placeholder="Goal Frequency"
                value={newHabit.goalFreq}
                onChange={(e) => setNewHabit({ ...newHabit, goalFreq: parseInt(e.target.value) })}
                className="mt-1 block w-full border rounded-md p-2"
              />
              <button
                onClick={habitToEdit ? handleEditHabit : handleAddHabit}
                className="bg-[#c99e69] text-white p-2 rounded-lg w-full hover:bg-[#8b7355]"
              >
                {habitToEdit ? "Update Habit" : "Add Habit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}