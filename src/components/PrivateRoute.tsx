import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import SpinnerOverlay from "./SpinnerOverlay";
import { toast } from "sonner";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();
  useEffect(() => {
    return () => {
      if (!user && !loading) {
        toast("Please Log In");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
