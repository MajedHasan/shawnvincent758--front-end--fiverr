import { createSlice } from "@reduxjs/toolkit";

// Load user from local storage
const loadUser = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("shawnvincent-user")) || null;
  }
  return null;
};

// Save user to local storage
const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shawnvincent-user", JSON.stringify(user));
  }
};

// Remove user from local storage
const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("shawnvincent-user");
  }
};

const initialState = {
  user: loadUser(), // Store logged-in user info
  isAuthenticated: !!loadUser(), // Check if user is logged in
  isAdmin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin";
      saveUser(action.payload);
    },

    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin";
      saveUser(action.payload);
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeUser();
    },

    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveUser(state.user);
      }
    },

    updatePassword: (state, action) => {
      if (state.user) {
        state.user.password = action.payload;
        saveUser(state.user);
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  register,
  login,
  logoutUser,
  updateProfile,
  updatePassword,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
