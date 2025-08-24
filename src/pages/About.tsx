import React from 'react';
import { Users, Eye, Target } from 'lucide-react';

const About = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Over two decades of excellence in technology solutions
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2002 by Dr. Rtn. K. Murali Krishnan, Vel Systems is a reputable company registered under the Tamil Nadu Sales Registration Act. With a commitment to excellence and innovation, we have been serving our clients with high-quality solutions for over two decades.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Motto */}
            <div className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                OUR MOTTO
              </h3>
              <p className="text-lg text-gray-700 font-medium">
                Customer Satisfaction is<br />
                <span className="text-blue-600 font-bold">Our Breath</span>
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-green-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                OUR VISION
              </h3>
              <p className="text-lg text-gray-700">
                Providing superior quality products to Customers and providing value for their money
              </p>
            </div>

            {/* Our Team */}
            <div className="bg-orange-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                OUR TEAM
              </h3>
              <p className="text-lg text-gray-700">
                Our team is our strength who are well trained & experienced engineers in providing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-lg font-medium text-gray-900">Years Experience</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">20,000+</div>
              <div className="text-lg font-medium text-gray-900">Happy Customers</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-lg font-medium text-gray-900">Corporate Partners</div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">2002</div>
              <div className="text-lg font-medium text-gray-900">Founded</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

About.displayName = 'About';

export default About;