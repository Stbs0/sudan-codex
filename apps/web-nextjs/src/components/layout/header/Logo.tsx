"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

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
      className={cn(
        `flex cursor-pointer items-center justify-center p-0`,
        className,
      )}
      variant={"ghost"}
      data-analytics="header-logo"
      onClick={handleClick}
    >
      <img
        className="object-contain"
        src={"/logo/pLogo-small.webp"}
        alt="logo"
        title="logo"
        loading="eager"
      />
    </Button>
  );
};

export default Logo;
