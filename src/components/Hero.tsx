import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className='relative flex items-center justify-center min-h-[60vh] bg-[url("public/drugsBackground.jpg")] bg-cover bg-center py-20 text-center'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60 pointer-events-none z-0'></div>

      <div className='relative z-10 container mx-auto px-4 flex flex-col items-center'>
        <Pill className='mx-auto mb-6 h-16 w-16 text-purple-600 drop-shadow-lg' />
        <h1 className='mb-4 text-5xl font-bold text-white drop-shadow-lg'>
          Welcome to Sudan Codex
        </h1>
        <p className='mb-8 text-xl text-white/90 drop-shadow'>
          Search through Sudan drug index
        </p>
        <Link to={'/drug-list'}>
          <Button size='lg' className='bg-purple-600 hover:bg-purple-700 shadow-lg'>
            Explore Now
          </Button>
        </Link>
      </div>
    </section>
  );
}




