"use client";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000, icon: '🎉', }} />

      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/path-to-your-background-image.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl text-[#FC0254] font-bold mb-4">
            Welcome onboard!
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Melody verse- Streaming service will be starting soon!
            <br />
            Join the waitlist to get notified.
          </p>
          <button
            onClick={() =>
              toast.success("You have joined the waitlist. Thanks!")
            }
            className="px-8 py-4 mb-4 bg-[#FC0254] rounded-full text-xl"
          >
            Join Waitlist
          </button>
          <Link href={'/'}>Back to home</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
