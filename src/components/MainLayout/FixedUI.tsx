import { Toaster } from "sonner";
import WhatsAppButton from "../WhatsAppButton";

const FixedUI = () => {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        richColors
        expand={true}
        closeButton
      />

      {/* Fixed WhatsApp Button */}
      <div className='fixed right-6 bottom-6 z-50'>
        <WhatsAppButton />
      </div>
    </>
  );
};

export default FixedUI;
