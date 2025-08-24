import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer = React.memo(() => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">

          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src="/logo/vels-logo.png"
                alt="VEL Systems Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 my-3">
              Delivering reliable software and hardware solutions to help businesses innovate,
              scale, and succeed in the digital era.
            </p>
            {/* Social Links */}
            <div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 text-gray-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 text-gray-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 text-gray-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://wa.me/916572263827"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 text-gray-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-md font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Our Services</Link></li>
              <li><Link to="/customers" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Our Customers</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-md font-semibold mb-4">POLICIES</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/returns-refunds-cancellations-exchange-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Returns, Refunds, Cancellations, Exchange Policy</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>

          {/* Registered Office Address */}
          <div>
            <h3 className="text-md font-semibold mb-4">REGISTERED OFFICE ADDRESS</h3>
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  NO.7, Varadhanar Street,<br />
                  Vedhachala Nagar,<br />
                  Chengalpattu, Tamil Nadu 603001
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+916572263827" className="text-sm hover:text-blue-400 text-gray-400 transition-colors">
                  +91 6572263827
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:sales@velsystems.in" className="text-sm hover:text-blue-400 text-gray-400 transition-colors">
                  sales@velsystems.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VEL SYSTEMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;