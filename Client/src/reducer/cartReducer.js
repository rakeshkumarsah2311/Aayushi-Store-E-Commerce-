const cartReducer = (state, action) => {
  // Ensure state.cart is initialized properly
  if (!state.cart) {
    state = {
      ...state,
      cart: [],
    };
  }

  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;

      // Find existing product in cart
      const existingProduct = state.cart.find(
        (curItem) => curItem.id === id + color
      );

      if (existingProduct) {
        // Update existing product's amount
        const updatedCart = state.cart.map((curElem) => {
          if (curElem.id === id + color) {
            let newAmount = curElem.amount + amount;
            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return curElem;
          }
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Add new product to cart
        const cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    // Handle other cases...

    default:
      return state;
  }
};

export default cartReducer;
