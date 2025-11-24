const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto grid w-full gap-4 px-3 md:max-w-2xl dark:text-gray-100'>
      {children}
    </div>
  );
};

export default layout;
