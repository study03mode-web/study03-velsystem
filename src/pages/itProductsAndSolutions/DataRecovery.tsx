import React from 'react';
import { useNavigate } from 'react-router-dom';

const DataRecovery = React.memo(() => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Data Recovery Services
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Professional data recovery solutions for all your critical data needs
          </p>
        </div>
      </section>

      {/* Data Recovery Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Data Recovery"
                  className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Professional Data Recovery Solutions
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Data recovery retrieves lost or damaged files from storage devices using advanced technology. It involves assessing damage, extracting and repairing data, and securely delivering the restored files. This service is crucial for minimizing downtime and ensuring data integrity.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                It is essential for both personal and business needs, minimizing downtime and ensuring data integrity. Data recovery also offers expert guidance on backup solutions to prevent future data loss.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Services Include:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Hard Drive Recovery</li>
                    <li>• SSD Data Recovery</li>
                    <li>• RAID Recovery</li>
                    <li>• USB Flash Drive Recovery</li>
                    <li>• Memory Card Recovery</li>
                    <li>• Database Recovery</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Advanced Recovery Technology</li>
                    <li>• Experienced Technicians</li>
                    <li>• Secure & Confidential Process</li>
                    <li>• No Data, No Charge Policy</li>
                    <li>• Quick Turnaround Time</li>
                    <li>• Free Evaluation</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleShopClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                >
                  Get Data Recovery Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

DataRecovery.displayName = 'DataRecovery';

export default DataRecovery;