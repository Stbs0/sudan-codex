import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Linkedin from "@/assets/icons/linkedIn.svg?react";
import X from "@/assets/icons/x.svg?react";
import Github from "@/assets/icons/github.svg?react";

const Footer = () => {
  return (
    <footer className='flex items-center justify-center gap-5 bg-primary p-2 text-center text-[#fff] dark:bg-purple-900'>
      <div className='flex justify-center gap-4'>
        <a
          href='https://github.com/Stbs0'
          className='flex items-center justify-center'>
          <Github className='h-6 w-6 dark:invert' />
        </a>
        <a
          href='https://twitter.com/stbs66'
          className='flex items-center justify-center'>
          <X className='h-6 w-6 dark:invert' />
        </a>
        <a
          href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
          className='flex items-center justify-center'>
          <Linkedin className='h-6 w-6 dark:invert' />
        </a>
      </div>
      <div>
        <a
          href='mailto:mohammedjrt@gmail.com'
          className=''>
          <Button>Contact me </Button>
        </a>
      </div>
      <Link to={"/policy"}> Policy and Terms</Link>
    </footer>
  );
};
export default Footer;
