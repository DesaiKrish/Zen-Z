import React, { useEffect, useState } from "react";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import { useNavigate } from "react-router-dom";
import { Target, Leaf, FileText, Trash, Plus, Edit, X, Book } from "lucide-react";

export default function JournalPage() {
  const navigate = useNavigate();

  const [journals, setJournals] = useState<any[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<any>(null);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [newJournalTitle, setNewJournalTitle] = useState("");

  const fetchJournals = async () => {
    // Simulated API call - replace with actual API call
    const mockJournals = [
      { id: 1, title: "My First Journal", entries: [
        { id: 1, title: "Chapter 1", content: "Today was a good day...", date: "2023-05-01" },
        { id: 2, title: "Chapter 2", content: "I learned something new...", date: "2023-05-02" },
      ]},
      { id: 2, title: "Travel Journal", entries: [
        { id: 3, title: "Paris Trip", content: "The Eiffel Tower was amazing...", date: "2023-06-15" },
      ]},
    ];
    setJournals(mockJournals);
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleJournalClick = (journal: any) => {
    setSelectedJournal(journal);
  };

  const handleAddEntry = async () => {
    if (newEntry.title && newEntry.content) {
      // Simulated API call - replace with actual API call
      const updatedJournal = {
        ...selectedJournal,
        entries: [
          ...selectedJournal.entries,
          { id: Date.now(), ...newEntry, date: new Date().toISOString().split('T')[0] }
        ]
      };
      setJournals(journals.map(j => j.id === selectedJournal.id ? updatedJournal : j));
      setSelectedJournal(updatedJournal);
      setNewEntry({ title: "", content: "" });
      setIsEntryModalOpen(false);
    }
  };

  const handleDeleteEntry = (entryId: number) => {
    const updatedJournal = {
      ...selectedJournal,
      entries: selectedJournal.entries.filter((entry: any) => entry.id !== entryId)
    };
    setJournals(journals.map(j => j.id === selectedJournal.id ? updatedJournal : j));
    setSelectedJournal(updatedJournal);
  };

  const handleAddJournal = async () => {
    if (newJournalTitle) {
      // Simulated API call - replace with actual API call
      const newJournal = { id: Date.now(), title: newJournalTitle, entries: [] };
      setJournals([...journals, newJournal]);
      setNewJournalTitle("");
      setIsJournalModalOpen(false);
    }
  };

  const sidebarItems = [
    { id: "missions", icon: Target, label: "Missions" },
    { id: "habitude", icon: Leaf, label: "Habitude" },
    { id: "logs", icon: FileText, label: "Logs" },
    { id: "journal", icon: Book, label: "Journal" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#c99e69]">
      <Header color="bg-black" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar username="Krish Desai" profilephoto="./krishavatar2.jpeg" />
        <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
          <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">Journal</h2>
          <div className="flex space-x-4">
            <div className="w-1/3 space-y-4">
              {journals.map((journal) => (
                <div
                  key={journal.id}
                  onClick={() => handleJournalClick(journal)}
                  className={`p-4 bg-[#c99e69] shadow-md rounded-lg cursor-pointer ${
                    selectedJournal?.id === journal.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white">{journal.title}</h3>
                  <p className="text-white">{journal.entries.length} entries</p>
                </div>
              ))}
            </div>
            <div className="w-2/3 space-y-4">
              {selectedJournal && selectedJournal.entries.map((entry: any) => (
                <div key={entry.id} className="p-4 bg-white shadow-md rounded-lg relative">
                  <h4 className="text-xl font-semibold">{entry.title}</h4>
                  <p className="text-gray-600">{entry.date}</p>
                  <p className="mt-2">{entry.content}</p>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {selectedJournal && (
            <button
            onClick={() => setIsEntryModalOpen(true)}
            className="fixed bottom-8 right-8 bg-[#c99e69] text-white p-3 rounded-full shadow-lg hover:bg-[#8b7355]"
          >
            <Plus className="h-6 w-6" />
          </button>
          )}
          <button
            onClick={() => setIsJournalModalOpen(true)}
            className="fixed bottom-8 left-[20rem] bg-[#c99e69] text-white p-3 rounded-full shadow-lg hover:bg-[#8b7355]"
          >
            <Book className="h-6 w-6" />
          </button>
          
        </main>
      </div>

      {/* Modal for adding a new entry */}
      {isEntryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Entry</h3>
              <button onClick={() => setIsEntryModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Entry title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                className="w-full border rounded-md p-2"
              />
              <textarea
                placeholder="Write your journal entry..."
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                className="w-full h-40 border rounded-md p-2 resize-none"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleAddEntry}
                className="w-full bg-[#c99e69] text-white hover:bg-[#8b7355] px-4 py-2 rounded-md"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding a new journal */}
      {isJournalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Journal</h3>
              <button onClick={() => setIsJournalModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Journal title"
                value={newJournalTitle}
                onChange={(e) => setNewJournalTitle(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleAddJournal}
                className="w-full bg-[#8b7355] text-white hover:bg-[#c99e69] px-4 py-2 rounded-md"
              >
                Save Journal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
