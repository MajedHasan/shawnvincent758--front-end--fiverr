import { configureStore } from "@reduxjs/toolkit";
import productCartReducer, { productCalculateTotals } from "./productCartSlice";
import musicCartReducer, { musicCalculateTotals } from "./musicCartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    productCart: productCartReducer,
    musicCart: musicCartReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // ✅ Enables Redux DevTools in development
});

// ✅ Dispatch `calculateTotals` on store initialization
store.dispatch(productCalculateTotals());
store.dispatch(musicCalculateTotals());

export default store;
