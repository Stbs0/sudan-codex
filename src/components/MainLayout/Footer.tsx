import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import linkedin from "@/assets/icons/linkedIn.svg";
import x from "@/assets/icons/x.svg";
import github from "@/assets/icons/github.svg";

const Footer = () => {
  return (
    <footer className='flex h-10 items-center justify-center gap-5 bg-primary text-center text-[#fff]'>
      <div className='flex justify-center gap-4'>
        <a
          href='https://github.com/Stbs0'
          className='flex items-center justify-center'>
          <img
            src={github}
            className='h-6 w-6'
            alt='github'
          />
        </a>
        <a
          href='https://twitter.com/stbs66'
          className='flex items-center justify-center'>
          <img
            src={x}
            className='h-6 w-6'
            alt='x'
          />
        </a>
        <a
          href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
          className='flex items-center justify-center'>
          <img
            src={linkedin}
            className='h-6 w-6'
            alt='linkedIn'
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
