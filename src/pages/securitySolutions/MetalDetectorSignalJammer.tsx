import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MetalDetectorSignalJammer = React.memo(() => {
  const navigate = useNavigate();

  const metalDetectors = useMemo(() => [
    {
      id: 'essl-d1010s',
      title: 'eSSL D1010S',
      description: 'The eSSL D1010S is a precise metal detector with adjustable sensitivity and ergonomic design for comfortable use. It features LED indicators for clear feedback and is ideal for reliable security screening in various environments.',
      image: '/metalDetector/metal_detector_essl_D1010S.png'
    },
    {
      id: 'hikvision-isd-smg1118l',
      title: 'Hikvision ISD-SMG1118L',
      description: 'The Hikvision ISD-SMG1118L is a high-performance handheld metal detector with adjustable sensitivity, ergonomic design, and LED indicators, making it ideal for precise and reliable security screening in various environments.',
      image: '/metalDetector/hikvision_metal_detector.png'
    },
    {
      id: 'essl-d100s',
      title: 'eSSL D100S',
      description: 'The eSSL D100S is a high-sensitivity metal detector with adjustable settings, an ergonomic handle, and LED indicators, designed for accurate and comfortable use in various security applications.',
      image: '/metalDetector/hand_metal_detector_D100S.png'
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
            Metal Detector & Signal Jammer
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Advanced security screening and signal management solutions
          </p>
        </div>
      </section>

      {/* Metal Detectors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Metal Detectors
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metalDetectors.map((detector) => (
              <div key={detector.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={detector.image}
                    alt={detector.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {detector.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {detector.description}
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
      <section className="py-16 bg-white">
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

MetalDetectorSignalJammer.displayName = 'MetalDetectorSignalJammer';

export default MetalDetectorSignalJammer;