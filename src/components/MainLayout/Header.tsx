import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
import PopoverSearch from "../form/PopoverSearch";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  windowsWidth: number;
};

const Header = ({ windowsWidth }: Props) => {
  // Add a context  for the window width from MainContent
  const navigate = useNavigate();
  return (
    <header className='w-full flex justify-between items-center p-4 bg-gray-800'>
      <div className='text-2xl font-bold text-white'>DrugWiki</div>
      <div className='flex items-center space-x-4'>
        <ModeToggle />
        {windowsWidth > 600 ? (
          <Input
            placeholder='Search'
            className='w-20 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500'
          />
        ) : (
          <PopoverSearch />
        )}
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          variant={"link"}
          onClick={() => {
            navigate("/sign-up");
          }}>
          Join
        </Button>
        <Button
          className='bg-blue-600 hover:bg-blue-700'
          variant={"link"}
          onClick={() => {
            navigate("/log-in");
          }}>
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
