"use server";
import { z } from "zod";
import { openai } from "./lib/openai";
import {
  getCoordinates,
  getCoordinatesZodParse,
  getCurrentLocation
} from "./lib/geocoding";
import { getWeather, getWeatherZodParse } from "./lib/weather";

const FormSchema = z.object({
  query: z.string()
});

export async function handleFormSubmit(
  previousState: { message: string | null } | undefined,
  formData: FormData
) {
  const { query } = FormSchema.parse(Object.fromEntries(formData.entries()));

  const runner = await openai.beta.chat.completions.runTools({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Please use the tools given to you to answer the user question. Focus only on the user question and do not provide any additional information"
      },
      {
        role: "user",
        content: query
      }
    ],
    tools: [
      {
        type: "function",
        function: {
          function: getCurrentLocation,
          description: "Returns the current user location data",
          parameters: {
            type: "object",
            properties: {}
          }
        }
      },
      {
        type: "function",
        function: {
          function: getWeather,
          description:
            "Returns weather information given latitude and longitude",
          parse: getWeatherZodParse,
          parameters: {
            type: "object",
            properties: {
              latitude: { type: "string" },
              longitude: { type: "string" }
            },
            required: ["latitude", "longitude"]
          }
        }
      },
      {
        type: "function",
        function: {
          function: getCoordinates,
          description: "Returns latitude and longitude given city and country",
          parse: getCoordinatesZodParse,
          parameters: {
            type: "object",
            properties: {
              city: { type: "string" },
              country: { type: "string" }
            },
            required: ["city", "country"]
          }
        }
      }
    ]
  });

  const content = await runner.finalContent();
  return { message: content };
}
