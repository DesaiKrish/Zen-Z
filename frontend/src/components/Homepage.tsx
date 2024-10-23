import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from './ui/Header.tsx';
import Sidebar from './ui/Sidebar.tsx';

interface DashboardProps {
  username: string;
  email: string;
  profilePhoto: string;
}

export default function Homepage({ username, email, profilePhoto }: DashboardProps) {

  const data = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3 },
    { name: 'Wed', hours: 4 },
    { name: 'Thu', hours: 1 },
    { name: 'Fri', hours: 5 },
    { name: 'Sat', hours: 3 },
    { name: 'Sun', hours: 2 },
  ];

 
  return (
    <div className="flex flex-col h-screen bg-[#c99e69]">
      
      <Header color="bg-black"/>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar username="Krish Desai"
                 profilephoto="./krishavatar2.jpg"/>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto bg-[#f5f5f0]">
          <h2 className="text-3xl font-semibold mb-6 text-[#2a2a2a]">
            Daily Streak
          </h2>
          
          <div className="rounded-lg bg-white shadow-lg p-6">
              <>
                <div className="bg-[#c99e61] p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-[#f5f5f0]">Current Streak: 5 Days</h3>
                  <p className="text-sm text-[#f5f5f0]">Days to next milestone: 2</p>
                  {/* <div className="h-2 bg-white rounded-full" style={{ width: '40%' }}></div> */}
                  <div className="h-2 bg-white rounded-full transition-transform transform hover:scale-105 hover:bg-black hover:shadow-lg" style={{ width: '40%' }}></div>

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
          </div>
        </main>
      </div>
    </div>
  );
}
