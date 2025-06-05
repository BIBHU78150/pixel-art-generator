
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will not be shown in the UI in a typical deployment, but is good for local dev.
  // The App.tsx will handle showing a more user-friendly error if API_KEY is missing at runtime.
  console.error("API_KEY environment variable is not set.");
  // In a real app, you might throw an error here or have a fallback,
  // but for this specific setup, we rely on it being present.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as API_KEY presence is a precondition

export const generatePixelArt = async (userPrompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key for Gemini API is not configured.");
  }

  // Enhance the prompt to guide Imagen towards pixel art
  const enhancedPrompt = `${userPrompt}, 8-bit pixel art style, vibrant colors, clear outlines, retro video game aesthetic`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: enhancedPrompt,
      config: { 
        numberOfImages: 1, 
        outputMimeType: 'image/png' // PNG is good for pixel art
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error('No image data received from API.');
    }
  } catch (error) {
    console.error('Error generating image with Imagen:', error);
    if (error instanceof Error) {
        // Check for common API key related errors or quota issues if possible
        if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
            throw new Error("Invalid API Key. Please check your configuration.");
        }
        if (error.message.includes("quota") || error.message.includes("Quota")) {
            throw new Error("API quota exceeded. Please try again later.");
        }
         throw new Error(`Imagen API error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the Imagen API.');
  }
};
    