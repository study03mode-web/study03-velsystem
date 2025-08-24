import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  stats?: {
    number: string;
    label: string;
  };
}

const slides: Slide[] = [
  {
    title: "25+ YEARS OF EXPERIENCE",
    subtitle: "Focus on Your Business",
    description: "Far, far away, beyond the whispering word mountains and far from the lands of Vokalia and Consonantia, there lie the silent blind texts. Long forgotten, they linger in Bookmarksgrove a quiet haven nestled at the fading edge of the vast and dreaming Semantics Ocean.",
  },
  {
    title: "25+ YEARS OF EXPERIENCE",
    subtitle: "Customers",
    description: "20,000 customers and 500+ corporate partners choose VEL Systems because results matter.",
    stats: {
      number: "20000+",
      label: "Customers"
    }
  },
  {
    title: "25+ YEARS OF EXPERIENCE",
    subtitle: "Customer Satisfaction is our Breath",
    description: "Our job doesn't end when you buy it begins. With VEL SYSTEMS, you get support that stays, long after the sale."
  },
  {
    title: "25+ YEARS OF EXPERIENCE",
    subtitle: "Solar Expertise Our Customized Solutions",
    description: "We provide end-to-end solar energy solutions that are intelligently tailored to the specific needs of homeowners, business owners, and industrial operators. Our systems are designed to be clean, efficient, and scalable empowering you with future ready energy that delivers long term value."
  }
];

const Slideshow = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, []);

  // const prevSlide = useCallback(() => {
  //   setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  // }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 2000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Slides */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="transform transition-all duration-700 ease-in-out">
              <h3 className="text-sm md:text-base font-medium mb-2 text-blue-200">
                {slides[currentSlide].title}
              </h3>
              <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
                {slides[currentSlide].subtitle}
              </h1>
              {slides[currentSlide].stats && (
                <div className="mb-6">
                  <div className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2">
                    {slides[currentSlide].stats.number}
                  </div>
                  <div className="text-xl md:text-2xl font-medium">
                    {slides[currentSlide].stats.label}
                  </div>
                </div>
              )}
              <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {slides[currentSlide].description}
              </p>
              {slides[currentSlide].buttonText && (
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105">
                  {slides[currentSlide].buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button> */}

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
});

Slideshow.displayName = 'Slideshow';

export default Slideshow;