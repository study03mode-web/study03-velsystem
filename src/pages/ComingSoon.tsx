import React from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = React.memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center">
      <div className="container mx-auto py-6 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="mb-8">
            <Clock size={80} className="mx-auto mb-6 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Coming Soon
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              We're working hard to bring you something amazing. This page will be available soon!
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What to expect:</h2>
            <ul className="text-left space-y-2 text-blue-100">
              <li>• Comprehensive product information</li>
              <li>• Detailed specifications and features</li>
              <li>• Easy ordering and inquiry system</li>
              <li>• Expert support and guidance</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg text-blue-200">
              In the meantime, feel free to explore our other pages or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;