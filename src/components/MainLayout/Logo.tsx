import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Button
      className='h-full hover:bg-transparent  '
      variant={"ghost"}
      onClick={() => navigate("/")}>
      <img
        className='h-full w-full object-contain'
        src='src/assets/logo/whiteLogo.png'
        alt=''
      />
    </Button>
  );
};

export default Logo;
