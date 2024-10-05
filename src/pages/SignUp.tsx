import FaceBookIcon from "@/assets/icons/FacebookIcon";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import SpinnerIcon from "@/assets/icons/SpinnerIcon";
import FormFields from "@/components/FormFields";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { signUpSchemaType } from "@/lib/schemas/signUpSchema";
import {
  FaceBookSignIn,
  GoogleSignIn,
  
  register,
} from "@/services/authServices";
import { SyntheticEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<signUpSchemaType>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: signUpSchemaType) => {
    try {
      await register(email, password);

      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign up. Please try again.",
      });
      console.log(error);
    }
  };

  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await GoogleSignIn();
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
      });
      console.log(error);
    }
  };
  const signInWithFaceBook = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await FaceBookSignIn();
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
      });
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button
                variant='outline'
                className='w-full flex items-center justify-center gap-2'
                disabled={isSubmitting}
                onClick={signInWithGoogle}>
                Sign up with Google <GoogleIcon />
              </Button>
              <Button
                variant='outline'
                className='w-full flex items-center justify-center gap-2'
                disabled={isSubmitting}
                onClick={signInWithFaceBook}>
                Sign up with FaceBook <FaceBookIcon />
              </Button>
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
      {isSubmitting && <SpinnerIcon />}
    </>
  );
};

export default SignUp;
