import { Link } from "react-router-dom";
import Github from "../../assets/icons/github.svg";
import Linkedin from "../../assets/icons/linkedIn.svg";
import X from "../../assets/icons/x.svg";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className='bg-footer-background dark:bg-footer-background flex items-center justify-center gap-5 p-2 text-center text-[#fff]'>
      <div className='flex justify-center gap-4'>
        <a
          href='https://github.com/Stbs0'
          className='flex items-center justify-center'>
          <img
            className='h-6 w-6 dark:invert'
            src={Github}
          />
        </a>
        <a
          href='https://twitter.com/stbs66'
          className='flex items-center justify-center'>
          <img
            className='h-6 w-6 dark:invert'
            src={X}
          />
        </a>
        <a
          href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
          className='flex items-center justify-center'>
          <img
            className='h-6 w-6 dark:invert'
            src={Linkedin}
          />
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
