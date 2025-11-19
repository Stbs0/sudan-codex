import Link from "next/link";
import GoogleOAuth from "../../components/auth/GoogleOAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const SignUp = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <Card className='min-h-40'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <GoogleOAuth logInOrSignUp='Sign up' />
          </div>
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
