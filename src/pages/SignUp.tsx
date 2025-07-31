import FaceBookOAuth from "@/components/auth/FaceBookOAuth";
import GoogleOAuth from "@/components/auth/GoogleOAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Link } from "react-router-dom";
// const CheckIfUserLoggedIn = <P extends object>(Component: ComponentType<P>) => {
//   return function ProtectedRoute(props: P) {
//     const { user } = useAuth();

//     if (user) {
//       return (
//         <Navigate
//           to='/'
//           replace
//           state={{ type: "warning", message: "You are already logged in" }}
//         />
//       );
//     }
//     return <Component {...props} />;
//   };
// };
const SignUp = () => {
  return (
    <>
      <title>Sign Up | Sudan Codex</title>
      <meta
        name='description'
        content='Sign up to your Sudan Codex account to sudan drug index'
      />
      <div className='flex h-full justify-center items-center'>
        <Card className='min-h-40'>
          <CardHeader>
            <CardTitle className='text-xl'>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <GoogleOAuth logInOrSignUp='Sign up' />
              <FaceBookOAuth logInOrSignUp='Sign up' />
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
      </div>
    </>
  );
};
// const ProtectedSignUp = CheckIfUserLoggedIn(SignUp);
export default SignUp;
