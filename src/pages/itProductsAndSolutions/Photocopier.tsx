import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Photocopier = React.memo(() => {
  const navigate = useNavigate();

  const photocopierTypes = useMemo(() => [
    {
      id: 'analog-photocopiers',
      title: 'Analog Photocopiers',
      description: 'These are the oldest type of photocopiers and work by using a light source to transfer an image onto a photosensitive drum. The drum is then coated with toner, which is transferred to paper and then fused to create a copy.',
      image: '/photocopier/Analog-Potocopies.png'
    },
    {
      id: 'digital-photocopiers',
      title: 'Digital Photocopiers',
      description: 'These use a digital scanner to capture the image and then process it using the software. The image is then printed onto paper using toner or ink.',
      image: '/photocopier/Digital-photocopies.png'
    },
    {
      id: 'multifunctional-photocopiers',
      title: 'Multifunctional Photocopiers',
      description: 'These combine the functions of a photocopier, scanner, printer, and sometimes fax machine into one device.',
      image: '/photocopier/Multifunctional-Photocopier.png'
    },
    {
      id: 'networked-photocopiers',
      title: 'Networked Photocopiers',
      description: 'These are photocopiers that are connected to a network, allowing multiple users to print or copy documents from the same machine.',
      image: '/photocopier/Networked-photocopiers.png'
    },
    {
      id: 'color-photocopiers',
      title: 'Color Photocopiers',
      description: 'These are photocopiers that can produce color copies and are often used for printing marketing materials or other documents that require color.',
      image: '/photocopier/Color-copier.png'
    },
    {
      id: 'portable-photocopiers',
      title: 'Portable Photocopiers',
      description: 'These are small and lightweight photocopiers that can be easily transported and used on the go.',
      image: '/photocopier/potable-copier.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'HP', image: '/partner/Hp.png' },
    { name: 'Canon', image: '/partner/Canon.png' },
    { name: 'Kyocera', image: '/partner/Kyocera.png' },
    { name: 'Konica', image: '/partner/Konica.png' },
    { name: 'Epson', image: '/partner/Epson.png' }
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
            Photocopiers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Complete range of photocopiers for all your document reproduction needs
          </p>
        </div>
      </section>

      {/* Photocopier Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photocopierTypes.map((photocopier) => (
              <div key={photocopier.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={photocopier.image}
                    alt={photocopier.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {photocopier.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {photocopier.description}
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

Photocopier.displayName = 'Photocopier';

export default Photocopier;