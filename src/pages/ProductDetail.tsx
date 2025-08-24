import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Truck, Shield, RefreshCw, Check } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';

const ProductDetail = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItemQuantity, loading: cartLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Use React Query hook
  const { data: productData, isLoading: loading } = useProduct(id || '');
  const product = productData?.data;

  const handleBack = () => {
    navigate('/shop');
  };

  const handleAddToCart = () => {
    if (!product || !currentVariant) return;

    setAddingToCart(true);
    
    const cartItem = {
      productId: product.id,
      variantId: currentVariant.id,
      productName: product.name,
      variantSku: currentVariant.sku,
      price: currentVariant.price,
      imageUrl: currentImage?.imageUrl || product.brand.logoUrl,
      brandName: product.brand.name
    };

    addToCart(cartItem, quantity);
    
    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const currentImages = currentVariant?.images || [];
  const currentImage = currentImages[selectedImageIndex] || currentImages[0];
  const itemInCart = isInCart(product.id, currentVariant?.id || '');
  const cartQuantity = getCartItemQuantity(product.id, currentVariant?.id || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Shop
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={currentImage?.imageUrl || product.brand.logoUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {currentImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {currentImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <img
                src={product.brand.logoUrl}
                alt={product.brand.name}
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-medium text-gray-700">{product.brand.name}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-bold text-blue-600">
              ₹{currentVariant?.price.toLocaleString()}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Variants</h3>
                <div className="space-y-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(index);
                        setSelectedImageIndex(0);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedVariant === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">SKU: {variant.sku}</div>
                          <div className="text-sm text-gray-600">
                            {variant.options.map(opt => `${opt.optionName}: ${opt.optionValue}`).join(', ')}
                          </div>
                        </div>
                        <div className="font-bold text-blue-600">₹{variant.price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center py-2 border-0 focus:ring-0"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                {itemInCart && (
                  <span className="text-sm text-green-600">
                    {cartQuantity} in cart
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart || cartLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-green-600 disabled:opacity-75 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                {cartLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding to Cart...
                  </>
                ) : addingToCart ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck size={16} className="mr-2 text-green-600" />
                  Free Delivery
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield size={16} className="mr-2 text-blue-600" />
                  Warranty Included
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RefreshCw size={16} className="mr-2 text-orange-600" />
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specificationGroups.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="space-y-6">
              {product.specificationGroups.map(group => (
                <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{group.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.specifications.map(spec => (
                      <div key={spec.id} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{spec.attributeName}</span>
                        <span className="text-gray-600">{spec.attributeValue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ProductDetail.displayName = 'ProductDetail';

export default ProductDetail;