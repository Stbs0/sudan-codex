import { Pill } from "lucide-react";

export function Hero() {
  return (
    <section className='relative flex min-h-[85vh] items-center justify-center overflow-hidden py-24'>
      {/* Background with parallax-like effect */}
      <div
        className='absolute inset-0 z-0 bg-[url("/hero.webp")] bg-cover bg-fixed bg-center transition-transform duration-1000 hover:scale-105'
        aria-hidden='true'></div>

      {/* Dynamic Gradient Overlay */}
      <div className='to-primary/20 absolute inset-0 z-0 bg-linear-to-br from-black/90 via-black/70'></div>

      {/* Decorative Blob */}
      <div className='bg-primary/20 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[100px]'></div>

      <div className='relative z-10 container mx-auto px-4 text-center'>
        <div className='bg-primary/10 border-primary/20 text-primary animate-in fade-in slide-in-from-bottom-4 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 duration-1000'>
          <Pill className='size-4' />
          <span className='text-sm font-semibold tracking-wide uppercase'>
            Your Trusted Drug Directory
          </span>
        </div>

        <h1 className='animate-in fade-in slide-in-from-bottom-8 mb-6 text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl delay-200 duration-1000 md:text-7xl'>
          Sudan <span className='text-primary italic'>Codex</span>
        </h1>

        <p className='animate-in fade-in slide-in-from-bottom-12 mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-white/80 delay-300 duration-1000 md:text-2xl'>
          Access comprehensive drug information, manufacturers, and distributors
          in Sudan at your fingertips.
        </p>
        {/* TODO: add search implementation */}
        {/* <div className='animate-in fade-in slide-in-from-bottom-16 mx-auto mb-8 w-full max-w-2xl delay-500 duration-1000'>
          <div className='group relative rounded-[2.5rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md transition-all hover:bg-white/15'>
            <SearchDrug />

          </div>
          <div className='mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/60'>
            <span className='flex items-center gap-1'>
              <Search
                size={14}
                className='text-primary'
              />{" "}
              Search by Brand
            </span>
            <span className='flex items-center gap-1'>
              <Search
                size={14}
                className='text-primary'
              />{" "}
              Generic Names
            </span>
            <span className='flex items-center gap-1'>
              <Search
                size={14}
                className='text-primary'
              />{" "}
              Companies
            </span>
          </div>
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-white/30'>
        <span className='text-[10px] font-bold tracking-widest uppercase'>
          Explore More
        </span>
        <div className='h-8 w-px bg-gradient-to-b from-white/30 to-transparent'></div>
      </div>
    </section>
  );
}
