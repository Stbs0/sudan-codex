import whatsAppIcon from "@/assets/icons/whatsApp.webp";
import posthog from "posthog-js";
const WhatsAppButton = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER; // Your phone number in international format (e.g., +9665xxxx)
  const message = encodeURIComponent(
    "explain the problem and, if possible, add a screenshot"
  ); // Customize the message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      posthog.capture("whatsapp");
      console.warn("Failed to open WhatsApp - popup may be blocked");
    }
  };

  return (
    <button
      onClick={handleClick}
      className='fixed right-6 bottom-6 z-50 flex size-10 items-center justify-center rounded-full shadow-lg transition-colors'
      aria-label='Chat on WhatsApp'>
      <img
        src={whatsAppIcon}
        className='size-10'
        alt='whatsapp logo'
      />
    </button>
  );
};

export default WhatsAppButton;
