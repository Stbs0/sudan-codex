"use client";

import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { occupationLiteral } from "@sudan-codex/types";

export function BetterAuthUIProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      // @ts-expect-error navigate type mismatch
      navigate={router.push}
      // @ts-expect-error replace type mismatch
      replace={router.replace}
      social={{
        providers: ["google"],
        async signIn(params) {
          return await authClient.signIn.social({
            ...params,
            callbackURL: "/drug-list",
            newUserCallbackURL: "/user-info",
            fetchOptions: { throw: true },
          });
        },
      }}
      credentials={false}
      changeEmail={false}
      deleteUser={true}
      additionalFields={{
        age: {
          type: "number",
          required: true,
          label: "Age",
          placeholder: "Enter your age",
        },
        phoneNumber: {
          type: "string",
          required: true,
          label: "Phone Number",
          placeholder: "Enter your phone number",
        },
        university: {
          type: "string",
          required: true,
          label: "University",
          placeholder: "Enter your university",
        },
        occupation: {
          type: "string",
          required: true,
          label: "Occupation",
          instructions: <Instructions />,
          validate: async (value) => {
            if (!value) return false;
            const result = occupationLiteral.safeParse(value);
            if (!result.success) {
              return false;
            }
            return true;
          },
          placeholder:
            "Student, Administrator, Pharmacist, Medical Representative or Other",
        },
      }}
      account={{
        fields: ["name", "age", "phoneNumber", "university", "occupation"],
      }}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      // @ts-expect-error Link type error bc of typed route in nextjs
      Link={Link}>
      {children}
    </AuthUIProvider>
  );
}

const Instructions = () => (
  <p>
    Please choose between Student, Administrator, Pharmacist, Medical
    Representative or Other
  </p>
);
