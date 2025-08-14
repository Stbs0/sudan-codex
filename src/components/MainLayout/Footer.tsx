import { Link } from "react-router-dom";
import Github from "../../assets/icons/github.svg";
import Linkedin from "../../assets/icons/linkedIn.svg";
import X from "../../assets/icons/x.svg";
import { Button } from "../ui/button";

const Footer = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const message = encodeURIComponent(
    `explain the problem and, if possible, add a screenshot.
    .اذا في اي مشكلة ارفق معاه سكرينشوت`
  );

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <footer className='flex flex-col gap-3 py-3 text-black shadow-[0_-4px_12px_rgba(0,0,0,0.1)] sm:flex-row sm:justify-center sm:py-6 dark:border-neutral-800 dark:text-white'>
      {/* Contact & Policy */}
      <div className='flex justify-center gap-3'>
        <Button
          asChild
          className='bg-green-400 dark:bg-green-400 dark:text-white'>
          <a
            aria-label='Chat on WhatsApp'
            target='_blank'
            rel='noopener noreferrer'
            href={url}>
            Problem or Feedback
            <img
              className='w-6'
              alt='Chat on WhatsApp'
              src='/Digital_Glyph_White.svg'
            />
          </a>
        </Button>
        <Button asChild>
          <Link to='/privacy-policy'>Policy & Terms</Link>
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
