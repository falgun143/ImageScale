const token = process.env.HUGGINGFACE_TOKEN

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); // Get prompt from request body

    // Send the request to Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }), // Use the prompt from the user
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to generate image" }), { status: 500 });
    }

    // Get the image as a Blob
    const imageBlob = await response.blob();

    // Return the image as the response
    return new Response(imageBlob, {
      headers: {
        "Content-Type": "image/png", // Change this to the correct type if needed
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
