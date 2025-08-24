import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const NetworkHardware = React.memo(() => {
  const navigate = useNavigate();

  const networkProducts = useMemo(() => [
    {
      id: 'routers',
      title: 'Routers',
      description: 'Routers are network devices that connect multiple networks together and direct traffic between them. They can connect to the internet and allow multiple devices to access the internet through a single connection.',
      image: '/networkHardwareSolution/ntwrok-route.png'
    },
    {
      id: 'switches',
      title: 'Switches',
      description: 'Switches are used to connect multiple devices within a network and enable them to communicate with each other. They can provide a faster and more efficient means of communication than hubs.',
      image: '/networkHardwareSolution/network-switches.png'
    },
    {
      id: 'hubs',
      title: 'Hubs',
      description: 'Hubs are devices that connect multiple devices within a network and enable them to communicate with each other. They are less efficient than switches and are generally used in smaller networks.',
      image: '/networkHardwareSolution/network-hub.png'
    },
    {
      id: 'nics',
      title: 'Network Interface Cards (NICs)',
      description: 'NICs are hardware components that connect devices to a network. They provide a physical interface for communication and allow devices to access the network.',
      image: '/networkHardwareSolution/nics.png'
    },
    {
      id: 'cables',
      title: 'Cables',
      description: 'Ethernet cables are used to connect devices within a network. They provide a physical connection between devices and allow for the transfer of data.',
      image: '/networkHardwareSolution/cable.png'
    },
    {
      id: 'modems',
      title: 'Modems',
      description: 'Modems are used to connect a network to the internet. They allow for the transfer of data between the network and the internet through a broadband connection.',
      image: '/networkHardwareSolution/modems.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'D-Link', image: '/partner/D-Link.png' },
    { name: 'Marx', image: '/partner/Marx.png' },
    { name: 'AMP', image: '/partner/AMP.png' },
    { name: 'Mole', image: '/partner/mole.png' },
    { name: 'TP-Link', image: '/partner/tp-link.png' },
    { name: 'CP Plus', image: '/partner/cp-plus.png' },
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
            Network Hardware Solutions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Complete networking infrastructure solutions for your business needs
          </p>
        </div>
      </section>

      {/* Network Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkProducts.map((product) => (
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

NetworkHardware.displayName = 'NetworkHardware';

export default NetworkHardware;