import UserInfoForm from "@/components/user-info/UserInfoForm";
import { auth } from "@/lib/auth";
import { Session } from "@/lib/auth-client";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Complete Profile | Sudan Codex",
  description: "Complete your profile to get the most out of Sudan Codex.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/user-info",
  },
};

export default async function UserPersonalInfoPage() {
  let session: Session | null = null;
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch (_error) {
    redirect("/log-in");
  }
  if (!session) redirect("/log-in");
  if (session.user.isProfileComplete) redirect("/drug-list");
  return <UserInfoForm />;
}
