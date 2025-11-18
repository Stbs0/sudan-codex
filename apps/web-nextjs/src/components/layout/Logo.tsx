"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Logo = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== "/") {
      router.push("/", {});
    }
  };

  return (
    <Button
      asChild
      className={`p-0 hover:bg-transparent ${className}`}
      variant={"ghost"}
      onClick={handleClick}>
      <img
        className='object-contain'
        src={"/logo/pLogo-small.webp"}
        alt='logo'
      />
    </Button>
  );
};

export default Logo;
