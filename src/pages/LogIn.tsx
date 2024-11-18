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
import { signIn } from "@/services/authServices";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FirebaseError } from "@firebase/util";
import useAuth from "@/hooks/useAuth";
import { SaveUserInFIreStore } from "@/services/usersServices";
import GoogleOAuth from "@/components/GoogleOAuth";
import FaceBookOAuth from "@/components/FaceBookOAuth";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<LogInSchemaType>();

  if (user) {
    navigate("/");
  }
  if (isSubmitting) return <SpinnerOverlay />;
  const onSubmit = async ({ email, password }: LogInSchemaType) => {
    try {
      const results = await signIn(email, password);
      const userCredential = results.user;

      await SaveUserInFIreStore(userCredential);
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

  return (
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
              disabled={isSubmitting}
              type='submit'
              className='w-full'>
              Login
            </Button>
            <GoogleOAuth
              logInOrSignUp='Login'
              isSubmitting={isSubmitting}
            />
            <FaceBookOAuth
              logInOrSignUp='Login'
              isSubmitting={isSubmitting}
            />
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
  );
};
export default Login;
