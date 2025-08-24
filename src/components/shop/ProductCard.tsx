import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const handleViewDetails = () => {
    navigate(`/shop/${product.id}`);
  };

  // Get primary image from first variant
  const primaryImage = product.variants[0]?.images?.find(img => img.isPrimary)?.imageUrl || 
                      product.variants[0]?.images?.[0]?.imageUrl || 
                      product.brand.logoUrl;

  // Get price from first variant
  const price = product.variants[0]?.price || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!product.variants[0]) return;
    
    const cartItem = {
      productId: product.id,
      variantId: product.variants[0].id,
      productName: product.name,
      variantSku: product.variants[0].sku,
      price: product.variants[0].price,
      imageUrl: primaryImage,
      brandName: product.brand.name
    };

    addToCart(cartItem, 1);
  };

  const itemInCart = isInCart(product.id, product.variants[0]?.id || '');

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer" onClick={handleViewDetails}>
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={primaryImage} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img 
            src={product.brand.logoUrl} 
            alt={product.brand.name}
            className="w-6 h-6 object-contain mr-2"
          />
          <span className="text-sm text-gray-600">{product.brand.name}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-blue-600">
            ₹{price.toLocaleString()}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={itemInCart}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg font-medium transition-colors duration-300 ${
              itemInCart
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingCart size={16} className="mr-1" />
            {itemInCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;