import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Package, Star, Settings, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProfileSettings from './profile/ProfileSettings';
import Orders from './profile/Orders';
import Reviews from './profile/Reviews';
import Addresses from './profile/Addresses';

const Profile = React.memo(() => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/profile', label: 'Profile Settings', icon: Settings, exact: true },
    { path: '/profile/orders', label: 'My Orders', icon: Package },
    { path: '/profile/reviews', label: 'My Reviews', icon: Star },
    { path: '/profile/addresses', label: 'My Addresses', icon: MapPin },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gradient-to-r bg-blue-600 text-white">
                <h3 className="font-semibold">Account Menu</h3>
              </div>
              <nav className="space-y-1 p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact 
                    ? location.pathname === item.path
                    : location.pathname.startsWith(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="xl:col-span-3">
            <Routes>
              <Route path="/" element={<ProfileSettings />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/addresses" element={<Addresses />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = 'Profile';

export default Profile;