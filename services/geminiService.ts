
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the AI
const getAIClient = () => {
  const apiKey = process.env.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export const generateSEOContent = async (pageName: string, description: string) => {
  const ai = getAIClient();
  try {
    const result = await ai.models.generateContent({
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
    
    // ULTRA SAFE: Check if response or text exists at every step
    const text = result?.text;
    if (!text) return null;
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini SEO Error:", error);
    return null;
  }
};

/**
 * Generates a blog draft.
 * Returns a string. Never returns undefined.
 */
export const generateBlogDraft = async (topic: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a high quality business blog post about ${topic} for Trotech Pvt Ltd. Structure it with professional sections. DO NOT USE DASHES OR HYPHENS in the visible text. Focus on enterprise value and innovation.`,
    });
    
    // ULTRA SAFE: Explicitly check for the text property
    const generatedText = result?.text;
    
    if (generatedText && generatedText.length > 0) {
      return generatedText;
    }
    
    return "The AI was unable to generate content for this topic. Please try a different prompt.";
  } catch (error) {
    console.error("Gemini Blog Error:", error);
    return "Failed to generate draft. Please check your internet connection or API key.";
  }
};
