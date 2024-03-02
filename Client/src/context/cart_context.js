import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

// Create a CartContext
const CartContext = createContext();

// Function to get local cart data from localStorage
const getLocalCartData = () => {
  let localCartData = localStorage.getItem("AayushiCart");
  if (!localCartData || localCartData === "[]") {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

// Initial state for the cart
const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50000,
};

// CartProvider component
const CartProvider = ({ children }) => {
  // Use reducer to manage cart state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to add item to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // Function to decrement item quantity
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  // Function to increment item quantity
  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // Function to clear the entire cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Update local storage when cart changes
  useEffect(() => {
    localStorage.setItem("AayushiCart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Provide state and functions to components
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
