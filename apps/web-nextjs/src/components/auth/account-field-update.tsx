"use client";
import { authClient } from "@/lib/auth-client";
import {
  AuthUIContext,
  UpdateFieldCard,
  UpdateNameCard,
} from "@daveyplate/better-auth-ui";
import { use } from "react";

export const AccountSettingsCards = () => {
  const { additionalFields, account } = use(AuthUIContext);

  const sessionData = authClient.useSession();

  if (!additionalFields) return null;
  return (
    <div className='flex w-full flex-col gap-4'>
      <UpdateNameCard />
      {account?.fields?.map((field) => {
        if (field === "image") return null;
        if (field === "name") return null;
        if (field === "occupation") {
          if (sessionData?.data?.user.specialty !== "Pharmacist") return null;
        }
        if (field === "workPlace") {
          if (
            sessionData?.data?.user.specialty === "Pharmacist" &&
            sessionData?.data?.user.occupation === "Student"
          )
            return null;
        }
        const additionalField = additionalFields?.[field];
        if (!additionalField) return null;
        const {
          label,
          description,
          instructions,
          placeholder,
          required,
          type,
          multiline,
          validate,
        } = additionalField;

        // @ts-expect-error Custom fields are not typed
        const defaultValue = sessionData?.data?.user[field] as unknown;

        return (
          <UpdateFieldCard
            key={field}
            value={defaultValue}
            description={description}
            name={field}
            instructions={instructions}
            label={label}
            placeholder={placeholder}
            required={required}
            type={type}
            // @ts-expect-error Custom fields are not typed
            options={additionalField?.options}
            multiline={multiline}
            validate={validate}
          />
        );
      })}
    </div>
  );
};
