import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.API_URL,

  dangerouslyAllowBrowser: true,
});
export default openai;
