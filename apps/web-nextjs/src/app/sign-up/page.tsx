import Link from "next/link";
import GoogleOAuth from "../../components/auth/GoogleOAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Sudan Codex",
  description:
    "Create an account on Sudan Codex to access Sudan's comprehensive drug index and pharmaceutical information.",
  alternates: {
    canonical: "/sign-up",
  },
};

const SignUp = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Sign Up</CardTitle>
          <CardDescription>
            Create an account to explore Sudan&apos;s comprehensive drug index.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <GoogleOAuth logInOrSignUp='Sign up' />
          <div className='mt-4 text-center text-sm'>
            Already have an account?{" "}
            <Link
              href='/log-in'
              className='underline underline-offset-2'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
// const ProtectedSignUp = CheckIfUserLoggedIn(SignUp);
export default SignUp;
