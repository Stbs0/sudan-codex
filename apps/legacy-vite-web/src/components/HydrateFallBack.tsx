import { Skeleton } from "@/components/ui/skeleton";

export function HydrateFallback() {
  return (
    <div className='grid w-full content-between dark:bg-slate-800'>
      {/* Header Skeleton */}
      <header className='sticky inset-x-0 top-0 z-50 flex h-[64px] items-center justify-between border-b bg-white p-3 shadow-lg shadow-purple-200 dark:border-neutral-800 dark:bg-slate-800 dark:shadow-neutral-900'>
        <div className='flex items-center gap-2'>
          {/* Logo placeholder */}
          <Skeleton className='h-8 w-32' />
        </div>
        <div className='flex items-center space-x-4'>
          {/* Theme toggle placeholder */}
          <Skeleton className='h-8 w-8 rounded-full' />
          {/* User profile placeholder */}
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>
      </header>

      {/* Main content skeleton */}
      <main className='container mx-auto py-8'>
        {/* <div className='space-y-4'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-32 w-full' />
          <Skeleton className='h-32 w-full' />
          <Skeleton className='h-32 w-full' />
        </div> */}
      </main>

      {/* Footer skeleton */}
      <footer className='bg-primary flex items-center justify-center gap-5 p-2 text-center text-[#fff] dark:bg-purple-900'>
        <Skeleton className='h-6 w-32 bg-white/20' />
        <Skeleton className='h-9 w-24 rounded-md bg-white/20' />
        <Skeleton className='h-6 w-32 bg-white/20' />
      </footer>
    </div>
  );
}
