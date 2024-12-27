import FaceBookOAuth from "@/components/auth/FaceBookOAuth";
import FormFields from "@/components/FormFields";
import GoogleOAuth from "@/components/auth/GoogleOAuth";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useAuth from "@/hooks/useAuth";
import signUpSchema, { signUpSchemaType } from "@/lib/schemas/signUpSchema";
import { signUp } from "@/services/authServices";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAdditionalUserInfo } from "firebase/auth";

import { FormProvider, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const methods = useForm<signUpSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isSubmitting = methods.formState.isSubmitting;
  if (loading || isSubmitting) {
    return <SpinnerOverlay />;
  }
  if (user) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  const onSubmit = async ({ email, password }: signUpSchemaType) => {
    try {
      const results = await signUp(email, password);
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;

      if (isNewUser) {
        await SaveUserInFIreStore(results.user, results.providerId ?? "");
      }
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
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
              <div className='grid gap-2'>
                <FormFields
                  label='Password'
                  name='password'
                  type='password'
                />
              </div>
              <div className='grid gap-2'>
                <FormFields
                  label='Conform Password'
                  name='confirmPassword'
                  type='password'
                />
              </div>
              <Button
                disabled={isSubmitting}
                type='submit'
                className='w-full'>
                Create an account
              </Button>
              <GoogleOAuth
                isSubmitting={isSubmitting}
                logInOrSignUp='Sign up'
              />
              <FaceBookOAuth
                isSubmitting={isSubmitting}
                logInOrSignUp='Sign up'
              />
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{" "}
              <Link
                to='/log-in'
                className='underline underline-offset-2'>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SignUp;
