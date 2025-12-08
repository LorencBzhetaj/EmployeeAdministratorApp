import React from "react";
import { useState } from "react";

export default function Login() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center ">
        <div className="w-[30%] h-[65%] border-2 border-black rounded flex flex-col justify-start items-center">
          <h1 className="text-2xl font-bold border-b-2 border-black">Log In</h1>

          <div className="w-[80%] h-70 flex flex-col gap-6 justify-center items-center">
            <div className="w-[80%] h-20 flex flex-col justify-center items-center">
              <h2>Email :</h2>
              <input type="email" placeholder="Email...."></input>
            </div>
            <div className="w-[80%] h-20 flex flex-col justify-center items-center">
              <h2>Password :</h2>
              <input type="password" placeholder="Password...."></input>
            </div>
            <div className="w-[80%] h-10 flex justify-center items-center">
              <button>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
