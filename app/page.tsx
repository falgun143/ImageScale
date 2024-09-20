"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
export default function Home() {
  const [prompt, setPrompt] = useState(""); // For the text prompt
  const [imageSrc, setImageSrc] = useState<string | null>(null); // For displaying the generated image
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle the image generation
  const generateImage = async () => {
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
    <div className="bg-slate-950 w-full h-screen flex flex-col items-center p-8  gap-7  text-white">
      {/* Header */}
      <div className="w-full h-12  flex justify-between  px-10 ">
        <div className="font-bold  text-[25px] cursor-pointer    ">
          Image Generator
        </div>
        <button
          onClick={() => signIn()}
          className="  transition ease-in-out delay-75  bg-purple-600  hover:bg-purple-800  p-2 rounded-md  flex     justify-center items-center  w-[100px]"
        >
          Signin
        </button>
      </div>
      <h1 className="text-7xl  font-bold  tracking-tighter ">
        Get Images on the go
      </h1>

      {/* Input for prompt */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className=" p-4 rounded-xl bg-gray-700  w-[700px] "
        placeholder="Enter a text prompt"
      />

      {/* Button to trigger image generation */}
      <button
        onClick={generateImage}
        className="   transition ease-in-out delay-75 p-3 rounded bg-purple-600 hover:bg-purple-800 text-[17px] tracking-tighter "
      >
        Generate Image
      </button>

      {/* Spinner */}
      {loading && <p>Generating image...</p>}

      {/* Displaying the generated image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Generated"
          className="mt-4 w-[400px] h-[400px]  object-cover "
        />
      )}
    </div>
  );
}
