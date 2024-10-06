import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import SpinnerIcon from "@/assets/icons/SpinnerIcon";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <SpinnerIcon />;
  }

  if (user) {
    return children;
  }

  return <Navigate replace to='/log-in' />;
};

export default PrivateRoute;
