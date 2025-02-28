import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import useGetUser from "@/hooks/useGetUser";
import SpinnerOverlay from "./SpinnerOverlay";

/**
 * PrivateRoute component that protects routes based on user authentication
 * and profile completion status.
 */
const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { data } = useGetUser();

  // Show a loading spinner while user data or profile data is being fetched
  if (loading) {
    return <SpinnerOverlay />;
  }
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
  if (location.pathname === "/user-info" && data?.profileComplete === true) {
    return (
      <Navigate
        to='/profile'
        replace
      />
    );
  }

  // Redirect to user-info if accessing any other path and profile is incomplete
  if (location.pathname !== "/user-info" && data?.profileComplete === false) {
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
