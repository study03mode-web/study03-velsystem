import React from 'react';

const TermsAndConditions = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Terms of service and conditions for using our website and services
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-700">
                We are currently preparing our comprehensive Terms and Conditions to ensure 
                clarity and transparency in our business relationship with you. This page 
                will be available soon.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What Will Be Covered:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Website usage terms</li>
                <li>• Product and service conditions</li>
                <li>• Payment terms and conditions</li>
                <li>• Intellectual property rights</li>
                <li>• Limitation of liability</li>
                <li>• Dispute resolution procedures</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                For questions about our terms of service, please contact us at{' '}
                <a href="mailto:sales@velsystems.in" className="text-blue-600 hover:text-blue-700">
                  sales@velsystems.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

TermsAndConditions.displayName = 'TermsAndConditions';

export default TermsAndConditions;