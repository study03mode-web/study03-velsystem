export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantSku: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brandName: string;
  maxQuantity?: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId: string) => boolean;
  getCartItemQuantity: (productId: string, variantId: string) => number;
}