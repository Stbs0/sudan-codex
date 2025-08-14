import { Toaster } from "../ui/sonner";

const FixedUI = () => {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        richColors
        position='top-center'
        expand={true}
        closeButton
      />
    </>
  );
};

export default FixedUI;
