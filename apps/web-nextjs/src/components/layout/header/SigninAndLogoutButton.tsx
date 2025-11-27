"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { useSidebar } from "../../ui/sidebar";

const SigninAndLogoutButton = () => {
  const router = useRouter();
  return (
    <>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          router.push("/sign-up");
        }}>
        Sign Up
      </Button>
      <Button
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}
        onClick={() => {
          router.push("/log-in");
        }}>
        Log In
      </Button>
    </>
  );
};

export default SigninAndLogoutButton;
