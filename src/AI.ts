import OpenAI from "openai";
import { readFileSync } from "fs";
import { MODELS } from "./MODELS";

export class AI {
  openai = new OpenAI({
    apiKey: process.env.GOOGLE_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });
  model: string;
  temperature: number = 2.0;
  systemInstructions: string[];
  response_format?: any;

  constructor({
    systemInstructionPaths,
    temperature = 2.0,
    model = "GEMINI_FLASH_THINKING",
  }: {
    model?: "GEMINI_FLASH" | "GEMINI_FLASH_THINKING" | "GEMINI_PRO_EXP";
    temperature?: number;
    systemInstructionPaths: string[];
  }) {
    this.model = MODELS[model];
    this.temperature = temperature;
    console.log(systemInstructionPaths);
    this.systemInstructions = systemInstructionPaths.map(
      (systemInstructionPath: string) =>
        String(readFileSync(systemInstructionPath)),
    );
  }

  createMessages(userInstructions: string[]) {
    return [
      {
        role: "system",
        content: this.systemInstructions.join("\n"),
      },
      {
        role: "user",
        content: userInstructions.join("\n"),
      },
    ];
  }

  async fetch(userInstructions: string[]) {
    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages: this.createMessages(userInstructions),
      temperature: this.temperature,
    });
    return completion.choices[0].message.content;
  }
}
