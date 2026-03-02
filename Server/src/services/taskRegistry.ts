
import { GoogleGenerativeAI } from "@google/generative-ai";
import {sendEmail} from "./emailService.js"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const taskRegistry: Record<string, Function> = {
  //Real implementation for Skill Extraction
  ai_skill_extraction: async (params: { resumeText: string }) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      Analyze this resume and extract a list of technical skills. 
      Return the output as a JSON array of strings: ["skill1", "skill2"].
      Resume text: ${params.resumeText}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return JSON.parse(text.replace(/```json|```/g, ''));
  },

  
  ai_skill_matching: async (params: any) => {
    return { score: 85, analysis: "Good match for Senior Developer role" };
  },

  
  email_sender: async (params: { to: string; subject: string; body: string }) => {
    console.log("Sending email to:", params.to);
    const messageId = await sendEmail(params.to, params.subject, params.body);
    return { success: true, messageId };
  }
};