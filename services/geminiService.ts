
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { TEXT_MODEL, IMAGE_MODEL, SYSTEM_INSTRUCTION_CAMPAIGN } from "../constants";
import { EmailCampaign, ImageSize, AspectRatio } from "../types";

export const generateCampaign = async (prompt: string): Promise<EmailCampaign> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_CAMPAIGN,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subjectLines: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          bodyCopy: { type: Type.STRING },
          targetAudience: { type: Type.STRING },
          tone: { type: Type.STRING },
          imagePrompt: { type: Type.STRING }
        },
        required: ["title", "subjectLines", "bodyCopy", "targetAudience", "tone", "imagePrompt"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return {
    ...data,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
};

export const generateCampaignImage = async (
  prompt: string, 
  size: ImageSize = ImageSize.SIZE_1K,
  aspectRatio: AspectRatio = AspectRatio.RATIO_1_1
): Promise<string> => {
  // Use a fresh instance to ensure correct API Key selection context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio,
        imageSize: size
      }
    }
  });

  // Iterate through parts to find the image part
  if (response.candidates && response.candidates[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("Failed to generate image.");
};

export const sendMessageToChat = async (message: string, history: {role: 'user' | 'model', content: string}[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: TEXT_MODEL,
    config: {
      systemInstruction: "You are a helpful marketing assistant."
    }
  });

  // Note: Simple implementation for current session. In a real app, history would be passed to `create`.
  // The SDK usually supports a `history` parameter in `create` but let's stick to simple messaging here.
  const result = await chat.sendMessage({ message });
  return result.text || "I'm sorry, I couldn't process that.";
};
