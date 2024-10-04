import React, { useEffect, useState } from "react";

type Props = { children: React.ReactNode };

const MainContent = ({ children }: Props) => {
  const [, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <main className=' flex-1 p-4'>{children}</main>;
};

export default MainContent;
