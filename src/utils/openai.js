import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "***REMOVED***",
  dangerouslyAllowBrowser: true,
});
export default openai;
