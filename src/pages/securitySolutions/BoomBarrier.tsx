import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const BoomBarrier = React.memo(() => {
  const navigate = useNavigate();

  const boomBarriers = useMemo(() => [
    {
      id: 'bg-bdc-rl-100',
      title: 'BG-BDC-RL-100 - New Noise Less, Non Spring Boom Barrier',
      description: 'The BG-BDC-RL-100 is a noise-less boom barrier featuring a non-spring mechanism for smooth and quiet operation. Its durable design ensures low maintenance and reliable performance in noise-sensitive environments.',
      image: '/boomBarriers/bg-bdc-rl-100-boom-barrier.png'
    },
    {
      id: 'bg-108',
      title: 'Boom Barrier - BG-108',
      description: 'The BG-108 boom barrier offers reliable access control for wide entrances, with an 8-meter arm that efficiently manages high traffic areas. It features smooth, adjustable operation and robust construction for durability.',
      image: '/boomBarriers/bg-108_8m_-removebg-preview.png'
    },
    {
      id: 'hikvision-ds-tmg4bo-ra',
      title: 'Hikvision DS-TMG4BO-RA (4M)',
      description: 'The Hikvision DS-TMG4BO-RA 4M is a 4-megapixel surveillance camera that provides crisp, detailed images. Its advanced technology ensures dependable performance in different lighting conditions.',
      image: '/boomBarriers/hikvision_DS-TMG4BO-RA_4M.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'eSSL', image: '/partner/essl.png' },
    { name: 'Hikvision', image: '/partner/hikvision.png' }
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
            Boom Barrier Systems
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Automated vehicle access control solutions for secure entry management
          </p>
        </div>
      </section>

      {/* Boom Barriers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boomBarriers.map((barrier) => (
              <div key={barrier.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={barrier.image}
                    alt={barrier.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {barrier.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {barrier.description}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md mx-auto">
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

BoomBarrier.displayName = 'BoomBarrier';

export default BoomBarrier;