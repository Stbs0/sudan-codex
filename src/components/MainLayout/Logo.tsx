import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Logo = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className={`h-full hover:bg-transparent p-0  ${className}`}
      variant={"ghost"}
      onClick={() => navigate("/")}>
      <img
        className='h-full w-full object-contain'
        src='/src/assets/logo/purpleLogo.png'
        alt=''
      />
    </Button>
  );
};

export default Logo;
