import React, { useMemo } from 'react';
import Slideshow from '../components/Slideshow';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';
import ClientCarousel from '../components/ClientCarousel';

const Home = React.memo(() => {
  const itProducts = useMemo(() => [
    {
      id: 'desktop',
      title: 'Desktop',
      description: 'Reliable Computer Sales & Service!',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'laptop',
      title: 'Laptop',
      description: 'Fast, Reliable best Laptop Sales!',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'printer',
      title: 'Printer',
      description: 'Economical solution for controlling your printing and copying budget!',
      image: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'projector',
      title: 'Projector',
      description: 'A projector is an optical device that projects an image onto a surface!',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'network',
      title: 'NETWORKING',
      description: 'Industrial Network Solutions!',
      image: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'firewall',
      title: 'FIREWALL',
      description: 'Professional Protection made simple for your networks',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'photocopier',
      title: 'PHOTOCOPIER',
      description: 'bulk printing and copying can be done',
      image: 'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'server',
      title: 'SERVER & WORKSTATION',
      description: 'Want more powerful and faster performance servers we can deliver them.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ups',
      title: 'Online & Offline UPS',
      description: 'Simplify network operations while keeping everything secure!',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'storage',
      title: 'Data Storage',
      description: 'Fast, Reliable best Data Storage Sales & Service!',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'recovery',
      title: 'Data Recovery',
      description: 'We provide seamless data recovery services!',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'wifi',
      title: 'WiFi ACCESS POINT',
      description: 'Simplify network operations while keeping everything secure',
      image: 'https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'software',
      title: 'Software',
      description: 'the working environment along with protecting a company\'s valuable data!',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'mobile-accessories',
      title: 'MOBILE ACCESSORIES',
      description: 'Discover top-quality mobile accessories that enhance your devices functionality and styles.',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'peripherals',
      title: 'IT PERIPHERALS',
      description: 'Explore high-performance peripherals that expand and enhance your devices capabilities.',
      image: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ], []);

  const securityProducts = useMemo(() => [
    {
      id: 'cctv',
      title: 'CCTV',
      description: 'Professional Protection made simple!',
      image: 'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'door-access',
      title: 'Door Access Control',
      description: 'It refers to systems and technologies used to manage and monitor entry to physical spaces.',
      image: 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'biometric',
      title: 'Biometric System',
      description: 'Enabling to track in and out of the Employees.',
      image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'intercom',
      title: 'Intercom',
      description: 'Its facilitate clear, real-time communication between different locations or individuals within a building.',
      image: 'https://images.pexels.com/photos/6913345/pexels-photo-6913345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'boom-barrier',
      title: 'Boom Barrier',
      description: 'Its are automated gates used to control vehicle access by raising and lowering a horizontal arm.',
      image: 'https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'solar',
      title: 'Solar',
      description: 'The house is equipped with solar panels to generate electricity.',
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'metal-detector',
      title: 'Metal Detector & Signal Jammer',
      description: 'metal detectors locate metal objects in various environment, while signal jammers block with wireless communications.',
      image: 'https://images.pexels.com/photos/5691456/pexels-photo-5691456.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'video-door-phone',
      title: 'VIDEO DOOR PHONE',
      description: 'An intercom system is a two-way communication electronic device!',
      image: 'https://images.pexels.com/photos/6913345/pexels-photo-6913345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'cash-counter',
      title: 'Cash Counting Machine',
      description: 'Its accurately and efficiency count and sort banknotes to streamline cash handling processes.',
      image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'fire-alarms',
      title: 'Fire Alarms',
      description: 'systems designed to detect and alert occupants of smoke, fire or other emergencies to ensure timely evacuation and safety.',
      image: 'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'safety-lockers',
      title: 'SAFETY LOCKERS',
      description: 'Its provide secure storage for valuable and important documents to protect them from theft or damage.',
      image: 'https://images.pexels.com/photos/6913345/pexels-photo-6913345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'gps-tracker',
      title: 'GPS VEHICLE TRACKER',
      description: 'Simplify network operations while keeping everything secure!',
      image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'burglar-alarm',
      title: 'Burglar Alarm System',
      description: 'It\'s a system that detects any unauthorized entry or motion.',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ], []);

  return (
    <div>
      <Slideshow />

      {/* IT Products & Solutions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              IT PRODUCTS & SOLUTIONS
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Security Solutions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SECURITY SOLUTIONS
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </section>
      
      <ClientCarousel />

      {/* Contact Form Section */}
      {/* <ContactForm /> */}
    </div>
  );
});

Home.displayName = 'Home';

export default Home;