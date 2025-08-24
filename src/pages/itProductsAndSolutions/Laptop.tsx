import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Laptop = React.memo(() => {
  const navigate = useNavigate();

  const laptopTypes = useMemo(() => [
    {
      id: 'business-laptops',
      title: 'Business Laptops',
      description: 'These laptops are designed for business use and are typically built for durability, security, and productivity.',
      image: '/laptop/businessLaptops.png'
    },
    {
      id: 'gaming-laptops',
      title: 'Gaming Laptops',
      description: 'These laptops are designed specifically for gaming and feature powerful CPUs, graphics cards, and large amounts of memory and storage.',
      image: '/laptop/gamingLaptops.png'
    },
    {
      id: '2-in-1-laptops',
      title: '2-in-1 Laptops',
      description: 'These are lightweight and slim laptops that are designed for portability and have long battery life.',
      image: '/laptop/2-in-1Laptops.png'
    },
    {
      id: 'chromebooks',
      title: 'Chromebooks',
      description: 'These are laptops that run on Google\'s Chrome OS and are designed for web-based tasks and have minimal storage.',
      image: '/laptop/Chromebooks.png'
    },
    {
      id: 'ultrabooks',
      title: 'Ultrabooks',
      description: 'These are lightweight and slim laptops that are designed for portability and have long battery life.',
      image: '/laptop/Ultrabooks.png'
    },
    {
      id: 'macbooks',
      title: 'MacBooks',
      description: 'These laptops are designed and manufactured by Apple, and run on the macOS operating system.',
      image: '/laptop/MacBooks.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'HP', image: '/partner/Hp.png' },
    { name: 'Dell', image: '/partner/Dell.png' },
    { name: 'Lenovo', image: '/partner/Lenovo.png' },
    { name: 'Acer', image: '/partner/Acer.png' },
    { name: 'Asus', image: '/partner/Asus.png' }
  ], []);

  const otherBrands = useMemo(() => [
    { name: 'Apple', image: '/partner/Apple.png' },
    { name: 'Microsoft Surface', image: '/partner/Microsoft-Surface.png' }
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
            Laptops
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find the perfect laptop for your needs - from business to gaming
          </p>
        </div>
      </section>

      {/* Laptop Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laptopTypes.map((laptop) => (
              <div key={laptop.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={laptop.image}
                    alt={laptop.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {laptop.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {laptop.description}
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
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

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Other Brands
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md mx-auto">
            {otherBrands.map((brand, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <img 
                  src={brand.image} 
                  alt={brand.name}
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

Laptop.displayName = 'Laptop';

export default Laptop;