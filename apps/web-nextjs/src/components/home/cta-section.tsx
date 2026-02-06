import { ArrowRight, Download, Smartphone } from "lucide-react";
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
                  <Download className='mr-2 h-6 w-6' />
                  Explore Directory
                </Link>
              </Button>
            </div>
          </div>

          <div className='relative hidden justify-center lg:flex lg:w-1/2'>
            {/* Mockup */}
            <div className='relative h-[600px] w-[300px] rotate-3 transform overflow-hidden rounded-[3rem] border-8 border-slate-800 bg-slate-900 shadow-2xl transition-transform duration-500 hover:rotate-0'>
              <div className='absolute top-0 flex h-8 w-full items-end justify-center bg-slate-800 pb-1'>
                <div className='h-4 w-20 rounded-full bg-slate-900' />
              </div>
              <div className='p-6 pt-12'>
                <div className='flex items-center justify-between'>
                  <div className='bg-primary/20 h-5 w-24 rounded-full' />
                  <div className='bg-primary/20 h-5 w-5 rounded-full' />
                </div>
                <div className='mt-8 space-y-4'>
                  <div className='bg-primary/10 border-primary/5 flex h-10 w-full items-center rounded-xl border px-3'>
                    <div className='bg-primary/20 h-3 w-32 rounded-full' />
                  </div>
                  <div className='bg-card border-border h-64 w-full rounded-2xl border p-4 shadow-sm'>
                    <div className='mb-4 flex items-center gap-3'>
                      <div className='bg-primary/10 h-10 w-10 rounded-lg' />
                      <div className='space-y-2'>
                        <div className='bg-primary/20 h-3 w-20 rounded-full' />
                        <div className='bg-primary/10 h-2 w-12 rounded-full' />
                      </div>
                    </div>
                    <div className='mb-6 space-y-2'>
                      <div className='bg-muted h-2 w-full rounded-full' />
                      <div className='bg-muted h-2 w-full rounded-full' />
                      <div className='bg-muted h-2 w-2/3 rounded-full' />
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='bg-primary/10 h-14 rounded-xl' />
                      <div className='bg-primary/10 h-14 rounded-xl' />
                    </div>
                  </div>
                  <div className='bg-primary/5 border-primary/5 h-20 w-full rounded-xl border' />
                </div>
              </div>
            </div>
            {/* Second phone mockup */}
            <div className='absolute -right-4 -bottom-10 -z-10 hidden h-[560px] w-[280px] -rotate-6 transform rounded-[3rem] border-8 border-slate-700 bg-slate-800 shadow-2xl xl:block' />
          </div>
        </div>
      </div>
    </section>
  );
}
