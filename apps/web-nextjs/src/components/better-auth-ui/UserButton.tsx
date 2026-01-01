"use client";

import { UserButton } from "@daveyplate/better-auth-ui";
import type { ComponentProps } from "react";

type UserButtonProps = ComponentProps<typeof UserButton>;

export function UserButtonWrapper({
  size = "icon",
  className,
}: UserButtonProps) {
  return (
    <UserButton
      size={size}
      className={className}
    />
  );
}
