import UserInfoForm from "@/components/user-info/UserInfoForm";
import { auth } from "@/lib/auth";
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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/log-in");
  if (session.user.isProfileComplete) redirect("/drug-list");
  return <UserInfoForm />;
}
