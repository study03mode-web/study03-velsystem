import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DataStorage = React.memo(() => {
  const navigate = useNavigate();

  const storageTypes = useMemo(() => [
    {
      id: 'hdd-storage',
      title: 'HDD Storage',
      description: 'This type of storage uses magnetic fields to store data on a magnetic medium such as a hard disk drive (HDD) or magnetic tape.',
      image: '/dataStorage/magnetic-Storage.png'
    },
    {
      id: 'solid-state-storage',
      title: 'Solid State Storage',
      description: 'This type of storage uses flash memory technology to store data on solid-state drives (SSDs) and USB flash drives.',
      image: '/dataStorage/ssd.png'
    },
    {
      id: 'cloud-storage',
      title: 'Cloud Storage',
      description: 'This type of storage allows data to be stored and accessed over the internet, typically through a third-party service provider.',
      image: '/dataStorage/cloud-storage.png'
    },
    {
      id: 'nas',
      title: 'Network-attached storage (NAS)',
      description: 'This type of storage is a file-level storage architecture that enables multiple users and client devices to access data via a local area network (LAN).',
      image: '/dataStorage/NAS.png'
    }
  ], []);

  const authorizedPartners = useMemo(() => [
    { name: 'QNAP', image: '/partner/Qnap-Nas.png' },
    { name: 'Western Digital', image: '/partner/Western-Digital.png' },
    { name: 'Synology', image: '/partner/Synology-Nas.png' },
    { name: 'Seagate', image: '/partner/Seagate.png' }
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
            Data Storage Solutions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Comprehensive data storage solutions for all your business needs
          </p>
        </div>
      </section>

      {/* Storage Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storageTypes.map((storage) => (
              <div key={storage.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-[16/9] flex items-center justify-center bg-gray-100">
                  <img
                    src={storage.image}
                    alt={storage.title}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {storage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {storage.description}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

DataStorage.displayName = 'DataStorage';

export default DataStorage;