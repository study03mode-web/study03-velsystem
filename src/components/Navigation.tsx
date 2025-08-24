import React, { useState, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './cart/CartIcon';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';

const Navigation = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setActiveDropdown(null); // Close any open dropdowns when toggling menu
  }, []);

  const handleDropdownToggle = useCallback((menu: string) => {
    setActiveDropdown(prev => prev === menu ? null : menu);
  }, []);

  const handleMobileLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const itProducts = [
    { title: 'Desktop', href: '/desktop' },
    { title: 'Laptop', href: '/laptop' },
    { title: 'Printer', href: '/printer' },
    { title: 'Tablet', href: '/tablet' },
    { title: 'Software', href: '/software' },
    { title: 'Mobile Accessories', href: '/mobile-accessories' },
    { title: 'Server & Workstation', href: '/server' },
    { title: 'Network Hardware Solution', href: '/network-hardware' },
    { title: 'Online & Offline UPS', href: '/ups' },
    { title: 'Firewall', href: '/firewall' },
    { title: 'IT Peripherals', href: '/it-peripherals' },
    { title: 'WiFi Access Point', href: '/wifi-access-point' },
    { title: 'Photocopier', href: '/photocopier' },
    { title: 'Data Storage', href: '/data-storage' },
    { title: 'Data Recovery', href: '/data-recovery' },
    { title: 'Projector', href: '/projector' }
  ];

  const securitySolutions = [
    { title: 'CCTV Camera', href: '/cctv' },
    { title: 'Door Access Control', href: '/door-access-control' },
    { title: 'Biometric System', href: '/biometric-system' },
    { title: 'Intercom', href: '/intercom' },
    { title: 'Boom Barrier', href: '/boom-barrier' },
    { title: 'Metal Detector & Signal Jammer', href: '/metal-detector-signal-jammer' },
    { title: 'Signal Booster', href: '/signal-booster' },
    { title: 'Video Door Phone', href: '/video-door-phone' },
    { title: 'Cash Counting Machine', href: '/cash-counting-machine' },
    { title: 'Fire Alarms', href: 'fire-alarms' },
    { title: 'Safety Lockers', href: '/safety-lockers' },
    { title: 'GPS Vehicle Tracker', href: '/gps-vehicle-tracker' },
    { title: 'Burglar Alarm System', href: '/burglar-alarm-system' }
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-col justify-between gap-2 py-3">
          {/* Logo */}
          <div className="flex justify-between items-center space-x-4">
            <div className="text-2xl font-bold text-blue-900">
              <Link to="/" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/' ? 'text-blue-600 font-medium' : ''}`}>
                <img
                  src="/logo/vels-logo.png"
                  alt="logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>
            <div className="hidden lg:flex gap-6 items-center">
              <img
                src="/logo/25_years_of_excellence_vel_systems-removebg-preview.png"
                alt="25 Years Excellence"
                className="h-7 w-auto object-contain"
              />
              <img
                src="/logo/gem-logo-1-1-300x143.png"
                alt="GEM Logo"
                className="h-7 w-auto object-contain"
              />
              <img
                src="/logo/iso2015-1024x395-1.png"
                alt="ISO 2015"
                className="h-7 w-auto object-contain"
              />
              <div className="flex items-center space-x-4">
                <CartIcon />
                {user ? (
                  <UserMenu />
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between space-x-2">
            <Link to="/shop" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/shop' ? 'text-blue-600 font-medium' : ''}`}>
              Shop
            </Link>
            <Link to="/power-solutions" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/power-solutions' ? 'text-blue-600 font-medium' : ''}`}>
              Power Solutions
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>IT Products & Solutions</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-2 gap-2 p-4">
                  {itProducts.map((product, index) => (
                    <Link key={index} to={product.href} className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      {product.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>Security Solutions</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-b-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-2 gap-2 p-4">
                  {securitySolutions.map((solution, index) => (
                    <Link key={index} to={solution.href} className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                      {solution.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/rental" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/rental' ? 'text-blue-600 font-medium' : ''}`}>
              Rental
            </Link>
            <Link to="/blog" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/blog' ? 'text-blue-600 font-medium' : ''}`}>
              Blog
            </Link>
            <Link to="/about" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/about' ? 'text-blue-600 font-medium' : ''}`}>
              About Us
            </Link>
            <Link to="/services" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/services' ? 'text-blue-600 font-medium' : ''}`}>
              Our Services
            </Link>
            <Link to="/customers" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/customers' ? 'text-blue-600 font-medium' : ''}`}>
              Our Customers
            </Link>
            <Link to="/contact" className={`text-gray-700 hover:text-blue-600 transition-colors ${location.pathname === '/contact' ? 'text-blue-600 font-medium' : ''}`}>
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link to="/shop" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Shop</Link>
              <Link to="/power-solutions"  onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">
                Power Solutions
              </Link>
              <div>
                <button
                  onClick={() => handleDropdownToggle('it')}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>IT Products & Solutions</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === 'it' && (
                  <div className="ml-4 mt-2 space-y-2">
                    {itProducts.map((product, index) => (
                      <Link key={index} to={product.href} onClick={handleMobileLinkClick} className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {product.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleDropdownToggle('security')}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Security Solutions</span>
                  <ChevronDown size={16} />
                </button>
                {activeDropdown === 'security' && (
                  <div className="ml-4 mt-2 space-y-2">
                    {securitySolutions.map((solution, index) => (
                      <Link key={index} to={solution.href} onClick={handleMobileLinkClick} className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/about" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/services" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Our Services</Link>
              <Link to="/customers" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Our Customers</Link>
              <Link to="/rental" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Rental</Link>
              <Link to="/blog" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/about" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/services" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Our Services</Link>
              <Link to="/customers" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Our Customers</Link>
              <Link to="/contact" onClick={handleMobileLinkClick} className="block text-gray-700 hover:text-blue-600 transition-colors">Contact Us</Link>
              {!user && (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
                >
                  Login
                </button>
              )}
              {user && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <CartIcon />
                    <UserMenu />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;