import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Desktop = React.memo(() => {
  const navigate = useNavigate();

  const desktopTypes = useMemo(() => [
    {
      id: 'tower-desktops',
      title: 'Tower Desktops',
      description: 'These are the traditional desktop computers that come in a tower case. They are easy to upgrade and can accommodate multiple hard drives and other components.',
      image: '/desktop/tower-pc.png'
    },
    {
      id: 'workstation',
      title: 'Workstation',
      description: 'These are specialized desktop computers designed for professionals who need to run demanding applications, such as video editing or 3D modeling software.',
      image: '/desktop/workstation.png'
    },
    {
      id: 'all-in-one-desktops',
      title: 'All-in-one Desktops',
      description: 'These computers combine the monitor and the CPU in one unit, which makes them more compact and easier to set up. However, they are not as easy to upgrade as tower desktops.',
      image: '/desktop/allInOnedesktop.png'
    },
    {
      id: 'gaming-desktops',
      title: 'Gaming Desktops',
      description: 'These are high-performance desktop computers designed specifically for gaming. They usually have powerful graphics cards and other components that can handle demanding games.',
      image: '/desktop/gamingDesktop.png'
    },
    {
      id: 'consumer-desktop',
      title: 'Consumer Desktop',
      description: 'Our consumer desktops deliver powerful performance in sleek, user-friendly designs. Perfect for everyday tasks, they offer reliable tech for productivity, entertainment, and beyond.',
      image: '/desktop/consumerDesktop.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'HP', image: '/partner/Hp.png' },
    { name: 'Lenovo', image: '/partner/Lenovo.png' },
    { name: 'Dell', image: '/partner/Dell.png' },
    { name: 'Acer', image: '/partner/Acer.png' },
    { name: 'Asus', image: '/partner/Asus.png' },
    { name: 'RDP', image: '/partner/rdp.png' }
  ], []);

  const authorizedBrands = useMemo(() => [
    { name: 'Intel NUC', image: '/partner/Intel-Nuc.png' },
    { name: 'AMD', image: '/partner/Amd.png' },
    { name: 'Assembled PC', image: '/partner/Assembelled-PC.png' }
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
            Desktop Computers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find the perfect desktop solution for your needs - from gaming to professional workstations
          </p>
        </div>
      </section>

      {/* Desktop Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {desktopTypes.map((desktop) => (
              <div key={desktop.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={desktop.image}
                    alt={desktop.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {desktop.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {desktop.description}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
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
              Authorized Brands Partner
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {authorizedBrands.map((brand, index) => (
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

Desktop.displayName = 'Desktop';

export default Desktop;