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

import { auth, googleAuthProvider } from "@/config/firebase";
import signUpSchema, { signUpSchemaType } from "@/lib/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<signUpSchemaType>();

  const navigate = useNavigate();

  const onSubmit = async (data: signUpSchemaType) => {
    try {
      console.log(data);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGoogle = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
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
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <FormFields
                    label='First name'
                    placeholder='Mark'
                    name='firstName'
                  />
                </div>
                <div className='grid gap-2'>
                  <FormFields
                    label='Last name'
                    placeholder='John'
                    name='lastName'
                  />
                </div>
              </div>
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
                className='w-full'
                disabled={isSubmitting}
                onClick={signInWithGoogle}>
                Sign up with Google
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{" "}
              <Link
                to='/log-in'
                className='underline'>
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
