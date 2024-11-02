import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const UnauthorizedUserBtns = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className='text-white hover:bg-blue-700 bg-blue-600'
        variant={"link"}
        onClick={() => {
          navigate("/sign-up");
        }}>
        Join
      </Button>
      <Button
        className='text-white hover:bg-blue-700 bg-blue-600 '
        variant={"link"}
        onClick={() => {
          navigate("/log-in");
        }}>
        Sign In
      </Button>
    </>
  );
};

export default UnauthorizedUserBtns;
