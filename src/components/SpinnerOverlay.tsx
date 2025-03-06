import { LoaderCircle } from "lucide-react";
import ReactDOM from "react-dom";

const SpinnerOverlay = () => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50'>
      <LoaderCircle className='h-16 w-16 text-purple-600' />
    </div>,
    document.body // Render the spinner at the end of the body element
  );
};

export default SpinnerOverlay;
