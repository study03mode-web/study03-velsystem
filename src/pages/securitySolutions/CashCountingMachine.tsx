import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const CashCountingMachine = React.memo(() => {
  const navigate = useNavigate();

  const features = useMemo(() => [
    'Fast and accurate currency counting',
    'Ensuring efficiency and reliability in cash handling',
    'Designed for high performance',
    'Reducing manual errors and saving time for businesses',
    'Ideal for banks, retail, and offices'
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
            Cash Counting Machine
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Professional cash handling solutions for accurate and efficient counting
          </p>
        </div>
      </section>

      {/* Cash Counting Machine Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/cashCountingMachine/tvs.png" 
                  alt="TVS Cash Counting Machine"
                  className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                TVS Cash Counting Machine
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                The TVS Cash Counting Machine offers accurate counting, sorting, and verification of cash, enhancing efficiency and security. Designed for high-volume transactions, it ensures reliable performance in businesses and financial institutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features:</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Banking Institutions</li>
                    <li>• Retail Stores</li>
                    <li>• Corporate Offices</li>
                    <li>• Government Offices</li>
                    <li>• Financial Services</li>
                    <li>• Cash-intensive Businesses</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleShopClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                >
                  Get Cash Counting Machine
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

CashCountingMachine.displayName = 'CashCountingMachine';

export default CashCountingMachine;