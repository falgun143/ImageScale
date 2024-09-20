"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Roller } from "react-css-spinners";

export default function Home() {
  const [prompt, setPrompt] = useState(""); // For the text prompt
  const [imageSrc, setImageSrc] = useState<string | null>(null); // For displaying the generated image
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(false);
  const session = useSession();

  // Function to handle the image generation
  const generateImage = async () => {
    if (prompt.length > 0) {
      setImageSrc(null);
      setLoading(true);
      setError(false);
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
    } else {
      setError(true);
      setImageSrc(null);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col items-center    mt-20  gap-4 ">
      <h1 className="text-3xl md:text-4xl lg:text-6xl  font-bold  tracking-tighter   text-center  w-full md:w-[40%] ">
        Get Images on the go
      </h1>

      {session.data?.user ? (
        <div className="w-full  h-auto flex flex-col items-center   gap-3 ">
          {/* Input for prompt */}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className=" p-4 rounded-xl bg-gray-700  w-[95%] md:w-[60%] "
            placeholder="Enter a text prompt"
          />
          <button
            onClick={generateImage}
            className="   transition ease-in-out delay-75 p-2 md:p-3 rounded bg-purple-600 hover:bg-purple-800 text-[17px]  "
          >
            Generate Image
          </button>
          {/* Spinner */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  w-1/5  flex justify-between items-center ">
              <div className="flex gap-1">
                <strong className="font-bold">Oops!</strong>
                <span className="block sm:inline">Prompt cannot be empty.</span>
              </div>

              <strong
                className="text-3xl align-center cursor-pointer alert-del"
                onClick={() => {
                  setError(false);
                }}
              >
                &times;
              </strong>
            </div>
          )}

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
      ) : (
        <p  className="text-xl  text-gray-500  w-[95%]  md:w-[45%] lg:[32%] ">
          Image Generator transforms your text prompts into high-quality images.
          Simply enter a description, and get instant, visually stunning results
          tailored to your input.
        </p>
      )}
    </div>
  );
}
