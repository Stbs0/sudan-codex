import GoogleOAuth from "@/components/auth/GoogleOAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log In | Sudan Codex",
  description:
    "Log in to Sudan Codex to access Sudan's comprehensive drug index and pharmaceutical information.",
  alternates: {
    canonical: "/log-in",
  },
};

const Login = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Log in to access Sudan&apos;s comprehensive drug index and
            pharmaceutical information.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <GoogleOAuth logInOrSignUp='Login' />
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{" "}
            <Link
              href='/sign-up'
              className='underline underline-offset-1'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
