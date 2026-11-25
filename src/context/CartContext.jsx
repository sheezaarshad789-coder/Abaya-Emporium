import { useReducer, useEffect, useState } from 'react';
import { CartContext } from './CartContextBase';

const initialState = () => {
  localStorage.removeItem('abaya_emporium_cart');
  return [];
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key =
        action.payload.variantId ||
        `${action.payload.id}-${action.payload.selectedSize}-${action.payload.selectedColor || ''}`;
      const existing = state.find((item) => item.key === key);
      const quantity = Number(action.payload.quantity) || 1;
      if (existing) {
        return state.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...state, { ...action.payload, key, quantity }];
    }
    case 'UPDATE_QTY':
      return state
        .map((item) =>
          item.key === action.payload.key
            ? { ...item, quantity: Math.max(0, item.quantity + action.payload.delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'REMOVE_ITEM':
      return state.filter((item) => item.key !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], initialState);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('abaya_emporium_cart', JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 0),
    0
  );

  const addToCart = (item, openDrawer = true) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    setDrawerOpen(openDrawer);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        drawerOpen,
        setDrawerOpen,
        addToCart,
        updateQty: (key, delta) => dispatch({ type: 'UPDATE_QTY', payload: { key, delta } }),
        removeItem: (key) => dispatch({ type: 'REMOVE_ITEM', payload: key }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}