import React, { useState } from 'react'
import { motion} from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { CameraIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';

// const SignupForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    fullName: '',
    gender: '',
  })

  const [error, setError] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSwitchToLogin = () => {
    navigate('/login');
  }

  const onDrop = (acceptedFiles: File[]) => {
    setProfilePic(acceptedFiles[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    multiple: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profilePic) {
      setError('Profile picture is required');
      return;
    }

    try {
      // formData.dateOfBirth = formatDate(formData.dateOfBirth);
      const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      fullname: formData.fullName,
      gender: formData.gender,
      profpic: profilePic,
      }
      

      // formData.dateOfBirth = formatDate(formData.dateOfBirth);
      formData.gender = formData.gender.charAt(0).toUpperCase();
      console.log(formData.gender);
      

      const formdata = new FormData();
      formdata.append('username', data.username);
      formdata.append('email', data.email);
      formdata.append('password', data.password);
      formdata.append('dateOfBirth', data.dateOfBirth);
      formdata.append('fullname', data.fullname);
      formdata.append('gender', formData.gender);
      formdata.append('profpic', profilePic); 
      console.log(data);
      

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        // body: formData
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/login');
      }
      else {
        setError(result.message || 'Failed to register user');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b7355] to-[#8b7355]">
    
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    //   className="flex w-full max-w-5xl bg-gradient-to-br from-gray-300 via-gray-500 to-gray700 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        className="flex w-full max-w-5xl bg-gradient-to-br from-[#c99e69] to-amber-800 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden"
        >
      {/* Logo and Animation Side */}
      <div className="w-1/2 p-12 flex flex-col justify-center items-center relative overflow-hidden">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-6xl font-bold text-white mb-8"
        >
          {/* ZenZ */}
        </motion.h1>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            // rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-48 h-48 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
            <img src="ZenZ3.png" alt="Logo" className="w-full h-full rounded-full object-cover"/>
            <span className="text-4xl"></span>
        </motion.div>
      </div>

      {/* Form Side */}
      {/* <div className="w-1/2 p-12 bg-white bg-opacity-80"> */}
      <div className="w-1/2 p-12 bg-gradient-to-br from-beige-300 to-zinc-100 bg-opacity-80">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up</h2>
        <form className="space-y-4">
          <div>
            {/* <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label> */}
            <input
              id="username"
              placeholder="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label> */}
            <input
              id="email"
              name="email"
              placeholder='Email'
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label> */}
            <input
              id="password"
              name="password"
              placeholder='Password'
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            {/* <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label> */}
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              placeholder='Date of Birth'
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            {/* <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label> */}
            <input
              id="fullName"
              name="fullName"
              placeholder='Full Name'
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            {/* <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label> */}
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <input {...getInputProps()} />
            <div className="space-y-1 text-center">
              {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="Profile" className="mx-auto h-24 w-24 rounded-full object-cover" />
              ) : (
                <CameraIcon className="mx-auto h-12 w-12 text-[#b07935]" />
              )}
              <div className="flex text-sm text-gray-600">
                <p className="pl-1">{isDragActive ? "Drop the image here" : "Drop your profile picture, or click to select"}</p>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#b07935] hover:bg-[#c99e69] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-black hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Log In
          </button>
        </div>
      </div>
    </motion.div>

    </div>
  )
}

export default SignupForm