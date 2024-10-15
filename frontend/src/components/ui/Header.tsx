import { LogOut } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Header = () => {

    const navigate = useNavigate();

    const onSwitchToLogin = () => {
        navigate('/login');
      }
      const onSwitchToSignup = () => {
        navigate('/signup');
      };
      const handleLogout = async () => {
        try {
          await axios.post('http://localhost:5000/api/users/logout',
            {},
            { withCredentials: true }
          )
          navigate('/login')
        } catch (error) {
          console.error('Logout failed', error)
        }
      };

    return(
        <>
        <header className="flex items-center justify-center w-full px-1 py-4">
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
            <button className="ml-auto rounded-lg bg-transparent text-[#f5f5f0] hover:bg-[#c19a6b] px-4 py-2 flex items-center" onClick={handleLogout}>
              <LogOut className="h-6 w-6 mr-2" />
            </button>
          </div>
        </div>
      </header>
        </>
    )

}

export default Header;