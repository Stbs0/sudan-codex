const WhatsAppButton = () => {
  const phoneNumber = "+966508220012"; // Your phone number in international format (e.g., +9665xxxx)
  const message = encodeURIComponent(
    "explain the problem and, if possible, add a screenshot"
  ); // Customize the message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className='fixed right-6 bottom-6 z-50 flex size-10 items-center justify-center rounded-full shadow-lg transition-colors'
      aria-label='Chat on WhatsApp'>
      <img
        src='src/assets/icons/whatsApp.webp'
        alt='whatsapp logo'
      />
    </button>
  );
};

export default WhatsAppButton;
