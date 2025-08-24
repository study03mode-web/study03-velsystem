import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Projector = React.memo(() => {
  const navigate = useNavigate();

  const projectorBrands = useMemo(() => [
    { name: 'Sony', image: '/partner/Sony.png' },
    { name: 'Zebronics', image: '/partner/Zebronics.png' },
    { name: 'Epson', image: '/partner/Epson.png' },
    { name: 'BenQ', image: '/partner/Benq.png' },
    { name: 'Acer', image: '/partner/Acer.png' }
  ], []);

  const projectorAccessories = useMemo(() => [
    {
      id: 'presenter',
      title: 'PRESENTER',
      image: '/projector/presenter.png'
    },
    {
      id: 'screen',
      title: 'SCREEN',
      image: '/projector/screen.png'
    },
    {
      id: 'hdmi-to-vga',
      title: 'HDMI TO VGA',
      image: '/projector/hdmiToVga.png'
    },
    {
      id: 'stand',
      title: 'STAND',
      image: '/projector/stand.png'
    },
    {
      id: 'wall-mount',
      title: 'WALL MOUNT',
      image: '/projector/wallMount.png'
    }
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
            Projectors
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            High-quality projectors and accessories for presentations and entertainment
          </p>
        </div>
      </section>

      {/* Brands We Deal With */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Brands We Deal With
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {projectorBrands.map((brand, index) => (
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

      {/* Projector Accessories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projector Accessories
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {projectorAccessories.map((accessory) => (
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-center">
                    {accessory.title}
                  </h3>
                  <button 
                    onClick={handleShopClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                  >
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

Projector.displayName = 'Projector';

export default Projector;