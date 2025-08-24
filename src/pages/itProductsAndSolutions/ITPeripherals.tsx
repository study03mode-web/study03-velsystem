import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ITPeripherals = React.memo(() => {
  const navigate = useNavigate();

  const peripheralProducts = useMemo(() => [
    {
      id: 'laptop',
      title: 'Laptop',
      description: 'A laptop is a portable personal computer that integrates a screen, keyboard, and processing components into one compact device. It allows users to perform computing tasks and access digital content while on the go.',
      image: '/itPeripherals/laptop.jpg'
    },
    {
      id: 'monitor',
      title: 'Monitor',
      description: 'A monitor is a display device that presents visual output from a computer, enabling interaction with digital content. It serves as the main interface for viewing and managing applications and media.',
      image: '/itPeripherals/monitor.png'
    },
    {
      id: 'mice',
      title: 'Mice',
      description: 'Mice are input devices with various designs and sensors, offering wired or wireless options for precise control and comfort in computing and gaming.',
      image: '/itPeripherals/mice.png'
    },
    {
      id: 'keyboard',
      title: 'Keyboard',
      description: 'Keyboards are input devices with various layouts and switch types, designed for typing and command input, ranging from basic to advanced models with features like backlighting and programmable keys.',
      image: '/itPeripherals/keyboard.jpg'
    },
    {
      id: 'ram',
      title: 'RAM',
      description: 'RAM (Random Access Memory) offers fast, temporary storage for active data and applications, enhancing overall system performance. It allows for quick data access and smooth multitasking.',
      image: '/itPeripherals/RAM.png'
    },
    {
      id: 'motherboard',
      title: 'Motherboard',
      description: 'The motherboard is the central circuit board that connects and allows communication between the CPU, RAM, and other components. It manages data flow and ensures proper functioning of the entire system.',
      image: '/itPeripherals/motherboard.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'Lenovo', image: '/partner/Lenovo.png' },
    { name: 'Acer', image: '/partner/Acer.png' },
    { name: 'Dell', image: '/partner/Dell.png' },
    { name: 'HP', image: '/partner/Hp.png' },
    { name: 'Asus', image: '/partner/Asus.png' }
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
            IT Peripherals
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Essential computer peripherals and components for your setup
          </p>
        </div>
      </section>

      {/* Peripheral Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {peripheralProducts.map((product) => (
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

ITPeripherals.displayName = 'ITPeripherals';

export default ITPeripherals;