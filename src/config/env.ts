import z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    API_KEY: z.string(),
    AUTH_DOMAIN: z.string(),
    PROJECT_ID: z.string(),
    STORAGE_BUCKET: z.string(),
    MESSAGE_SENDER: z.string(),
    APP_ID: z.string(),
    MEASUREMENT_ID: z.string(),
    OPENFDA_API_KEY: z.string(),

    APP_URL: z.string().optional().default("http://localhost:1574/api/v1"),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value;
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
