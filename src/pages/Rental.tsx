import React from 'react';
import ProductCard from '../components/ProductCard';
import rentalProducts from '../data/rentalProductsData';

const Rental = React.memo(() => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            We Are Here To Rent Your Favourite Products Today!
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Vel Systems offers affordable rentals for laptops, desktops,
            monitors, TVs, projectors, and printers. Our flexible rental terms
            ensure access to high-quality equipment for events, projects, or
            personal use without the burden of ownership. We prioritize seamless
            experiences with reliable customer support and maintenance services.
            Enjoy hassle-free rental solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Rental Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProducts.map((product) => (
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
    </div>
  );
});

Rental.displayName = 'Rental';

export default Rental;