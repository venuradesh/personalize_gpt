export interface ModelData {
  name: string;
  options: string[];
  instructions: string[];
  link: string;
}

export enum ModelActivationStaus {
  OPENAI = "OpenAI",
  LLAMA = "Llama-3.1",
}
