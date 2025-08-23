import { useLocation, useNavigate } from "react-router-dom";
import LogoPic from "../../assets/logo/pLogo-small.webp";
import { Button } from "../ui/button";

const Logo = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/", {});
    }
  };

  return (
    <Button
      asChild
      className={`p-0 hover:bg-transparent ${className}`}
      variant={"ghost"}
      onClick={handleClick}>
      <img
        className='object-contain'
        src={LogoPic}
        alt='logo'
      />
    </Button>
  );
};

export default Logo;
