import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const WiFiAccessPoint = React.memo(() => {
  const navigate = useNavigate();

  const authorizedPartners = useMemo(() => [
    { name: 'D-Link', image: '/partner/D-Link.png' },
    { name: 'TP-Link', image: '/partner/tp-link.png' },
    { name: 'Aruba', image: '/partner/Aruba.png' },
    { name: 'Ubiquiti', image: '/partner/Ubiquity.png' },
    { name: 'Cisco', image: '/partner/cisco.png' }
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
            WiFi Access Point
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Professional wireless networking solutions for seamless connectivity
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Enterprise WiFi Solutions
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Simplify network operations while keeping everything secure. Our WiFi access points provide reliable, high-performance wireless connectivity for businesses of all sizes. From small offices to large enterprises, we deliver scalable solutions that ensure seamless internet access across your entire facility.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• High-speed wireless connectivity</li>
                  <li>• Enterprise-grade security</li>
                  <li>• Scalable network architecture</li>
                  <li>• Centralized management</li>
                  <li>• Guest network support</li>
                  <li>• Load balancing capabilities</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Improved productivity</li>
                  <li>• Reduced network downtime</li>
                  <li>• Enhanced security protocols</li>
                  <li>• Easy installation & setup</li>
                  <li>• 24/7 technical support</li>
                  <li>• Cost-effective solutions</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={handleShopClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
            >
              Get WiFi Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Authorized Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Authorized Partners
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {authorizedPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="max-h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

WiFiAccessPoint.displayName = 'WiFiAccessPoint';

export default WiFiAccessPoint;