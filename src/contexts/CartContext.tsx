import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CartItem, Cart, CartContextType } from '../types/cart';
import { useAuth } from './AuthContext';
import { 
  useServerCart, 
  useAddToServerCart, 
  useUpdateServerCartItem, 
  useRemoveFromServerCart, 
  useClearServerCart,
  useSyncCartToServer,
  ServerCartItem 
} from '../hooks/useCart';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { item: Omit<CartItem, 'id' | 'quantity'>; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'SYNC_FROM_SERVER'; payload: Cart };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.productId === item.productId && cartItem.variantId === item.variantId
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          id: `${item.productId}-${item.variantId}-${Date.now()}`,
          quantity
        };
        newItems = [...state.items, newItem];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        totalItems,
        totalAmount
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        totalItems,
        totalAmount
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: itemId });
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        items: newItems,
        totalItems,
        totalAmount
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0
      };

    case 'LOAD_CART':
      return action.payload;

    case 'SYNC_FROM_SERVER':
      return action.payload;

    default:
      return state;
  }
};

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const { user } = useAuth();
  
  // Server cart hooks
  const { data: serverCartData, refetch: refetchServerCart } = useServerCart(!!user);
  const addToServerCartMutation = useAddToServerCart();
  const updateServerCartMutation = useUpdateServerCartItem();
  const removeFromServerCartMutation = useRemoveFromServerCart();
  const clearServerCartMutation = useClearServerCart();
  const syncCartToServerMutation = useSyncCartToServer();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vel-systems-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Convert server cart to local cart format
  const convertServerCartToLocal = (serverCart: any): Cart => {
    if (!serverCart?.items) {
      return { items: [], totalItems: 0, totalAmount: 0 };
    }

    const items: CartItem[] = serverCart.items.map((item: ServerCartItem) => {
      const primaryImage = item.variant.images?.find(img => img.isPrimary)?.imageUrl || 
                          item.variant.images?.[0]?.imageUrl || 
                          item.product.brand.logoUrl;

      return {
        id: item.id,
        productId: item.product.id,
        variantId: item.variant.id,
        productName: item.product.name,
        variantSku: item.variant.sku,
        price: item.variant.price,
        quantity: item.quantity,
        imageUrl: primaryImage,
        brandName: item.product.brand.name
      };
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return { items, totalItems, totalAmount };
  };

  // Sync local cart to server when user logs in
  useEffect(() => {
    if (user && cart.items.length > 0) {
      const localCartItems = cart.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }));

      syncCartToServerMutation.mutate(localCartItems, {
        onSuccess: () => {
          // Clear local cart after successful sync
          localStorage.removeItem('vel-systems-cart');
          // Refetch server cart to get updated data
          refetchServerCart();
        },
        onError: (error: Error) => {
          console.error('Failed to sync cart to server:', error);
        },
      });
    }
  }, [user]); // Only run when user changes

  // Update local cart when server cart changes
  useEffect(() => {
    if (user && serverCartData?.success && serverCartData.data) {
      const localCart = convertServerCartToLocal(serverCartData.data);
      dispatch({ type: 'SYNC_FROM_SERVER', payload: localCart });
    }
  }, [user, serverCartData]);

  // Save cart to localStorage whenever it changes (only for non-authenticated users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('vel-systems-cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>, quantity: number = 1) => {
    if (user) {
      // Add to server cart
      addToServerCartMutation.mutate({
        variantId: item.variantId,
        quantity
      }, {
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add item to cart');
        },
      });
    } else {
      // Add to local cart
      dispatch({ type: 'ADD_TO_CART', payload: { item, quantity } });
      toast.success('Item added to cart!');
    }
  };

  const removeFromCart = (itemId: string) => {
    if (user) {
      // Remove from server cart
      removeFromServerCartMutation.mutate(itemId, {
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to remove item from cart');
        },
      });
    } else {
      // Remove from local cart
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      toast.success('Item removed from cart!');
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (user) {
      // Update server cart
      updateServerCartMutation.mutate({ itemId, quantity }, {
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to update quantity');
        },
      });
    } else {
      // Update local cart
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    }
  };

  const clearCart = () => {
    if (user) {
      // Clear server cart
      clearServerCartMutation.mutate(undefined, {
        onSuccess: () => {
          toast.success('Cart cleared successfully!');
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to clear cart');
        },
      });
    } else {
      // Clear local cart
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared successfully!');
    }
  };

  const isInCart = (productId: string, variantId: string): boolean => {
    return cart.items.some(item => item.productId === productId && item.variantId === variantId);
  };

  const getCartItemQuantity = (productId: string, variantId: string): number => {
    const item = cart.items.find(item => item.productId === productId && item.variantId === variantId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    loading: addToServerCartMutation.isPending || 
             updateServerCartMutation.isPending || 
             removeFromServerCartMutation.isPending || 
             clearServerCartMutation.isPending ||
             syncCartToServerMutation.isPending,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};