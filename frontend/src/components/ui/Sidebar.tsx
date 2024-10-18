import React from "react";
import { useNavigate } from "react-router-dom";
import { Target, Leaf, FileText } from "lucide-react";


const Sidebar = (props) => {
    const navigate = useNavigate();
    const onSwitchToProfile = () => {
      navigate('/profile');
    }
    const onSwitchToMissions = () => {
      navigate('/missions');
    }
    const onSwitchToHabitude = () => {
      navigate('/habitude');
    }
    const onSwitchToLogs = () => {
      navigate('/logs');
    }
      return (
        <div className="flex flex-col h-screen bg-[#c99e69]">
      
     
        <div className="flex flex-1 overflow-hidden">

        <aside className="w-72 bg-[#3a3a3a] text-[#f5f5f0] flex flex-col">
        {/* Profile Section */}
        <div className="p-6 flex flex-col items-center">
          <img src={`${props.profilephoto}?height=96&width=96`} alt="User" className="w-24 h-24 mb-4 rounded-full" />
          <h2 className="text-xl font-semibold mb-2">{props.username}</h2>
          <button
            className="rounded-lg w-full bg-transparent border border-[#f5f5f0] text-[#f5f5f0] hover:bg-[#d2b48c] hover:text-[#2a2a2a] px-4 py-2"
            onClick={onSwitchToProfile}
          >
            View Profile
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          
          <button
              className="rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center text-[#ffffff] hover:bg-[#2a2a2a] hover:text-[#d2b48c]"
              onClick={onSwitchToMissions}
          >

              <div className="mr-2 h-4 w-4" />
              <Target className="mr-2 h-4 w-4 text-[#c99e69]" />
              Missions
          </button>
          <button
              className="rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center text-[#ffffff] hover:bg-[#2a2a2a] hover:text-[#d2b48c]"
              onClick={onSwitchToLogs}    
          >
              
              <div className="mr-2 h-4 w-4" />
              <Leaf className="mr-2 h-4 w-4 text-[#c99e69]" />
              Logs
          </button>
          <button
              className="rounded-lg w-full text-left mb-2 px-4 py-2 flex items-center text-[#ffffff] hover:bg-[#2a2a2a] hover:text-[#d2b48c]"
              onClick={onSwitchToHabitude}
              >
          
              <div className="mr-2 h-4 w-4" />
              <FileText className="mr-2 h-4 w-4 text-[#c99e69]" />
              Habitude
          </button>
        </nav>
      </aside>
    </div>
  </div>
  );
};


export default Sidebar;