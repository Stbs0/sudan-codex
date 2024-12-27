import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UnauthorizedUserBtns = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          navigate("/sign-up");
        }}>
        Sign Up
      </Button>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          navigate("/log-in");
        }}>
        Log In
      </Button>
    </>
  );
};

export default UnauthorizedUserBtns;
