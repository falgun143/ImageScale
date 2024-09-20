"use client";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { Ripple } from "react-css-spinners";
const Appbar = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Ripple size={100} thickness={7}></Ripple>
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-12 flex justify-between items-center gap-4   px-1 py-5  md:px-10     ">
        <div className="font-bold  text-[18px] cursor-pointer    ">
          Image Generator
        </div>
        {!session.data?.user ? (
          <button
            onClick={() => signIn()}
            className="  transition ease-in-out delay-75  bg-purple-600  hover:bg-purple-800  rounded-md  flex justify-center items-center  w-[90px]  p-2 md:p-3   "
          >
            Signin
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="  transition ease-in-out delay-75  bg-purple-600  hover:bg-purple-800  rounded-md  flex justify-center items-center  w-[90px]  p-2 md:p-3   "
          >
            Logout
          </button>
        )}
      </div>
      {children}
    </>
  );
};

export default Appbar;
