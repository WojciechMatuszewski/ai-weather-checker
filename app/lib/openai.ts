import { z } from "zod";
import OpenAI from "openai";

const CredentialsSchema = z.object({
  OPENAI_API_KEY: z.string().min(2)
});

const { OPENAI_API_KEY } = CredentialsSchema.parse(process.env, {
  errorMap: () => {
    return { message: "Failed to get `OPENAI_API_KEY` environment variable" };
  }
});

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});
