import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Services = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Comprehensive technology support and maintenance solutions
          </p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* AMC */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ANNUAL MAINTENANCE CONTRACT – COMPREHENSIVE (AMC)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                By analyzing the entire specification/configuration, the amount will be fixed accordingly. This contract valid for one year and we will take the responsibilities of System including spare parts cost. It covers, preventive maintenance service, at least once in a month and also the service as required by the customer during the maintenance period.
              </p>
            </div>

            {/* ASC */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ANNUAL SERVICE CONTRACT – NON COMPREHENSIVE (ASC)
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our service engineer will provide all types of services for all model configuration and the reasonable fixed amount is charged. This contract valid for one year and we will take the responsibilities of System service excluding spare parts cost. It covers, preventive maintenance service and other services, as required by the customer during the maintenance period with reasonable fixed amount.
              </p>
            </div>

            {/* On Call Services */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ON CALL SERVICES
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Well-experienced enthusiastic service engineers to provide optimal service, within working hours, in response to Customer requests.
              </p>
            </div>
          </div>

          {/* Get in Touch Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Get in touch
            </h3>
            <h4 className="text-2xl font-semibold text-blue-600 mb-8">
              Contact Us
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Phone className="text-blue-600 mb-4" size={32} />
                <a href="tel:+919865180104" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  +91 9865180104
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <Mail className="text-blue-600 mb-4" size={32} />
                <a href="mailto:murali@velsystems.in" className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  murali@velsystems.in
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <MapPin className="text-blue-600 mb-4" size={32} />
                <p className="text-lg font-semibold text-gray-900 text-center">
                  NO.7, Varadanar street,<br />
                  Vedhachala Nagar,<br />
                  Chengalpattu-603 001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

Services.displayName = 'Services';

export default Services;