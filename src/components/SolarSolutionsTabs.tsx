import React, { useState } from 'react';

interface SolarSolution {
  id: string;
  title: string;
  description: string;
  image: string;
}

const SolarSolutionsTabs = React.memo(() => {
  const [activeTab, setActiveTab] = useState('residential');

  const solutions: SolarSolution[] = [
    {
      id: 'residential',
      title: 'Residential Solar',
      description: 'Complete solar solutions for homes with government subsidies and easy financing options.',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'commercial',
      title: 'Commercial Solar',
      description: 'Scalable solar systems for businesses to reduce operational costs and carbon footprint.',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'industrial',
      title: 'Industrial Solar',
      description: 'High-capacity solar installations for manufacturing and industrial facilities.',
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'plant',
      title: 'Solar Plant',
      description: 'Large-scale solar power plants for utility-grade electricity generation.',
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'floating',
      title: 'Floating Solar',
      description: 'Innovative floating solar systems for water bodies and reservoirs.',
      image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const activeSolution = solutions.find(solution => solution.id === activeTab) || solutions[0];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Customized Solutions
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
              <div className="flex space-x-1 min-w-max mx-auto lg:mx-0">
                {solutions.map((solution) => (
                  <button
                    key={solution.id}
                    onClick={() => setActiveTab(solution.id)}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                      activeTab === solution.id
                        ? 'text-blue-600 border-blue-600 bg-blue-50'
                        : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300'
                    }`}
                  >
                    {solution.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative overflow-hidden">
            <div
              key={activeSolution.id}
              className="transform transition-all duration-500 ease-in-out"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={activeSolution.image}
                      alt={activeSolution.title}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="transform transition-all duration-500 delay-100">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                        {activeSolution.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {activeSolution.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                          Learn More
                        </button>
                        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTab === solution.id
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

SolarSolutionsTabs.displayName = 'SolarSolutionsTabs';

export default SolarSolutionsTabs;