import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = React.memo(() => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/', { state: { showAuth: true } });
      return;
    }
    // TODO: Implement checkout functionality
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleContinueShopping}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cart.items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors transform hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Cart Items ({cart.totalItems})
                    </h2>
                    <button
                      onClick={clearCart}
                      disabled={loading}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Clearing...' : 'Clear All'}
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {item.productName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-1">{item.brandName}</p>
                              <p className="text-xs text-gray-500">SKU: {item.variantSku}</p>
                              <div className="mt-2">
                                <span className="text-xl font-bold text-blue-600">
                                  ₹{item.price.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">per item</span>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              disabled={loading}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={loading}
                                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 rounded-l-lg"
                                >
                                  <Minus size={16} />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value) || 1;
                                    handleQuantityChange(item.id, newQuantity);
                                  }}
                                  disabled={loading}
                                  className="w-16 text-center py-2 border-0 focus:ring-0 disabled:opacity-50"
                                />
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  disabled={loading}
                                  className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 rounded-r-lg"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.quantity} × ₹{item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                </div>

                <div className="p-6 space-y-4">
                  {/* Summary Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.totalItems} items)</span>
                      <span>₹{cart.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">₹{cart.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
                    >
                      <CreditCard size={20} className="mr-2" />
                      {!user ? 'Login to Checkout' : 'Proceed to Checkout'}
                    </button>
                    
                    <button
                      onClick={handleContinueShopping}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Free delivery on all orders</li>
                  <li>• Same day delivery available</li>
                  <li>• Professional installation included</li>
                  <li>• 30-day return policy</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart;