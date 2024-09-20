"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Roller } from "react-css-spinners";

export default function Home() {
  const [prompt, setPrompt] = useState(""); // For the text prompt
  const [imageSrc, setImageSrc] = useState<string | null>(null); // For displaying the generated image
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle the image generation
  const generateImage = async () => {
    setImageSrc(null);
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        console.error("Error generating image");
        setLoading(false);
        return;
      }

      const blob = await response.blob(); // Get the image blob from the response
      const imageUrl = URL.createObjectURL(blob); // Convert blob to object URL
      setImageSrc(imageUrl); // Set the image source
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-purple-950 w-full h-screen flex flex-col items-center p-8  gap-10  text-white">
      {/* Header */}
      <div className="w-full h-12 flex justify-between items-center gap-4   px-1  md:px-10    ">
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
      <h1 className="text-3xl md:text-4xl lg:text-6xl  font-bold  tracking-tighter ">
        Get Images on the go
      </h1>

      {/* Input for prompt */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className=" p-4 rounded-xl bg-gray-700  w-3/4 "
        placeholder="Enter a text prompt"
      />

      {/* Button to trigger image generation */}
      <div  className="w-full  h-auto flex flex-col items-center  justify-center gap-3 " >
        <button
          onClick={generateImage}
          className="   transition ease-in-out delay-75 p-2 md:p-3 rounded bg-purple-600 hover:bg-purple-800 text-[17px]  "
        >
          Generate Image
        </button>
        {/* Spinner */}
        {loading && (
          <div className="flex gap-3">
            <p>Analysing</p>
            <Roller size={25} />
          </div>
        )}

        {/* Displaying the generated image */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Generated"
            className="mt-4 w-[400px] h-[400px]  object-cover "
          />
        )}
      </div>
    </div>
  );
}
