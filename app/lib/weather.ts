import { z } from "zod";

const GetWeatherParamsSchema = z.object({
  latitude: z.string(),
  longitude: z.string()
});

const GetWeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    temperature_2m: z.string()
  }),
  current: z.object({
    time: z.string(),
    interval: z.number(),
    temperature_2m: z.number()
  })
});

const GetWeatherOutput = z.object({
  temperature: z.number(),
  unit: z.enum(["celsius", "fahrenheit"])
});

export async function getWeather({
  latitude,
  longitude
}: z.infer<typeof GetWeatherParamsSchema>) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.append("latitude", latitude);
  url.searchParams.append("longitude", longitude);
  url.searchParams.append("current", "temperature_2m");

  const response = await fetch(url.toString(), { method: "GET" });
  const { current, current_units } = GetWeatherResponseSchema.parse(
    await response.json()
  );

  const output: z.infer<typeof GetWeatherOutput> = {
    temperature: current.temperature_2m,
    unit: current_units.temperature_2m === "°C" ? "celsius" : "fahrenheit"
  };
  return output;
}

export function getWeatherZodParse(args: string) {
  return GetWeatherParamsSchema.parse(JSON.parse(args));
}
