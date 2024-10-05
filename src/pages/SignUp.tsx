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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleAuthProvider } from "@/config/firebase";
import signUpSchema, { signUpSchemaType } from "@/lib/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

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
  console.log({ errors });
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
                    register={register}
                    label='First name'
                    placeholder='Mark'
                    name='firstName'
                    errors={errors}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormFields
                    register={register}
                    label='Last name'
                    placeholder='John'
                    name='lastName'
                    errors={errors}
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <FormFields
                  register={register}
                  label='Email'
                  placeholder='example@example.com'
                  name='email'
                  errors={errors}
                />
              </div>
              <div className='grid gap-2'>
                <FormFields
                  register={register}
                  label='Password'
                  name='password'
                  errors={errors}
                  type='password'
                />
              </div>
              <div className='grid gap-2'>
                <FormFields
                  register={register}
                  label='Conform Password'
                  name='confirmPassword'
                  errors={errors}
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
