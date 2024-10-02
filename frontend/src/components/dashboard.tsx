// import { useState } from 'react'
// import { Target, Leaf, FileText } from 'lucide-react'
// import React from 'react'

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('missions')

//   const sidebarItems = [
//     { id: 'missions', icon: Target, label: 'Missions' },
//     { id: 'habitude', icon: Leaf, label: 'Habitude' },
//     { id: 'logs', icon: FileText, label: 'Logs' },
//   ]

//   return (
//     <div className="flex flex-col h-screen bg-[#121212]">
//       {/* Header */}
//       <header className="bg-[#1e1e1e] text-[#e0e0e0] p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">ZenZ</h1>
//         <div className="space-x-2">
//           <button className="bg-transparent border border-[#e0e0e0] text-[#e0e0e0] hover:bg-[#2a2a2a] px-4 py-2">
//             Login
//           </button>
//           <button className="bg-[#8b7355] text-[#e0e0e0] hover:bg-[#6d5a43] px-4 py-2">
//             Sign Up
//           </button>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="w-72 bg-[#1e1e1e] text-[#e0e0e0] flex flex-col">
//           {/* Profile Section */}
//           <div className="p-6 bg-[#2a2a2a] flex flex-col items-center">
//             <img src="/placeholder.svg?height=96&width=96" alt="User" className="w-24 h-24 mb-4 rounded-full" />
//             <h2 className="text-xl font-semibold mb-2">User Name</h2>
//             <p className="text-sm text-[#8b7355] mb-4">user@example.com</p>
//             <button
//               className="w-full bg-transparent border border-[#e0e0e0] text-[#e0e0e0] hover:bg-[#8b7355] hover:text-[#1e1e1e] px-4 py-2"
//               onClick={() => setActiveTab('profile')}
//             >
//               View Profile
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-6">
//             {sidebarItems.map((item) => (
//               <button
//                 key={item.id}
//                 className={`w-full text-left mb-2 px-4 py-2 flex items-center ${
//                   activeTab === item.id ? 'bg-[#2a2a2a] text-[#8b7355]' : 'text-[#e0e0e0] hover:bg-[#2a2a2a] hover:text-[#8b7355]'
//                 }`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <item.icon className="mr-2 h-4 w-4" />
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-8 overflow-auto bg-[#121212]">
//           <h2 className="text-3xl font-semibold mb-6 text-[#e0e0e0]">
//             {activeTab === 'profile' ? 'My Profile' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//           </h2>
//           <div className="bg-[#1e1e1e] shadow-md border border-[#2a2a2a] p-6">
//             {activeTab === 'profile' ? (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-[#e0e0e0]">User Details</h3>
//                 <p className="text-[#b0b0b0]">Name: User Name</p>
//                 <p className="text-[#b0b0b0]">Email: user@example.com</p>
//                 <p className="text-[#b0b0b0]">Member since: January 1, 2023</p>
//               </div>
//             ) : (
//               <p className="text-[#b0b0b0]">
//                 This is the {activeTab} content. Replace this with actual content for each tab.
//               </p>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }




// import React, { useState } from 'react';
// import { Target, Leaf, FileText } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useNavigate} from 'react-router-dom';

// interface DashboardProps {
//   username: string;
//   email: string;
//   profilePhoto: string;
// }

// export default function Dashboard({ username, email, profilePhoto }: DashboardProps) {
//   const [activeTab, setActiveTab] = useState<string | null>(null); // No active tab by default
//   const navigate = useNavigate();

//   const sidebarItems = [
//     { id: 'missions', icon: Target, label: 'Missions' },
//     { id: 'habitude', icon: Leaf, label: 'Habitude' },
//     { id: 'logs', icon: FileText, label: 'Logs' },
//   ];

//   const onSwitchToLogin = () => {
//     navigate('/login');
//   }
//   const onSwitchToSignup = () => {
//     navigate('/signup'); // Navigate to the signup route
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#8b7355]">
//       {/* Header */}
//       <header className="bg-gradient-to-br from-[#c99e69] to-[#c99e69] text-[#f5f5f0] p-4 flex justify-between items-center">
//         {/* Updated ZenZ logo with margin and Link */}
//         <Link to="/">
//           <h1 className="rounded text-2xl font-semibold ml-8 cursor-pointer">ZenZ</h1>
//         </Link>
//         <div className="space-x-2">
//           <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToLogin}>
//             Login
//           </button>
//           <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToSignup}>
//             Sign Up
//           </button>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="w-72 bg-[#3a3a3a] text-[#f5f5f0] flex flex-col">
//           {/* Profile Section */}
//           <div className="p-6 bg-[#2a2a2a] flex flex-col items-center">
//             <img src={`${profilePhoto}?height=96&width=96`} alt="User" className="w-24 h-24 mb-4 rounded-full" />
//             <h2 className="text-xl font-semibold mb-2">{username}</h2>
//             <p className="text-sm text-[#d2b48c] mb-4">{email}</p>
//             <button
//               className="rounded-lg w-full bg-transparent border border-[#f5f5f0] text-[#f5f5f0] hover:bg-[#d2b48c] hover:text-[#2a2a2a] px-4 py-2"
//               onClick={() => setActiveTab('profile')}
//             >
//               View Profile
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-6">
//             {sidebarItems.map((item) => (
//               <button
//                 key={item.id}
//                 className={`rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center ${
//                   activeTab === item.id ? 'bg-[#2a2a2a] text-[#d2b48c]' : 'text-[#f5f5f0] hover:bg-[#2a2a2a] hover:text-[#d2b48c]'
//                 }`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <item.icon className="mr-2 h-4 w-4" />
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
//           <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">
//             {activeTab === 'profile' ? 'My Profile' : (activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Dashboard')}
//           </h2>
//           <div className="rounded-lg bg-white shadow-lg p-6"> {/* Replaced border with shadow-lg */}
//             {activeTab === 'profile' ? (
//               <div className="space-y-4">
//                 {/* Profile Info Styling */}
//                 <h3 className="text-xl font-semibold text-[#2a2a2a]">User Details</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md"> {/* Added shadow to profile details box */}
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Name</p>
//                     <p className="text-[#3a3a3a]">{username}</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md"> {/* Added shadow to profile details box */}
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Email</p>
//                     <p className="text-[#3a3a3a]">{email}</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md"> {/* Added shadow to profile details box */}
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Member Since</p>
//                     <p className="text-[#3a3a3a]">January 1, 2023</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md"> {/* Added shadow to profile details box */}
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Location</p>
//                     <p className="text-[#3a3a3a]">Unknown</p> {/* Placeholder for additional data */}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-[#3a3a3a]">
//                 This is the {activeTab ? activeTab : 'Dashboard'} content. Replace this with actual content for each tab.
//               </p>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import { Target, Leaf, FileText } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// interface DashboardProps {
//   username: string;
//   email: string;
//   profilePhoto: string;
// }

// export default function Dashboard({ username, email, profilePhoto }: DashboardProps) {
//   const [activeTab, setActiveTab] = useState<string | null>(null); // No active tab by default
//   const navigate = useNavigate();

//   const sidebarItems = [
//     { id: 'missions', icon: Target, label: 'Missions' },
//     { id: 'habitude', icon: Leaf, label: 'Habitude' },
//     { id: 'logs', icon: FileText, label: 'Logs' },
//   ];

//   const onSwitchToLogin = () => {
//     navigate('/login');
//   }
//   const onSwitchToSignup = () => {
//     navigate('/signup'); // Navigate to the signup route
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#8b7355]">
//       {/* Centered Header */}
//       <header className="p-4 flex justify-center">
//         <div className="bg-gray-800 bg-opacity-25 text-[#f5f5f0] p-3 rounded-3xl w-5/6 max-w-screen-xl flex justify-between items-center">
//           {/* Updated ZenZ logo with margin and Link */}
//           <Link to="/">
//             <h1 className="rounded text-2xl font-semibold cursor-pointer">ZenZ</h1>
//           </Link>
//           <div className="space-x-2">
//             <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToLogin}>
//               Login
//             </button>
//             <button className="rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2" onClick={onSwitchToSignup}>
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="w-72 bg-[#3a3a3a] text-[#f5f5f0] flex flex-col">
//           {/* Profile Section */}
//           <div className="p-6 bg-[#2a2a2a] flex flex-col items-center">
//             <img src={`${profilePhoto}?height=96&width=96`} alt="User" className="w-24 h-24 mb-4 rounded-full" />
//             <h2 className="text-xl font-semibold mb-2">{username}</h2>
//             <p className="text-sm text-[#d2b48c] mb-4">{email}</p>
//             <button
//               className="rounded-lg w-full bg-transparent border border-[#f5f5f0] text-[#f5f5f0] hover:bg-[#d2b48c] hover:text-[#2a2a2a] px-4 py-2"
//               onClick={() => setActiveTab('profile')}
//             >
//               View Profile
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-6">
//             {sidebarItems.map((item) => (
//               <button
//                 key={item.id}
//                 className={`rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center ${
//                   activeTab === item.id ? 'bg-[#2a2a2a] text-[#d2b48c]' : 'text-[#f5f5f0] hover:bg-[#2a2a2a] hover:text-[#d2b48c]'
//                 }`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <item.icon className="mr-2 h-4 w-4" />
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
//           <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">
//             {activeTab === 'profile' ? 'My Profile' : (activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Dashboard')}
//           </h2>
//           <div className="rounded-lg bg-white shadow-lg p-6">
//             {activeTab === 'profile' ? (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-[#2a2a2a]">User Details</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Name</p>
//                     <p className="text-[#3a3a3a]">{username}</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Email</p>
//                     <p className="text-[#3a3a3a]">{email}</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Member Since</p>
//                     <p className="text-[#3a3a3a]">January 1, 2023</p>
//                   </div>
//                   <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
//                     <p className="text-lg font-semibold text-[#2a2a2a]">Location</p>
//                     <p className="text-[#3a3a3a]">Unknown</p> {/* Placeholder for additional data */}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-[#3a3a3a]">
//                 This is the {activeTab ? activeTab : 'Dashboard'} content. Replace this with actual content for each tab.
//               </p>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Target, Leaf, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  username: string;
  email: string;
  profilePhoto: string;
}

export default function Dashboard({ username, email, profilePhoto }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null); // No active tab by default
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'missions', icon: Target, label: 'Missions' },
    { id: 'habitude', icon: Leaf, label: 'Habitude' },
    { id: 'logs', icon: FileText, label: 'Logs' },
  ];

  const data = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3 },
    { name: 'Wed', hours: 4 },
    { name: 'Thu', hours: 1 },
    { name: 'Fri', hours: 5 },
    { name: 'Sat', hours: 3 },
    { name: 'Sun', hours: 2 },
  ];

  const onSwitchToLogin = () => {
    navigate('/login');
  }
  const onSwitchToSignup = () => {
    navigate('/signup'); // Navigate to the signup route
  };

  return (
    <div className="flex flex-col h-screen bg-[#8b7355]">
      {/* Centered Header */}
      <header className="p-4 flex justify-center">
        <div className="bg-gray-800 bg-opacity-25 text-[#f5f5f0] p-3 rounded-3xl w-5/6 max-w-screen-xl flex justify-between items-center">
          {/* Updated ZenZ logo with margin and Link */}
          <Link to="/">
            <h1 className="rounded text-2xl font-semibold cursor-pointer">ZenZ</h1>
          </Link>
          <div className="space-x-2">
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
            <img src={`${profilePhoto}?height=96&width=96`} alt="User" className="w-24 h-24 mb-4 rounded-full" />
            <h2 className="text-xl font-semibold mb-2">{username}</h2>
            <p className="text-sm text-[#d2b48c] mb-4">{email}</p>
            <button
              className="rounded-lg w-full bg-transparent border border-[#f5f5f0] text-[#f5f5f0] hover:bg-[#d2b48c] hover:text-[#2a2a2a] px-4 py-2"
              onClick={() => setActiveTab('profile')}
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
            {activeTab === 'profile' ? 'My Profile' : (activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'Daily Streak')}
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
                <div className="bg-[#c99e61] p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-[#f5f5f0]">Current Streak: 5 Days</h3>
                  <p className="text-sm text-[#f5f5f0]">Days to next milestone: 2</p>
                  {/* <div className="h-2 bg-white rounded-full" style={{ width: '40%' }}></div> */}
                  <div className="h-2 bg-white rounded-full transition-transform transform hover:scale-105 hover:bg-gray-400 hover:shadow-lg" style={{ width: '40%' }}></div>

                </div>

                {/* Activity Summary Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#8b7355] p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#f5f5f0]">Time Spent</h4>
                    <p className="text-xl text-[#f5f5f0]">2 hours</p>
                  </div>
                  <div className="bg-[#c99e61] p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#f5f5f0]">Logs Written</h4>
                    <p className="text-xl text-[#f5f5f0]">5 logs</p>
                  </div>
                  <div className="bg-[#8b7355] p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#f5f5f0]">Habits Logged</h4>
                    <p className="text-xl text-[#f5f5f0]">3 habits</p>
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>

                {/* Graph Section */}
                <h3 className="text-3xl font-semibold text-[#c99e69] mb-4">Activity Over the Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#8b7355" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>

                <br></br>
                <br></br>

                {/* Achievements Section */}
                <div className="bg-[#c99e69] p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold text-[#f5f5f0]">Achievements</h4>
                  <br></br>

                  <div className="flex mb-6 justify-evenly">
                    <p className="text-md text-[#f5f5f0]"><span className="text-6xl">🏅</span> 5-Day Streak</p>
                    <p className="text-md text-[#f5f5f0]"><span className="text-6xl">🏆</span> Habit Master</p>
                  </div>
                </div>

                {/* Encouragement Section */}
                <div className=" p-4 rounded-lg mb-6">
                  <h4 className="text-lg font-semibold text-[#774f1d]">Keep Going!</h4>
                  <p className="text-sm font-semibold text-amber-900">You are doing great! Every day counts!</p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
