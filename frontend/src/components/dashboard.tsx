import React, { useState } from 'react';
import { Target, Leaf, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string | null>(null); // No active tab by default
  const navigate = useNavigate();
  const username = "Example";
  const email = "example@gmail.com";

  const sidebarItems = [
    { id: 'missions', icon: Target, label: 'Missions' },
    { id: 'habitude', icon: Leaf, label: 'Habitude' },
    { id: 'logs', icon: FileText, label: 'Logs' },
  ];

  const onSwitchToProfile = () => {
    navigate('/profile');
  }

  const onSwitchToLogin = () => {
    navigate('/login');
  }
  const onSwitchToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col h-screen bg-[#c99e69]">
      <header className="flex items-center justify-center w-full px-1 py-4">
        <div className={`bg-black bg-opacity-25 text-[#f5f5f0] p-3 rounded-3xl w-5/6 max-w-screen-xl flex justify-between items-center`}>
          {/* Updated ZenZ logo with margin and Link */}
          <Link to="/">
            <h1 className="rounded text-2xl font-semibold cursor-pointer">ZenZ</h1>
          </Link>
          <div className="flex items-center space-x-2">
            <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToLogin}>
              Login
            </button>
            <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#3a3a3a] text-[#f5f5f0] flex flex-col">
          {/* Profile Section */}
          <div className="p-6 bg-[#2a2a2a] flex flex-col items-center">
            <img src=""  alt="User" className="w-24 h-24 mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">{username ? username : "Example"}</h2>
            <button
              className="rounded-lg w-full bg-transparent border border-[#f5f5f0] text-[#f5f5f0] hover:bg-[#d2b48c] hover:text-[#2a2a2a] px-4 py-2"
              onClick={onSwitchToProfile}
            >
              View Profile
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center ${
                  activeTab === item.id ? 'bg-[#2a2a2a] text-[#d2b48c]' : 'text-[#f5f5f0] hover:bg-[#2a2a2a] hover:text-[#d2b48c]'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
          <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">
            {/* {activeTab === 'profile' ? 'My Profile' : (activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Daily Streak')} */}
          </h2>
          <div className="rounded-lg bg-white shadow-lg p-6">
            {activeTab === 'profile' ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2a2a2a]">User Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
                    <p className="text-lg font-semibold text-[#2a2a2a]">Name</p>
                    <p className="text-[#3a3a3a]">{username}</p>
                  </div>
                  <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
                    <p className="text-lg font-semibold text-[#2a2a2a]">Email</p>
                    <p className="text-[#3a3a3a]">{email}</p>
                  </div>
                  <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
                    <p className="text-lg font-semibold text-[#2a2a2a]">Member Since</p>
                    <p className="text-[#3a3a3a]">January 1, 2023</p>
                  </div>
                  <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
                    <p className="text-lg font-semibold text-[#2a2a2a]">Location</p>
                    <p className="text-[#3a3a3a]">Unknown</p> {/* Placeholder for additional data */}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Daily Streak UI */}
                {/* <h2 className="text-2xl font-bold text-[#2a2a2a] mb-4">Daily Streak</h2> */}
                {/* <p className="text-sm text-[#2a2a2a] mb-4">“Keep pushing your limits!”</p> */}

                {/* Streak Progress Card */}
                <b><div className='text-2xl'>Login to view details!</div></b>
                
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
