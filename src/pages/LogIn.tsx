import FaceBookOAuth from "@/components/auth/FaceBookOAuth";
import GoogleOAuth from "@/components/auth/GoogleOAuth";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ComponentType } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckIfUserLoggedIn = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedRoute(props: P) {
    const navigate = useNavigate();
    const { user, userLoading, isLoading } = useAuth();
    if (userLoading || isLoading) {
      return <SpinnerOverlay />;
    }

    if (user) {
      if (user.profileComplete === false) {
        navigate("/user-info");
        return null;
      }
      navigate(-1);
      return null;
    }
    return <Component {...props} />;
  };
};

const Login = () => {
  return (
    <>
      <title>Login | Sudan Codex</title>
      <meta
        name='description'
        content='Login to your Sudan Codex account to sudan drug index'
      />
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
    </>
  );
};
const ImprovedLogIn = CheckIfUserLoggedIn(Login);
export default ImprovedLogIn;
