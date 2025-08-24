import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Intercom = React.memo(() => {
  const navigate = useNavigate();

  const intercomSystems = useMemo(() => [
    {
      id: 'crystal-nexa',
      title: 'Crystal NEXA',
      description: 'Crystal NEXA Intercom offers advanced communication solutions with high-quality audio, seamless integration, and user-friendly controls, designed to enhance security and convenience in residential and commercial settings.',
      image: '/intercom/crystal-NEXA.png'
    },
    {
      id: 'matrix',
      title: 'Matrix',
      description: 'The Matrix Intercom features high-quality audio and a sleek, modern design for clear and secure communication. Its advanced technology and seamless integration enhance connectivity and efficiency in both residential and commercial settings.',
      image: '/intercom/matrix.png'
    },
    {
      id: 'panasonic',
      title: 'Panasonic',
      description: 'The Panasonic Intercom delivers high-quality audio and an intuitive interface, providing reliable communication for both residential and commercial settings. Its sleek design and user-friendly features ensure clear and secure interactions.',
      image: '/intercom/panasonic.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'Crystal', image: '/partner/Crystal.png' },
    { name: 'Matrix', image: '/partner/matrix.png' },
    { name: 'Panasonic', image: '/partner/panasonic.png' }
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
            Intercom Systems
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Professional communication solutions for residential and commercial properties
          </p>
        </div>
      </section>

      {/* Intercom Systems */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intercomSystems.map((system) => (
              <div key={system.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={system.image}
                    alt={system.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {system.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {system.description}
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

Intercom.displayName = 'Intercom';

export default Intercom;