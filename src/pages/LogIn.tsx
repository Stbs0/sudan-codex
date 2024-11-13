import FaceBookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import FormFields from "@/components/FormFields";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogInSchemaType } from "@/lib/schemas/LogInSchema";
import {
  FaceBookSignIn,
  GoogleSignIn,
  SaveUserInFIreStore,
  signIn,
} from "@/services/authServices";
import { SyntheticEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FirebaseError } from "@firebase/util";

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<LogInSchemaType>();

  const onSubmit = async ({ email, password }: LogInSchemaType) => {
    try {
      await signIn(email, password);

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          toast.error("email or password is incorrect. Please try again.");
          return;
        }
      }
      console.log(error);
    }
  };
  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await GoogleSignIn();
      console.log(results);
      await SaveUserInFIreStore(results.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/account-exists-with-different-credential") {
          toast.error(
            "Account already exists with different credentials. Please try again.",
          );
          return;
        }
      }
      console.log(error);
    }
  };
  const signInWithFaceBook = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await FaceBookSignIn();
      console.log(results);
      await SaveUserInFIreStore(results.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/account-exists-with-different-credential") {
          toast.error(
            "Account already exists with different credentials. Please try again.",
          );
          return;
        }
      }
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <FormFields
                  label='Email'
                  placeholder='example@example.com'
                  name='email'
                />
              </div>
              <div className='grid gap-1 '>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>

                  <Link
                    to='/reset-password'
                    className='ml-auto inline-block text-sm underline '>
                    Forgot your password?
                  </Link>
                </div>
                <FormFields
                  label=''
                  name='password'
                  type='password'
                />
              </div>
              <Button
                type='submit'
                className='w-full'>
                Login
              </Button>
              <Button
                onClick={signInWithGoogle}
                variant='outline'
                className='w-full flex items-center justify-center gap-2 '>
                Login with Google <GoogleIcon />
              </Button>
              <Button
                onClick={signInWithFaceBook}
                variant='outline'
                className='w-full flex items-center justify-center gap-2  '>
                Login with FaceBook <FaceBookIcon />
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{" "}
              <Link
                to='/sign-up'
                className='underline underline-offset-1'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
      {isSubmitting && <SpinnerOverlay />}
    </>
  );
};
export default Login;
