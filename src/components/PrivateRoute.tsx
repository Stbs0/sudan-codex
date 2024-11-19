import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import SpinnerOverlay from "@/components/SpinnerOverlay";

const PrivateRoute = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <SpinnerOverlay />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to='/log-in'
      replace
    />
  );
};

export default PrivateRoute;
