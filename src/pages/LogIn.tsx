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
import { signIn } from "@/services/authServices";
import { FormProvider, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SaveUserInFIreStore } from "@/services/usersServices";
import GoogleOAuth from "@/components/auth/GoogleOAuth";
import FaceBookOAuth from "@/components/auth/FaceBookOAuth";
import useAuth from "@/hooks/useAuth";
import { getAdditionalUserInfo } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema, LogInSchemaType } from "@/lib/schemas";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const methods = useForm<LogInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(logInSchema),
  });

  if (user) {
    return (
      <Navigate
        to='/'
        replace
        state={{ type: "warning", message: "You are already logged in" }}
      />
    );
  }
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  if (isSubmitting) return <SpinnerOverlay />;
  const onSubmit = async ({ email, password }: LogInSchemaType) => {
    try {
      const results = await signIn(email, password);
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;
      if (isNewUser) {
        await SaveUserInFIreStore(results.user, results.providerId ?? "");
        navigate("/user-info");
      } else {
        navigate("/");
      }
      toast.success("Login successful", {
        description: "Welcome Back" + results.user.displayName,
      });
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
    <FormProvider {...methods}>
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
              <div className='grid gap-1'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>

                  <Link
                    to='/reset-password'
                    className='ml-auto inline-block text-sm underline'>
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
    </FormProvider>
  );
};
export default Login;
