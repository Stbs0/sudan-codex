import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const message = encodeURIComponent(
    `explain the problem and, if possible, add a screenshot.
    .اذا في اي مشكلة ارفق معاه سكرينشوت`
  );

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-2 sm:flex-row'>
        {/* Left Side: Links */}
        <div className='text-muted-foreground flex flex-col items-center gap-4 text-sm sm:flex-row'>
          <p>
            &copy; {new Date().getFullYear()} Sudan Codex. All rights reserved.
          </p>
          <Link
            href={"/privacy-policy"}
            className='hover:text-primary underline-offset-4 hover:underline'>
            Privacy Policy
          </Link>
          <Button
            data-analytics='footer-feedback'
            asChild
            variant='outline'
            size='default'
            className='bg-green-400 py-0 dark:bg-green-600 dark:text-white'>
            <a
              className='text-black'
              aria-label='Chat on WhatsApp'
              target='_blank'
              rel='noopener noreferrer'
              href={url}>
              <img
                className='size-6'
                src='/icons/whats-app-icon.svg'
                alt='Chat on WhatsApp'
              />
              Feedback or a Problem
            </a>
          </Button>
        </div>

        {/* Right Side: Social Icons */}
        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/Stbs0/sudan-codex'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className='text-muted-foreground hover:text-primary'>
            <Github className='size-5' />
          </a>
          <a
            href='https://twitter.com/stbs66'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Twitter/X'
            className='text-muted-foreground hover:text-primary'>
            <Twitter className='size-5' />
          </a>
          <a
            href='https://www.linkedin.com/in/mohammed-ibrahim-mahmoud/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='text-muted-foreground hover:text-primary'>
            <Linkedin className='size-5' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
