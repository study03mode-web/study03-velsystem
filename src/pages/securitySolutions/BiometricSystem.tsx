import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const BiometricSystem = React.memo(() => {
  const navigate = useNavigate();

  const biometricSystems = useMemo(() => [
    {
      id: 'essl',
      title: 'eSSL',
      description: 'An ESSL biometric system captures and processes physical traits into digital data for secure verification or identification. It features strong security, integration capabilities, and performance monitoring.',
      image: '/biometricSystem/essl.png'
    },
    {
      id: 'hikvision',
      title: 'Hikvision',
      description: 'A Hikvision biometric system captures and processes biometric data for secure verification and identification. It includes a user interface, robust security, and integration capabilities with other systems.',
      image: '/biometricSystem/hikvision.png'
    },
    {
      id: 'matrix',
      title: 'Matrix',
      description: 'A Matrix biometric system captures and processes biometric data for secure verification, stores it in a secure database, and features a user interface, strong security measures, and integration with other systems.',
      image: '/biometricSystem/matrix.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'eSSL', image: '/partner/essl.png' },
    { name: 'Hikvision', image: '/partner/hikvision.png' },
    { name: 'Matrix', image: '/partner/matrix.png' }
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
            Biometric System
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Advanced biometric solutions for secure identification and access control
          </p>
        </div>
      </section>

      {/* Biometric Systems */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biometricSystems.map((system) => (
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

BiometricSystem.displayName = 'BiometricSystem';

export default BiometricSystem;