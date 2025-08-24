import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CCTV = React.memo(() => {
  const navigate = useNavigate();

  const cctvTypes = useMemo(() => [
    {
      id: 'dome-cameras',
      title: 'Dome Cameras',
      description: 'Dome cameras, housed in sleek, dome-shaped enclosures, are typically ideal for indoor settings. Easily adjustable, they can effortlessly cover a wide area. Plus, their clever design makes it tricky for anyone to pinpoint the exact direction they\'re watching.',
      image: '/cctv/DOME.png'
    },
    {
      id: 'bullet-cameras',
      title: 'Bullet Cameras',
      description: 'Bullet cameras, built for outdoor durability, deliver sharp, high-definition surveillance. They provide clear, detailed footage with dependable performance, making them perfect for boosting security in any setting.',
      image: '/cctv/Bullet-cameras.png'
    },
    {
      id: 'ptz-cameras',
      title: 'PTZ Cameras',
      description: 'PTZ cameras, short for pan, tilt, and zoom, offer full remote control. They can easily move in different directions and zoom in on specific areas or objects, providing flexible and precise surveillance.',
      image: '/cctv/PTZ.png'
    },
    {
      id: 'ip-cameras',
      title: 'IP Cameras',
      description: 'IP cameras provide high-definition surveillance with easy integration and remote access. Enjoy advanced monitoring, real-time alerts, and hassle-free installation—perfect for efficient property management.',
      image: '/cctv/IP-Camera.png'
    },
    {
      id: 'thermal-cameras',
      title: 'Thermal Cameras',
      description: 'Thermal cameras detect movement through heat, making them perfect for low-light or pitch-dark environments, especially outdoors.',
      image: '/cctv/THERMAL-CAMERA.png'
    },
    {
      id: 'wireless-cameras',
      title: 'Wireless Cameras',
      description: 'Wi-Fi cameras connect seamlessly to a network and can be accessed remotely through a smartphone or computer, offering flexible monitoring.',
      image: '/cctv/WIRELESS-CAMERA.png'
    },
    {
      id: 'dvr-nvr-systems',
      title: 'DVR/NVR Systems',
      description: 'These systems feature a DVR or NVR to record and store footage from multiple cameras, often with motion detection and remote access for added convenience.',
      image: '/cctv/dvr-nvr.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'CP Plus', image: '/partner/cp-plus.png' },
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
            CCTV Camera Systems
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Professional surveillance solutions for complete security coverage
          </p>
        </div>
      </section>

      {/* CCTV Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cctvTypes.map((cctv) => (
              <div key={cctv.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={cctv.image}
                    alt={cctv.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {cctv.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {cctv.description}
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

CCTV.displayName = 'CCTV';

export default CCTV;