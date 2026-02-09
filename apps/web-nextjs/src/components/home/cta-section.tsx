import { ArrowRight, Download, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className='bg-primary text-primary-foreground relative overflow-hidden py-24'>
      {/* Background Decorative Elements */}
      <div className='pointer-events-none absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-3xl' />

      <div className='relative z-10 container mx-auto px-4'>
        <div className='flex flex-col items-center justify-between gap-12 lg:flex-row'>
          <div className='text-center lg:w-1/2 lg:text-left'>
            <h2 className='mb-6 text-4xl leading-tight font-bold md:text-5xl'>
              Ready to access Sudan&apos;s most complete drug database?
            </h2>
            <p className='text-primary-foreground/80 mx-auto mb-10 max-w-xl text-xl lg:mx-0'>
              Download our mobile app for offline access and enhanced features
              tailored for healthcare providers.
            </p>
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start'>
              <Button
                asChild
                size='lg'
                variant='secondary'
                className='group rounded-2xl px-8 py-7 text-lg font-bold shadow-xl'>
                <a
                  href='https://download.sudancodex.app/sudancodexv1.apk'
                  download='sudancodex.apk'
                  title='Download Sudan Codex Android App (APK)'
                  aria-label='Download Sudan Codex Android App (APK)'
                  rel='noopener noreferrer'>
                  <Smartphone className='mr-2 h-6 w-6' />
                  Get the App
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </a>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='border-primary-foreground/30 hover:bg-primary-foreground/10 rounded-2xl px-8 py-7 text-lg font-bold'>
                <Link
                  href='/drug-list'
                  title='Explore our drug directory'
                  aria-label='Explore our drug directory'>
                  Explore Directory
                </Link>
              </Button>
            </div>
          </div>

          <div className='relative flex flex-1 items-center justify-center lg:w-1/2'>
            {/* Responsive App Showcase - Non-stacked */}
            <div className='flex items-center justify-center gap-4 lg:gap-8'>
              {/* Secondary Screen 1 - Hidden on small mobile */}
              <div className='hidden xl:block'>
                <div className='relative w-[220px] overflow-hidden rounded-4xl border-4 border-slate-800 bg-slate-900 shadow-xl transition-transform duration-500 hover:-translate-y-2'>
                  <Image
                    src='/pic/02.png'
                    alt='Sudan Codex App Interface - Categories'
                    width={220}
                    height={440}
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>

              {/* Main Focus Screen - Always visible and largest */}
              <div className='relative z-20'>
                <div className='w-[240px] overflow-hidden rounded-[2.5rem] border-4 border-slate-900 bg-slate-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] sm:w-[280px] md:w-xs md:border-8'>
                  <Image
                    src='/pic/01.png'
                    alt='Sudan Codex App Interface - Home'
                    width={320}
                    height={640}
                    className='h-auto w-full object-cover'
                    priority
                  />
                  {/* Subtle Glow behind main phone */}
                  <div className='bg-primary/20 pointer-events-none absolute inset-0 -z-10 blur-3xl' />
                </div>
              </div>

              {/* Secondary Screen 2 - Visible on larger mobile/tablet */}
              <div className='hidden md:block'>
                <div className='relative w-[220px] overflow-hidden rounded-4xl border-4 border-slate-800 bg-slate-900 shadow-xl transition-transform duration-500 hover:-translate-y-2 lg:w-[240px] xl:w-[260px]'>
                  <Image
                    src='/pic/03.png'
                    alt='Sudan Codex App Interface - Search Result'
                    width={260}
                    height={520}
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
