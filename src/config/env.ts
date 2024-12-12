import z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    VITE_APIKEY: z.string(),
    VITE_AUTHDOMAIN: z.string(),
    VITE_PROJECTID: z.string(),
    VITE_STOREGEBUCKET: z.string(),
    VITE_MESSEGESENDER: z.string(),
    VITE_APPID: z.string(),
    VITE_MESURMENTID: z.string(),
    VITE_OPENFDA_APIKEY: z.string(),

    APP_URL: z.string().optional().default("http://localhost:1574/v1/"),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      acc[key.replace("VITE_APP_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
