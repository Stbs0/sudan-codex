import UserInfoForm from "@/components/user-info/UserInfoForm";
import { Metadata } from "next";

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

export default function UserPersonalInfoPage() {
  return <UserInfoForm />;
}
