import useGetUser from "@/hooks/useGetUser";

import { Navigate, Outlet } from "react-router-dom";
import SpinnerOverlay from "./SpinnerOverlay";

const IsProfileComplete = () => {
  const { data, error, isError, isPending } = useGetUser();

  if (isPending) {
    return <SpinnerOverlay />;
  }
  if (data?.profileComplete === false) {
    return (
      <Navigate
        replace
        to='/user-info'
      />
    );
  }

  return <Outlet context={{ data, error, isError, isPending }} />;
};

export default IsProfileComplete;
