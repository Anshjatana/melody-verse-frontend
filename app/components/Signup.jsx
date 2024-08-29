'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // Set initial state to true
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tnc, setTnc] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Form submitted');
    // if (!passwordMatch) return; // Prevent form submission if passwords do not match
    // Continue with signup logic
    const { username,email, password } = data;
    try{
      const response  = await axios.post('https://api-melody-verse.up.railway.app/signup', {username, email, password});
      const responseData = response.data;
      if(responseData.error){
        toast.error(responseData.error);
      } else{
        setData({})
        toast.success('User registered successfully');
        router.push('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Extract and display the error message from the response
        toast.error(error.response.data.error);
      } else {
        // Fallback error message
        toast.error("An error occurred during Signup.");
      }
    }
  };

  const handlePasswordMatch = () => {
    // Check if passwords match and update state accordingly
    if (data.password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <div className="flex items-center justify-center">
      <div className="w-[90%] md:w-full  max-w-md mt-12 p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Sign up for new account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-white text-sm font-semibold mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-white text-sm font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
              placeholder="Enter your password"
            />
            {showPassword? <Eye
              color="white"
              className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />: <EyeOff
                color="white"
                className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            /> }
          </div>
          <div className='relative' >
            <label htmlFor="confirmPassword" className="block text-white text-sm font-semibold mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
              placeholder="Re-enter your password"
            />
            {showConfirmPassword ? <Eye
              color="white"
              className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />: <EyeOff color="white"
              className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
          </div>
          {!passwordMatch && <p className='text-red-500 mt-[-10px] text-sm'>Passwords do not match</p>}
          <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={tnc}
                onChange={() => setTnc(!tnc)}
                className="mr-2"
              />
              <label htmlFor="Terms" className="text-white text-sm">
                Accept Terms and Conditions
              </label>
            </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#FC0254] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-pink-700 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-white text-md">
          Already have an account?{' '}
          <Link className='underline font-medium text-[#FC0254]' href="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Signup;
