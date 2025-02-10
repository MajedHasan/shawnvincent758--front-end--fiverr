import { createSlice } from "@reduxjs/toolkit";

// Load cart from local storage
const loadCart = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("product-cart")) || [];
  }
  return [];
};

// Save cart to local storage
const saveCart = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("product-cart", JSON.stringify(cart));
  }
};

const initialState = {
  cartItems: loadCart(),
  totalQuantity: 0,
  totalPrice: 0,
};

const productCartSlice = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { quantity = 1 } = action.payload;
      const item = state.cartItems.find((i) => i._id === action.payload._id);
      if (item) {
        item.quantity += quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity });
      }
      alert(`${quantity} item(s) added to the cart`);

      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== action.payload
        );
      }
      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i._id === id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }

      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCart(state.cartItems);
      productCartSlice.caseReducers.productCalculateTotals(state);
    },

    productCalculateTotals: (state) => {
      state.totalQuantity = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
  productCalculateTotals,
} = productCartSlice.actions;

export default productCartSlice.reducer;
