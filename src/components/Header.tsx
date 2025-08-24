import React from 'react';
import { Phone, Mail, Facebook, Instagram, Youtube, MessageCircleMore } from 'lucide-react';

const Header = React.memo(() => {
  return (
    <div className="bg-blue-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Contact Info */}
          <div className="flex flex-row items-center space-y-1 sm:space-y-0 space-x-6 sm:justify-between text-sm">
            <a href="mailto:sales@velsystems.in" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Mail size={14} />
              <span>sales@velsystems.in</span>
            </a>
            <a href="tel:+916572263827" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Phone size={14} />
              <span>+91 6572263827</span>
            </a>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" 
               className="hover:text-blue-400 transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" 
               className="hover:text-pink-400 transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" 
               className="hover:text-red-400 transition-colors">
              <Youtube size={16} />
            </a>
            <a href="https://wa.me/916572263827" target="_blank" rel="noopener noreferrer" 
               className="hover:text-green-400 transition-colors">
              <MessageCircleMore size={16}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;