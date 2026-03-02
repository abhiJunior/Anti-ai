import { supabase } from "../config/supabase.js";
import { WorkflowSchema } from "../utils/workflowSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const createWorkflowService = async (prompt: string, userId: string) => {
  // 1. Initialize the model with JSON configuration for strict output
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  // 2. Call the LLM
  // We explicitly request the schema format in the system prompt
  // Update this part of your service
  const result = await model.generateContent(`
    You are an AI workflow orchestrator. 
    Analyze the user's request and create a JSON workflow definition.
    Return ONLY valid JSON.
    
    REQUIRED SCHEMA:
    { 
      "name": "string", 
      "trigger": "string",  // <--- ADDED THIS
      "steps": [{ "id": "string", "type": "string", "condition": "string" (optional) }] 
    }
    
    User Request: ${prompt}
  `);

  // Parse the output directly from Gemini
  const responseText = result.response.text();
  const rawJson = JSON.parse(responseText);

  // 3. Validate with Zod (The Gatekeeper)
  // This ensures the data matches your database requirements before saving
  console.log(rawJson)
  const validatedData = WorkflowSchema.parse(rawJson);

  // 4. Save to Supabase
  // Change your insert call to this:
  const { data, error } = await supabase
    .from('workflows')
    .insert([{ 
      user_id: userId, 
      name: validatedData.name, 
      definition_json: validatedData 
    }], { count: 'exact' }) // Using count instead of select avoids the read-back
    .select();

  if (error) throw error;
  return data;
};
