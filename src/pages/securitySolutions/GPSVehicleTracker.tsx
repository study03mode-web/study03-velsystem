import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const GPSVehicleTracker = React.memo(() => {
  const navigate = useNavigate();

  const features = useMemo(() => [
    'Enhanced Security',
    'Improved Fleet Management',
    'Increased Efficiency',
    'Real-Time Monitoring',
    'Customizable Alerts'
  ], []);

  const benefits = useMemo(() => [
    'Real-time location tracking',
    'Geo-fencing capabilities',
    'Vehicle diagnostics',
    'Route optimization',
    'Driver behavior monitoring',
    'Comprehensive reporting',
    'Mobile and web platform access',
    'Cost reduction through efficiency'
  ], []);

  const handleShopClick = () => {
    navigate('/shop');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GPS Vehicle Tracker
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Advanced vehicle tracking solutions for enhanced security and fleet management
          </p>
        </div>
      </section>

      {/* GPS Vehicle Tracker Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/GPSVehicleTracker/ais_gps_tracker.png" 
                  alt="AIS GPS Vehicle Tracker"
                  className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                AIS GPS Vehicle Tracker
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
                The AIS GPS vehicle tracker provides real-time location tracking, geo-fencing, and vehicle diagnostics to enhance security and efficiency. It features user-friendly access via mobile and web platforms, making it ideal for personal, fleet, and commercial use.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits:</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Transform Your Fleet Operations
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  Boost your fleet management with ATS GPS Tracker, designed for effective fleet GPS tracking. Gain real-time location insights, monitor driver behavior, and optimize routes for improved efficiency. With features like geofencing and comprehensive reporting, you'll enhance security and reduce costs. Seamlessly integrate with your current systems to maximize performance. Discover how ATS GPS Tracker can transform your fleet operations today.
                </p>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleShopClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                >
                  Get GPS Vehicle Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

GPSVehicleTracker.displayName = 'GPSVehicleTracker';

export default GPSVehicleTracker;