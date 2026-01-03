"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function BackBtn() {
  return (
    <Button
      variant='outline'
      size='sm'
      className='flex items-center gap-2'
      asChild>
      <Link href='/drug-list'>
        <ArrowLeft className='h-4 w-4' />
        Back
      </Link>
    </Button>
  );
}

export default BackBtn;
