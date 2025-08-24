import React, { useMemo } from 'react';

const Customers = React.memo(() => {
  // ✅ Generate customer image paths dynamically instead of hardcoding all 68
  const customerImages = useMemo(
    () =>
      Array.from({ length: 68 }, (_, i) => {
        const index = i + 1;
        return `/customer/customer-${index}.png`;
      }),
    []
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Valued Customers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Trusted by thousands of businesses and individuals across Tamil Nadu
          </p>
        </div>
      </section>

      {/* Customer Images Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
            {customerImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden transition-shadow duration-300 group flex items-center justify-center"
              >
                <img
                  src={image}
                  alt={`Customer Logo ${index + 1}`}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-lg font-medium text-gray-900">
                Years Experience
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">20,000+</div>
              <div className="text-lg font-medium text-gray-900">
                Happy Customers
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg font-medium text-gray-900">
                Corporate Partners
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-lg font-medium text-gray-900">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

Customers.displayName = "Customers";

export default Customers;