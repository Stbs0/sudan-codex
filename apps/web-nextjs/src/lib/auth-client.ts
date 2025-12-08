import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
export type Session = typeof authClient.$Infer.Session;
