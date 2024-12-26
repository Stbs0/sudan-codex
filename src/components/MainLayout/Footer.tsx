import LinkedIn from "@/assets/icons/LinkedIn";
import XIcon from "@/assets/icons/XIcon";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-primary  text-[#fff] p-4  text-center flex flex-col justify-center items-center gap-5 '>
      <div className='flex gap-4'>
        <div>
          <a
            href='mailto:mohammedjrt@gmail.com'
            className=''>
            <Button>Contact me </Button>
          </a>
        </div>
        <div className=' flex justify-center space-x-4'>
          <a
            href='https://github.com/Stbs0'
            className='flex justify-center items-center'>
            <GitHubLogoIcon className='w-6 h-6 inline-block mr-2' />
          </a>{" "}
          <a
            href='https://twitter.com/stbs66'
            className='flex justify-center items-center'>
            <XIcon />
          </a>{" "}
          <a
            href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
            className='flex justify-center items-center'>
            <LinkedIn />
          </a>
        </div>
      </div>

      <Link to={"/policy"}> Policy and Terms</Link>
    </footer>
  );
};

export default Footer;
