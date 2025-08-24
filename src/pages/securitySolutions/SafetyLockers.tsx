import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SafetyLockers = React.memo(() => {
  const navigate = useNavigate();

  const safetyLockers = useMemo(() => [
    {
      id: 'godrej-nx-pro-25l',
      title: 'Godrej NX Pro 25L',
      description: 'The Godrej NX Pro 25L is a home safe with a 25-liter capacity, featuring a digital keypad and motorized locking bolts for secure storage of valuables. Its solid steel construction ensures durability and protection for your items.',
      image: '/safetyLocker/nx_pro_25L_Ebony_digital.png'
    },
    {
      id: 'godrej-31-defender-prime-cl-c',
      title: 'Godrej 31 Defender Prime CL-C',
      description: 'The Godrej 31 Defender Prime CL-C is a high-security safe featuring advanced locking mechanisms and a fire-resistant design. With a 31-liter capacity, it provides robust protection for valuables in both home and business settings.',
      image: '/safetyLocker/godrej_31_defender_prime_cl-c.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'Godrej', image: '/partner/godrej.png' }
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
            Safety Lockers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Secure storage solutions for protecting your valuable items and documents
          </p>
        </div>
      </section>

      {/* Safety Lockers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {safetyLockers.map((locker) => (
              <div key={locker.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={locker.image}
                    alt={locker.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {locker.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {locker.description}
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
          
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
              <img 
                src={authorizedPartners[0].image} 
                alt={authorizedPartners[0].name}
                className="max-h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

SafetyLockers.displayName = 'SafetyLockers';

export default SafetyLockers;