import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCAGiRGUvNILcWjB58IYZ_VZMkPppIGY8A" });

async function listModels() {
  const models = await ai.models.list();
  for await (const model of models) {
    console.log(`Name: ${model.name}, Display Name: ${model.displayName}`);
  }
}

listModels();