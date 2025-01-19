import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";

import { SaveUserReturnTypes } from "@/types/types";

/**
 * PrivateRoute component that protects routes based on user authentication
 * and profile completion status.
 */
const PrivateRoute = () => {
  const user = useLoaderData() as SaveUserReturnTypes;
  const location = useLocation();
  // const { data, error, isError, isLoading } = useGetUser();
  // console.log(data)

  // Show a loading spinner while user data or profile data is being fetched
  // if (loading) {
  //   return <SpinnerOverlay />;
  // }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return (
      <Navigate
        to='/log-in'
        replace
      />
    );
  }

  // Redirect to profile if user-info path is accessed and profile is complete
  if (location.pathname === "/user-info" && user?.profileComplete === true) {
    return (
      <Navigate
        to='/profile'
        replace
      />
    );
  }

  // Redirect to user-info if accessing any other path and profile is incomplete
  if (location.pathname !== "/user-info" && user?.profileComplete === false) {
    return (
      <Navigate
        to='/user-info'
        replace
      />
    );
  }

  // Render child components with user profile context
  return <Outlet context={{ user }} />;
};

export default PrivateRoute;
