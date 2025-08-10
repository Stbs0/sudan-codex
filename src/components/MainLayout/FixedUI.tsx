import { Toaster } from "sonner";

const FixedUI = () => {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        richColors
        expand={true}
        closeButton
      />
    </>
  );
};

export default FixedUI;
