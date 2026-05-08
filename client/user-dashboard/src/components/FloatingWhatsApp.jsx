import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const FloatingWhatsApp = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const message = 'Hello, I need support with my account.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-40 animate-bounce"
      title="Chat on WhatsApp"
    >
      <FiMessageCircle size={24} />
    </a>
  );
};

export default FloatingWhatsApp;
