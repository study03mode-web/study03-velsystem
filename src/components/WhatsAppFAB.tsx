import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFAB = React.memo(() => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '916572263827';
    const message = 'Hello! I would like to know more about your products and services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us on WhatsApp
      </span>
    </button>
  );
});

WhatsAppFAB.displayName = 'WhatsAppFAB';

export default WhatsAppFAB;