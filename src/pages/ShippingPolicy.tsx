import React from 'react';

const ShippingPolicy = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Information about our shipping and delivery services
          </p>
        </div>
      </section>

      {/* Shipping Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-700">
                We are currently updating our Shipping Policy to provide you with detailed 
                information about our delivery services, timelines, and charges. This page 
                will be available soon.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What Will Be Included:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Delivery areas and coverage</li>
                <li>• Shipping charges and free delivery thresholds</li>
                <li>• Estimated delivery timelines</li>
                <li>• Installation and setup services</li>
                <li>• Special handling for different product types</li>
                <li>• Tracking and order updates</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                For shipping inquiries, please contact us at{' '}
                <a href="mailto:sales@velsystems.in" className="text-blue-600 hover:text-blue-700">
                  sales@velsystems.in
                </a>{' '}
                or call{' '}
                <a href="tel:+916572263827" className="text-blue-600 hover:text-blue-700">
                  +91 6572263827
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

ShippingPolicy.displayName = 'ShippingPolicy';

export default ShippingPolicy;