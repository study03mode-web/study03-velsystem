import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileAccessories = React.memo(() => {
  const navigate = useNavigate();

  const accessories = useMemo(() => [
    {
      id: 'powerbank',
      title: 'Powerbank',
      description: 'Stay connected and powered up with our high-capacity power bank. It offers fast, reliable charging for multiple devices on the go. Sleek and portable, it ensures you\'re always connected.',
      image: '/mobileAccessories/powerbank.png'
    },
    {
      id: 'pendrive',
      title: 'Pendrive',
      description: 'Simplify your digital life with our high-performance pen drive. It offers extensive storage and rapid transfer rates in a compact, user-friendly design. Perfect for everyday use or critical file backups, it\'s a reliable solution for all your data needs.',
      image: '/mobileAccessories/pendrive.png'
    },
    {
      id: 'usb-cables',
      title: 'USB Cables',
      description: 'Experience fast, reliable data transfer with our high-quality USB cables. Designed for durability and compatibility, they connect your devices seamlessly for charging and syncing. Perfect for everyday use and travel.',
      image: '/mobileAccessories/usb_cables.png'
    },
    {
      id: 'headphone',
      title: 'Headphone',
      description: 'Experience unparalleled sound quality with our premium headphones, designed for crisp highs and deep, immersive bass. Enjoy all-day comfort with plush ear cushions and a lightweight, adjustable headband. Perfect for music lovers and professionals alike, these headphones provide noise isolation and a sleek, modern look.',
      image: '/mobileAccessories/headphone.png'
    },
    {
      id: 'data-cable',
      title: 'Data Cable',
      description: 'Portronics data cables offer reliable and efficient connectivity solutions for various devices. They are designed for durability and high-speed data transfer, ideal for charging and syncing smartphones, tablets and other gadgets.',
      image: '/mobileAccessories/dataCable.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'Lenovo', image: '/partner/Lenovo.png' },
    { name: 'HP', image: '/partner/Hp.png' },
    { name: 'Fingers', image: '/partner/fingers-printer.png' },
    { name: 'Zebion', image: '/partner/zebion.png' }
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
            Mobile Accessories
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Essential accessories to enhance your mobile experience
          </p>
        </div>
      </section>

      {/* Mobile Accessories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((accessory) => (
              <div key={accessory.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={accessory.image}
                    alt={accessory.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {accessory.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {accessory.description}
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

MobileAccessories.displayName = 'MobileAccessories';

export default MobileAccessories;