// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// // const LoginForm = ({ onSwitchToSignup }: { onSwitchToSignup: () => void }) => {
// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b7355] to-[#8b7355]">
//     <motion.div
//       initial={{ opacity: 0, x: 300 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -300 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       className="flex w-full max-w-5xl bg-gradient-to-br from-[#c99e69] to-amber-800 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
//     >
//       {/* Logo and Animation Side */}
//       <div className="w-1/2 p-12 flex flex-col justify-center items-center relative overflow-hidden">
//         <motion.h1
//           initial={{ y: -50 }}
//           animate={{ y: 0 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//           className="text-6xl font-bold text-white mb-8"
//         >
//           {/* ZenZ */}
//         </motion.h1>
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 5,
//             ease: 'easeInOut',
//             times: [0, 0.5, 1],
//             repeat: Infinity,
//           }}
//           className="w-48 h-48 rounded-full bg-white bg-opacity-30 flex items-center justify-center"
//         >
//           <img src="ZenZ3.png" alt="Logo" className="w-full h-full rounded-full object-cover" />
//           <span className="text-4xl"></span>
//         </motion.div>
//       </div>

//       {/* Form Side */}
//       <div className="w-1/2 p-12 bg-gradient-to-br from-beige-300 to-zinc-100 bg-opacity-80">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Log In</h2>
//         <form className="space-y-4">
//           <div>
//             <input
//               id="email"
//               name="email"
//               placeholder="Email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//                          focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
//             />
//           </div>
//           <div>
//             <input
//               id="password"
//               name="password"
//               placeholder="Password"
//               type="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
//                          focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
//             />
//           </div>
//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
//             >
//               Forgot Password?
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#b07935] hover:bg-[#c99e69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//           >
//             Log In
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">Don't have an account?</p>
//           <button
//             // onClick={onSwitchToSignup}
//             className="font-medium text-black hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </motion.div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const onSwitchToSignup = () => {
    navigate('/signup');
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b7355] to-[#8b7355]">
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex w-full max-w-5xl bg-gradient-to-br from-[#c99e69] to-amber-800 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
      >
        {/* Logo and Animation Side */}
        <div className="w-1/2 p-12 flex flex-col justify-center items-center relative overflow-hidden">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-6xl font-bold text-white mb-8"
          >
            {/* ZenZ */}
          </motion.h1>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              ease: 'easeInOut',
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
            className="w-48 h-48 rounded-full bg-white bg-opacity-30 flex items-center justify-center"
          >
            <img src="ZenZ3.png" alt="Logo" className="w-full h-full rounded-full object-cover" />
            <span className="text-4xl"></span>
          </motion.div>
        </div>

        {/* Form Side */}
        <div className="w-1/2 p-12 bg-gradient-to-br from-beige-300 to-zinc-100 bg-opacity-80">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Log In</h2>
          <form className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button
              type="submit"
              onClick={handleSubmit} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#b07935] hover:bg-[#c99e69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <button
              onClick={onSwitchToSignup} // Call the function on click
              className="font-medium text-black hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;