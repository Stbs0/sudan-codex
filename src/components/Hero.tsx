import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className='py-20 text-center'>
      <div className='container mx-auto px-4'>
        <Pill className='mx-auto mb-6 h-16 w-16 text-purple-600' />
        <h1 className='mb-4 text-5xl font-bold text-gray-900 dark:text-gray-400'>
          Welcome to Sudan Codex
        </h1>
        <p className='mb-8 text-xl text-gray-600 dark:text-gray-500'>
          Search through Sudan drug index
        </p>
        <Link
          to={"/drug-list"}
          className=' '>
          <Button
            size='lg'
            className='bg-purple-600 hover:bg-purple-700'>
            Explore Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
