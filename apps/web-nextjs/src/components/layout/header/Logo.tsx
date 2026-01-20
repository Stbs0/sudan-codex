"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

const Logo = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState<
    "/f-logo/lgthj-01.png" | "/f-logo/lgthj-02.png"
  >("/f-logo/lgthj-02.png");

  // Only render theme-specific logo after mounting
  useEffect(() => {
    const fn = () => {
      if (resolvedTheme === "dark") {
        setLogoSrc("/f-logo/lgthj-02.png");
      } else {
        setLogoSrc("/f-logo/lgthj-01.png");
      }
    };
    fn();
  }, [resolvedTheme]);

  const handleClick = () => {
    if (pathname !== "/") {
      router.push("/", {});
    }
  };

  // Default to light theme during SSR to match most cases
  // const logoSrc = mounted
  //   ? resolvedTheme === "dark"
  //     ? "/f-logo/lgthj-02.png"
  //     : "/f-logo/lgthj-01.png"
  //   : "/f-logo/lgthj-01.png"; // Default for SSR

  return (
    <Button
      className={cn(
        `flex w-32 cursor-pointer items-center justify-center p-0`,
        className
      )}
      variant={"ghost"}
      data-analytics='header-logo'
      onClick={handleClick}>
      <img
        className='object-contain'
        src={logoSrc}
        alt='logo'
        title='logo'
        loading='eager'
      />
    </Button>
  );
};

export default Logo;
