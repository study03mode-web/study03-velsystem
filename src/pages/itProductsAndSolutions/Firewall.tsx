import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Firewall = React.memo(() => {
  const navigate = useNavigate();

  const firewallProducts = useMemo(() => [
    {
      id: 'sonicwall',
      title: 'SonicWall',
      description: 'SonicWall Firewall provides robust network security with features like intrusion prevention, malware protection, and secure remote access. It\'s designed to safeguard businesses against cyber threats while enhancing network performance and reliability.',
      image: '/firewall/sonic_firewall.png'
    },
    {
      id: 'sophos',
      title: 'Sophos Firewall',
      description: 'Sophos firewalls offer advanced threat protection, centralized management, and detailed reporting, ideal for comprehensive security needs.',
      image: '/firewall/sophos-firewall.png'
    },
    {
      id: 'cisco',
      title: 'Cisco Firewall',
      description: 'Cisco Firewall provides robust network security with advanced threat defense, high performance, and scalable solutions, offering features like deep packet inspection, VPN support, and comprehensive management through Cisco\'s security ecosystem.',
      image: '/firewall/cisco.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'SonicWall', image: '/partner/sonicwall.png' },
    { name: 'Sophos', image: '/partner/sophos.png' },
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
            Firewall Solutions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Advanced network security solutions to protect your business
          </p>
        </div>
      </section>

      {/* Firewall Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {firewallProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <button
                    onClick={handleShopClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                  >
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorized Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Authorized Sales & Service Partner
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

Firewall.displayName = 'Firewall';

export default Firewall;