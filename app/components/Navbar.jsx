'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CircleEllipsis, CircleX } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <div className="shadow-2xl px-10 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold font-[system-ui] text-white">
          <Link href="/">Melody Verse</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-center ">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {!isOpen ? <CircleEllipsis fontSize='large' /> : <CircleX fontSize={'large'} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-2">
          <Link href="/login" className="px-5 py-2 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition duration-300">Login</Link>
          <Link href="/signup" className="px-5 py-2 bg-[#FC0254] text-white text-lg font-semibold rounded-full hover:scale-105 transition duration-300">Sign Up</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex md:hidden text-[#ffffffc7]  bg-[rgb(4,8,17,0.7)] gap-6 absolute py-4  items-center justify-center top-16 left-0 w-full ">
        <Link href="/login" className="px-5 py-2 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition duration-300">Login</Link>
        <Link href="/signup" className="px-5 py-2 bg-[#FC0254] text-white text-lg font-semibold rounded-full hover:scale-105 transition duration-300">Sign Up</Link>
        </div>
      )}
      </>
  );
}
