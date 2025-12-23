"use client";

import Link from "next/link";
import { Button } from "../../ui/button";

const SigninAndLogoutButton = () => {
  return (
    <>
      <Button
        asChild
        className="bg-purple-600 text-white hover:bg-purple-700"
        variant={"link"}
      >
        <Link href="/sign-up">Sign Up</Link>
      </Button>
      <Button
        asChild
        className="bg-purple-600 text-white hover:bg-purple-700"
        variant={"link"}
      >
        <Link href="/log-in">Log In</Link>
      </Button>
    </>
  );
};

export default SigninAndLogoutButton;
