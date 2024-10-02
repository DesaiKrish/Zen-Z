// import React, { useState } from 'react';

// interface SignUpForm {
//   firstName: string;
//   lastName: string;
//   mobileNumber: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<SignUpForm>({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState<string>('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setErrors('Passwords do not match!');
//       return;
//     }

//     try {
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Signup failed');
//       }

//       // Handle successful signup
//       console.log('User signed up successfully');
//     } catch (error) {
//         if(error instanceof Error) setErrors(error.message || 'Something went wrong');
//         else setErrors('Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500">
//       <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
//         <div className="text-center mb-6">
//           <img src="/ZenZ.png" alt="Company Logo" className="w-20 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-700">Create Your Account</h2>
//         </div>
//         {errors && <p className="text-red-600 text-center mb-4">{errors}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="mobileNumber" className="block text-sm font-medium mb-2 text-gray-700">Mobile Number</label>
//             <input
//               type="tel"
//               id="mobileNumber"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             Create Account
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login Here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useDropzone } from 'react-dropzone'
// import { CameraIcon } from '@heroicons/react/24/solid'

// export default function SignupForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     dateOfBirth: '',
//     fullName: '',
//     gender: '',
//   })

//   const [profilePic, setProfilePic] = useState<File | null>(null)

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const onDrop = (acceptedFiles: File[]) => {
//     setProfilePic(acceptedFiles[0])
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {'image/*': ['.jpg', '.jpeg', '.png', '.gif']},
//     multiple: false
//   })

//   return (
    
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-500 to-gray700">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden w-full max-w-5xl flex"
//       >
//         {/* Logo and Animation Side */}
//         <div className="w-1/2 p-12 flex flex-col justify-center items-center relative overflow-hidden">
//           <motion.h1
//             initial={{ y: -50 }}
//             animate={{ y: 0 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             className="text-6xl font-bold text-gray-800 mb-8"
//           >
//             ZenZ
//           </motion.h1>
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 180, 360],
//             }}
//             transition={{
//               duration: 5,
//               ease: "easeInOut",
//               times: [0, 0.5, 1],
//               repeat: Infinity,
//             }}
//             className="w-48 h-48 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 opacity-75"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-400 to-transparent opacity-20" />
//         </div>

//         {/* Form Side */}
//         <div className="w-1/2 p-12 bg-white bg-opacity-10">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up</h2>
//           <form className="space-y-4">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//             <input
//               type="date"
//               name="dateOfBirth"
//               placeholder="Date of Birth"
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             />
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             <div
//               {...getRootProps()}
//               className="w-full px-4 py-8 rounded-md bg-white bg-opacity-20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer flex flex-col items-center justify-center"
//             >
//               <input {...getInputProps()} />
//               {profilePic ? (
//                 <img src={URL.createObjectURL(profilePic)} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
//               ) : (
//                 <CameraIcon className="w-12 h-12 text-gray-600 mb-2" />
//               )}
//               <p>{isDragActive ? "Drop the image here" : "Drag 'n' drop profile picture, or click to select"}</p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full px-4 py-2 rounded-md bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
//             >
//               Sign Up
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   )
// }



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
              type="date"
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
          <button
            type="submit"
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