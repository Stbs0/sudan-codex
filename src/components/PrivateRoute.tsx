import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

import SpinnerOverlay from "./SpinnerOverlay";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <SpinnerOverlay />;
  }
  if (user) {
    return children;
  }

  return (
    <Navigate
      replace
      to='/log-in'
    />
  );
};

export default PrivateRoute;
