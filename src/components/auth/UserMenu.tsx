import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown, Package, Star, Settings, LogOut, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAccountInfo } from '../../hooks/useAccount';

const UserMenu = React.memo(() => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch account information
  const { data: accountData } = useAccountInfo();

  const accountInfo = accountData?.data;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getDisplayName = () => {
    if (accountInfo?.firstName && accountInfo?.lastName) {
      return `${accountInfo.firstName} ${accountInfo.lastName}`;
    }
    if (accountInfo?.firstName) {
      return accountInfo.firstName;
    }
    return 'User';
  };
  const getFirstName = () => {
    if (accountInfo?.firstName) {
      return accountInfo.firstName;
    }
    return 'User';
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
      >
        <span className="hidden md:block font-medium">{getFirstName()}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Settings size={18} />
              <span>Profile Settings</span>
            </Link>
            <Link
              to="/profile/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Package size={18} />
              <span>My Orders</span>
            </Link>
            <Link
              to="/profile/reviews"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Star size={18} />
              <span>My Reviews</span>
            </Link>
          </div>

          {/* Account Info */}
          <div className="border-t bg-gray-50 p-4">
            <div className="text-xs text-gray-500 mb-2">Account Details</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="border-t">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;