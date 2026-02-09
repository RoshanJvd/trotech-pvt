
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client using the environment variable directly as per guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateSEOContent = async (pageName: string, description: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a premium SEO title and meta description for the ${pageName} page of Trotech Pvt Ltd. Context: ${description}. IMPORTANT: Do not use any dashes or hyphens in the text.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "metaDescription", "keywords"]
        }
      }
    });
    // response.text is a property, not a method
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    return null;
  }
};

export const generateBlogDraft = async (topic: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a high quality business blog post about ${topic} for Trotech Pvt Ltd. Structure it with professional sections. DO NOT USE DASHES OR HYPHENS in the visible text. Focus on enterprise value and innovation.`,
    });
    // response.text is a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini Blog Error:", error);
    return "Failed to generate draft. Please check your API configuration.";
  }
};
