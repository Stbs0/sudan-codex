"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

function BackBtn() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant='outline'
      size='sm'
      className='flex items-center gap-2'>
      <ArrowLeft className='h-4 w-4' />
      Back
    </Button>
  );
}

export default BackBtn;
