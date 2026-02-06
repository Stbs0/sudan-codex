"use client";

import Link from "next/link";

import { Button } from "../../ui/button";

const SigninAndLogoutButton = () => {
  return (
    <>
      <Button
        asChild
        data-analytics='header-sign-up'
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}>
        <Link href='/auth/sign-up'>Sign Up</Link>
      </Button>
      <Button
        asChild
        data-analytics='header-log-in'
        className='bg-purple-600 text-white hover:bg-purple-700'
        variant={"link"}>
        <Link href='/auth/sign-in'>Log In</Link>
      </Button>
    </>
  );
};

export default SigninAndLogoutButton;
