import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  id: string;
}

const ProductCard = React.memo(({ title, description, image, id }: ProductCardProps) => {
  const navigate = useNavigate();
  const handleShopClick = () => {
    navigate('/shop');
  };
  return (
    <div id={id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
        <button
          onClick={handleShopClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
        >
          Shop
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;