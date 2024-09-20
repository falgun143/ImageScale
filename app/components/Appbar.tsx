"use client"
import React from 'react'
import { signIn, useSession,signOut } from "next-auth/react";
const Appbar = ({ children }: { children: React.ReactNode }) => {
    
  const session= useSession();
  return (
    <>
    <div className="w-full h-12 flex justify-between items-center gap-4   px-1 py-5  md:px-10     ">
    <div className="font-bold  text-[18px] cursor-pointer    ">
      Image Generator
    </div>
    <button
      onClick={() => signIn()}
      className="  transition ease-in-out delay-75  bg-purple-600  hover:bg-purple-800  rounded-md  flex justify-center items-center  w-[90px]  p-2 md:p-3   "
    >
      Signin
    </button>
  </div>
  {children}
  </>
  )
}

export default Appbar