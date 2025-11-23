"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { useSidebar } from "../../ui/sidebar";

const SigninAndLogoutButton = () => {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  return (
    <>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          router.push("/sign-up");
          setOpenMobile(false);
        }}>
        Sign Up
      </Button>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          router.push("/log-in");
          setOpenMobile(false);
        }}>
        Log In
      </Button>
    </>
  );
};

export default SigninAndLogoutButton;
