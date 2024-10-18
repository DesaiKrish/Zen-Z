import React, { useEffect, useState } from "react";
import Header from "./ui/Header.tsx";

const Profile = () => {
    const [userData, setUserData] = useState<any>({
      fullname:'',
      email:'',
      gender:'',
      dateOfBirth:'',
      profpic:''
    });
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const};
        const date = new Date(dateString);
        date.setDate(date.getDate() - 1);
        return date.toLocaleDateString('en-US', options); // Change 'en-US' to your preferred locale if needed
    };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log(data);
        
        
        setUserData({
          fullname: data.data.fullname,
          email: data.data.email,
          gender: data.data.gender,
          dateOfBirth: formatDate(data.data.dateOfBirth),
          profpic: data.data.profpic
        });
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="bg-[#c99e69] min-h-screen">
        <div className="flex flex-col h-0">
        <Header color="bg-black"/>
        </div><br/><br/><br/><br/><br/><br/><br/>
      {/* Rendering userData */}
      <h3 className="text-3xl font-semibold text-[#ffffff]">User Details</h3><br/>
      {/* <div className="p-6 bg-[#ffffff] flex flex-col items-center max-w-sm mx-auto rounded-md"> */}
      <div className="flex justify-center items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden ">
          <img
            src={`${userData?.profpic}?height=200&width=200`}
            alt="User"
            className="w-full h-full object-cover"
          />
          </div>
      </div>
      <br/><br/>
      {/* Display more user info */}
      <div className="space-y-4 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-9">
        <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
            <p className="text-lg font-semibold text-[#c99e69]">Full Name</p>
          
                <p className="text-[#3a3a3a]">{userData?.fullname}</p>
            
          </div>
          <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
            <p className="text-lg font-semibold text-[#c99e69]">Email</p>
          
                <p className="text-[#3a3a3a]">{userData?.email}</p>
            
          </div>
          <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
            <p className="text-lg font-semibold text-[#c99e69]">Gender</p>
            
                <p className="text-[#3a3a3a]">{userData?.gender}</p>
            
          </div>
          <div className="rounded-lg bg-[#f5f5f0] p-4 shadow-md">
            <p className="text-lg font-semibold text-[#c99e69]">Birthday</p>
          
                <p className="text-[#3a3a3a]">{userData?.dateOfBirth}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;