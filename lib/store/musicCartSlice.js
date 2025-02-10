import { createSlice } from "@reduxjs/toolkit";

// Load cart from local storage
const loadCart = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("music-cart")) || [];
  }
  return [];
};

// Save cart to local storage
const saveCart = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("music-cart", JSON.stringify(cart));
  }
};

const initialState = {
  cartItems: loadCart(),
  totalQuantity: 0,
  totalPrice: 0,
};

const musicCartSlice = createSlice({
  name: "musicCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        alert("Item added to the cart");
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        alert("Item added to the cart");
      }
      saveCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      saveCart(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      }
      saveCart(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCart(state.cartItems);
    },

    musicCalculateTotals: (state) => {
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
  clearCart,
  musicCalculateTotals,
} = musicCartSlice.actions;

export default musicCartSlice.reducer;
