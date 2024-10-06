import useWidth from "@/hooks/useWidth";
import { createContext } from "react";

const WindowsWidthContext = createContext(false);

const WindowsWidthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useWidth();
  return (
    <WindowsWidthContext.Provider value={isMobile}>
      {children}
    </WindowsWidthContext.Provider>
  );
};

export default WindowsWidthProvider;
