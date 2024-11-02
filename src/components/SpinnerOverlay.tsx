import SpinnerIcon from "@/assets/icons/SpinnerIcon";

const SpinnerOverlay = () => {
  return (
    <div className='absolute top-0 left-0 h-full w-full z-50 flex justify-center items-center bg-gray-800/80'>
      <SpinnerIcon />
    </div>
  );
};

export default SpinnerOverlay;
