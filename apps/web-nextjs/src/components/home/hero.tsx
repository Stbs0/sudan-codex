import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className='relative flex h-full min-h-[60vh] items-center justify-center bg-[url("/hero.webp")] bg-cover bg-center py-20 text-center'>
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/70"></div>
      <div className="relative z-10 container mx-auto flex flex-col items-center px-4">
        <Pill className="text-primary mx-auto mb-6 size-20 drop-shadow-lg" />
        <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Sudan Codex
        </h1>
        <p className="mb-8 text-xl text-white/80 drop-shadow">
          Search through Sudan drug index
        </p>
        <Link href={"/drug-list"}>
          <Button
            data-analytics="hero-explore-now"
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          >
            Explore Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
