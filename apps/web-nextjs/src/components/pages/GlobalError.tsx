"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  return (
    <html>
      <body>
        <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
          <h1 className='text-2xl font-bold'>Something went wrong!</h1>
          <p className='text-gray-600'>
            {error.message || "An unexpected error occurred"}
          </p>{" "}
          <button
            onClick={reset}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
};
