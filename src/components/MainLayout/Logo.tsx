import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Logo = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`h-full p-0 hover:bg-transparent ${className}`}
      variant={"ghost"}
      onClick={() => navigate("/")}>
      <img
        className='h-full w-full object-contain'
        src='/src/assets/logo/purpleLogo.png'
        alt='logo'
      />
    </Button>
  );
};

export default Logo;
