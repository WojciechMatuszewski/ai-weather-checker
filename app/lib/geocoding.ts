import { z } from "zod";

const CredentialsSchema = z.object({
  GEOCODING_API_KEY: z.string()
});

const GetCoordinatesParametersSchema = z.object({
  city: z.string(),
  country: z.string()
});

export const GetCoordinatesResponseSchema = z.object({
  features: z.array(
    z.object({
      properties: z.object({
        lon: z.number().transform((value) => `${value}`),
        lat: z.number().transform((value) => `${value}`)
      })
    })
  )
});

export async function getCoordinates({
  city,
  country
}: z.infer<typeof GetCoordinatesParametersSchema>) {
  const { GEOCODING_API_KEY } = CredentialsSchema.parse(process.env);

  const url = new URL("https://api.geoapify.com/v1/geocode/search");
  url.searchParams.append("country", country);
  url.searchParams.append("city", city);
  url.searchParams.append("apiKey", GEOCODING_API_KEY);

  const response = await fetch(url.toString(), { method: "GET" });
  const {
    features: [feature]
  } = GetCoordinatesResponseSchema.parse(await response.json());

  return feature;
}

export function getCoordinatesZodParse(args: string) {
  return GetCoordinatesParametersSchema.parse(JSON.parse(args));
}

const GetCurrentLocationResponseSchema = z.object({
  ip: z.string(),
  network: z.string(),
  version: z.string(),
  city: z.string(),
  region: z.string(),
  region_code: z.string(),
  country: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  country_code_iso3: z.string(),
  country_capital: z.string(),
  country_tld: z.string(),
  continent_code: z.string(),
  in_eu: z.boolean(),
  postal: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  utc_offset: z.string(),
  country_calling_code: z.string(),
  currency: z.string(),
  currency_name: z.string(),
  languages: z.string(),
  country_area: z.number(),
  country_population: z.number(),
  asn: z.string(),
  org: z.string()
});

export async function getCurrentLocation(args?: string) {
  const url = new URL("https://ipapi.co/json");
  const response = await fetch(url.toString(), { method: "GET" });

  return JSON.stringify(
    GetCurrentLocationResponseSchema.parse(await response.json())
  );
}
