import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import LogoPic from "../../assets/logo/purpleLogo.png";
const Logo = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`h-full p-0 hover:bg-transparent ${className}`}
      variant={"ghost"}
      onClick={() => navigate("/")}>
      <img
        className='h-full w-full object-contain'
        src={LogoPic}
        alt='logo'
      />
    </Button>
  );
};

export default Logo;
