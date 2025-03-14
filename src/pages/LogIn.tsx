import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import GoogleOAuth from "@/components/auth/GoogleOAuth";
import FaceBookOAuth from "@/components/auth/FaceBookOAuth";
import { useAuth } from "@/hooks/useAuth";
import { ComponentType } from "react";
import SpinnerOverlay from "@/components/SpinnerOverlay";

const CheckIfUserLoggedIn = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedRoute(props: P) {
    const { user, userLoading, isLoading } = useAuth();
    if (userLoading || isLoading) {
      return <SpinnerOverlay />;
    }
    if (user) {
      return (
        <Navigate
          to='/'
          replace
          state={{ type: "warning", message: "You are already logged in" }}
        />
      );
    }
    return <Component {...props} />;
  };
};

const Login = () => {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <GoogleOAuth logInOrSignUp='Login' />
          <FaceBookOAuth logInOrSignUp='Login' />
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
  );
};
const ImprovedLogIn = CheckIfUserLoggedIn(Login);
export default ImprovedLogIn;
