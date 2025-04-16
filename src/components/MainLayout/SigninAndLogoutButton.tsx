import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const SigninAndLogoutButton = () => {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  return (
    <>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          navigate("/sign-up");
          setOpenMobile(false);
        }}>
        Sign Up
      </Button>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          navigate("/log-in");
          setOpenMobile(false);
        }}>
        Log In
      </Button>
    </>
  );
};

export default SigninAndLogoutButton;
