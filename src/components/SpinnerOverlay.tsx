import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import ReactDOM from "react-dom";

const SpinnerOverlay = () => {
  const LoadingSpinner = motion.create(LoaderCircle);

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50'>
      <LoadingSpinner
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className='h-16 w-16 text-purple-600'
      />
    </div>,
    document.body // Render the spinner at the end of the body element
  );
};

export default SpinnerOverlay;
