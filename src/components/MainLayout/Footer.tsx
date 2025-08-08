import { Link } from "react-router-dom";
import Github from "../../assets/icons/github.svg";
import Linkedin from "../../assets/icons/linkedIn.svg";
import X from "../../assets/icons/x.svg";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className='flex flex-col gap-4 py-6 text-black sm:flex-row sm:justify-center dark:text-white'>
      {/* Contact & Policy */}
      <div className='flex justify-center gap-3'>
        <Button asChild>
          <a href='mailto:mohammedjrt@gmail.com'>Contact me via email</a>
        </Button>
        <Button asChild>
          <Link to='/policy'>Policy & Terms</Link>
        </Button>
      </div>
      {/* Social Icons */}
      <div className='flex justify-center gap-4'>
        <a
          href='https://github.com/Stbs0/sudan-codex'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'>
          <img
            src={Github}
            alt='GitHub'
            className='h-6 w-6 dark:invert'
          />
        </a>
        <a
          href='https://twitter.com/stbs66'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Twitter/X'>
          <img
            src={X}
            alt='X/Twitter'
            className='h-6 w-6 dark:invert'
          />
        </a>
        <a
          href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'>
          <img
            src={Linkedin}
            alt='LinkedIn'
            className='h-6 w-6 dark:invert'
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
