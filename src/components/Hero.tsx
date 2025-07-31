import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className='relative flex h-full min-h-[60vh] items-center justify-center bg-[url("drugsBackground.jpg")] bg-cover bg-center py-20 text-center'>
      {/* Overlay */}
      <div className='pointer-events-none absolute inset-0 z-0 bg-black/60'></div>

      <div className='relative z-10 container mx-auto flex flex-col items-center px-4'>
        <Pill className='mx-auto mb-6 h-16 w-16 text-purple-600 drop-shadow-lg' />
        <h1 className='mb-4 text-5xl font-bold text-white drop-shadow-lg'>
          Welcome to Sudan Codex
        </h1>
        <p className='mb-8 text-xl text-white/90 drop-shadow'>
          Search through Sudan drug index
        </p>
        <Link to={"/drug-list"}>
          <Button
            size='lg'
            className='bg-purple-600 shadow-lg hover:bg-purple-700'>
            Explore Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
