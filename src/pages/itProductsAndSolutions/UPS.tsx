import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const UPS = React.memo(() => {
  const navigate = useNavigate();

  const upsProducts = useMemo(() => [
    {
      id: 'apc-ups',
      title: 'APC',
      description: 'APC UPS provides dependable backup power and superior surge protection. Keep your critical devices running smoothly during outages and power disruptions.',
      image: '/ups/APC.png'
    },
    {
      id: 'fingers-ups',
      title: 'FINGERS',
      description: 'Stay protected with Fingers UPS, delivering dependable backup power and surge protection. Keep your devices running smoothly and safely during outages and power surges.',
      image: '/ups/fingers.png'
    },
    {
      id: 'luminous-ups',
      title: 'LUMINOUS',
      description: 'Luminous UPS ensures continuous power with reliable backup and robust surge protection. Safeguard your electronics and maintain seamless operation during outages and fluctuations.',
      image: '/ups/luminous.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'APC', image: '/partner/APC.png' },
    { name: 'Fingers', image: '/partner/fingers-printer.png' },
    { name: 'Luminous', image: '/partner/luminous.png' }
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
            Online & Offline UPS
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Reliable power backup solutions for uninterrupted operations
          </p>
        </div>
      </section>

      {/* UPS Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upsProducts.map((product) => (
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

UPS.displayName = 'UPS';

export default UPS;