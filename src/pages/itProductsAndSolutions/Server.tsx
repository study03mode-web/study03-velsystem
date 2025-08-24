import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Server = React.memo(() => {
  const navigate = useNavigate();

  const serverTypes = useMemo(() => [
    {
      id: 'lenovo-tower-server',
      title: 'Lenovo Tower Server',
      description: 'Lenovo tower servers deliver powerful performance and reliability for small to medium businesses, featuring scalable architecture and enterprise-grade components.',
      image: '/server/tower-server.png'
    },
    {
      id: 'lenovo-rack-server',
      title: 'Lenovo Rack Server',
      description: 'Lenovo rack servers provide high-density computing solutions with optimized space utilization and advanced management capabilities for data centers.',
      image: '/server/packServer.png'
    },
    {
      id: 'dell-rack-server',
      title: 'Dell Rack Server',
      description: 'Dell rack servers offer exceptional performance and efficiency with innovative cooling and power management for demanding enterprise workloads.',
      image: '/server/dellRackServer.png'
    },
    {
      id: 'dell-tower-server',
      title: 'Dell Tower Server',
      description: 'Dell tower servers combine powerful processing capabilities with flexible expansion options, ideal for growing businesses and office environments.',
      image: '/server/dellTowerServer.png'
    },
    {
      id: 'hp-rack-server',
      title: 'HP Rack Server',
      description: 'HP rack servers deliver industry-leading performance with intelligent automation and security features for modern data center requirements.',
      image: '/server/hpRackServer.png'
    },
    {
      id: 'hp-tower-server',
      title: 'HP Tower Server',
      description: 'HP tower servers provide reliable computing power with easy management and maintenance, perfect for small business and branch office deployments.',
      image: '/server/hpTowerServer.png'
    }
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
            Server & Workstation
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Enterprise-grade servers and workstations for demanding business applications
          </p>
        </div>
      </section>

      {/* Server Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serverTypes.map((server) => (
              <div key={server.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={server.image}
                    alt={server.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {server.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {server.description}
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
    </div>
  );
});

Server.displayName = 'Server';

export default Server;