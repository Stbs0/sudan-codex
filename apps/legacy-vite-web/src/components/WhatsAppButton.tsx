// import whatsAppIcon from "@/assets/icons/whatsApp.webp";
// import posthog from "posthog-js";

// const WhatsAppButton = () => {
// const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

// const message = encodeURIComponent(
//   "explain the problem and, if possible, add a screenshot"
// );

// const handleClick = () => {
//   const url = `https://wa.me/${phoneNumber}?text=${message}`;
//   const newWindow = window.open(url, "_blank", "noopener,noreferrer");
//   if (!newWindow) {
//     posthog.capture("whatsapp");
//     console.warn("Failed to open WhatsApp - popup may be blocked");
//   }
// };

//   return (
//     <button
//       onClick={handleClick}
//       className={`sticky bottom-0 z-50 w-full overflow-x-visible rounded-full p-0 shadow-lg`}
//       aria-label='Chat on WhatsApp'>
//       <img
//         src={whatsAppIcon}
//         className='absolute -top-20 right-4 h-16 w-16'
//         alt='whatsapp logo'
//       />
//     </button>
//   );
// };

// export default WhatsAppButton;
