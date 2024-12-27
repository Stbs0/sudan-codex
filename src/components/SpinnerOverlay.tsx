import Spinner from "../assets/icons/SpinnerIcon.svg?react";

const SpinnerOverlay = () => {
  return (
    <div className='absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800/80'>
      <Spinner className='w-20 animate-spin' />
    </div>
  );
};

export default SpinnerOverlay;
