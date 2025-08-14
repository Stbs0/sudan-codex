import { ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className='fixed right-6 bottom-6 z-50 size-10 rounded-full bg-gray-700 p-2 shadow-md transition hover:bg-gray-300 dark:bg-gray-200 dark:hover:bg-gray-600'
      aria-label='Scroll to top'>
      <ArrowBigUp className='size-8 text-white dark:text-gray-800' />
    </Button>
  );
};

export default ScrollToTopButton;
