import React from 'react';

const PrivacyPolicy = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-700">
                We are currently updating our Privacy Policy to ensure it meets the latest standards 
                and regulations. This page will be available soon with comprehensive information about 
                how we handle your personal data.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Information about data collection practices</li>
                <li>• How we use your personal information</li>
                <li>• Data security measures</li>
                <li>• Your rights regarding personal data</li>
                <li>• Contact information for privacy concerns</li>
              </ul>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                For immediate privacy concerns, please contact us at{' '}
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

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;