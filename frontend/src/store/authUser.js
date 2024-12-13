// import { create } from "zustand";
// import toast from "react-hot-toast";
// import axios from "axios";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isSigningUp: false,
//   isCheckingAuth: true,
//   isLoggingOut: false,
//   isLoggingIn: false,

//   signup: async (credentials, t) => {
//     set({ isSigningUp: true });
//     try {
//       const response = await axios.post("/api/v1/auth/signup", credentials);
//       set({ user: response.data.user, isSigningUp: false });
//       toast.success(t("Account Created successfully"));
//     } catch (error) {
//       toast.error(error.response.data.message || t("Signup failed"));
//       set({ isSigningUp: false, user: null });
//     }
//   },

//   login: async ({ email, password }, t) => {
//     set({ isLoggingIn: true });
//     try {
//       // Send email and password in the request body
//       const response = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       // Update state with the user data returned from the backend
//       set({ user: response.data.user, isLoggingIn: false });

//       toast.success(t("Logged in successfully"));
//     } catch (error) {
//       // Handle errors gracefully
//       const errorMessage = error.response?.data?.message || t("Login failed");
//       toast.error(errorMessage);

//       // Reset state on failure
//       set({ isLoggingIn: false, user: null });
//     }
//   },

//   logout: async () => {
//     set({ isLoggingOut: true });
//     try {
//       await axios.post("/api/v1/auth/logout");
//       set({ user: null, isLoggingOut: false });
//       toast.success("Logged out successfully");
//     } catch (error) {
//       set({ isLoggingOut: false, user: null });
//       toast.error(error.response.data.message || "An error occurred");
//     }
//   },

//   authCheck: async () => {
//     set({ isCheckingAuth: true });
//     try {
//       const response = await axios.get("/api/v1/auth/authCheck");
//       set({ user: response.data.user, isCheckingAuth: false });
//     } catch (error) {
//       set({ user: null, isCheckingAuth: false });
//     }
//   },
// }));

import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  subscriptionPlan: null, // Track the subscription plan
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async ({ email, password, username, subscriptionPlan }, t) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", {
        email,
        password,
        username,
        subscriptionPlan, // Send subscription plan in the request
      });
      set({
        user: response.data.user,
        subscriptionPlan: response.data.user.subscriptionPlan,
        isSigningUp: false,
      });
      toast.success(t("Account Created successfully"));
    } catch (error) {
      toast.error(error.response.data.message || t("Signup failed"));
      set({ isSigningUp: false, user: null, subscriptionPlan: null });
    }
  },

  login: async ({ email, password }, t) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      // Set user and subscription plan in the store after login
      set({
        user: response.data.user,
        subscriptionPlan: response.data.user.subscriptionPlan, // Set subscription plan
        isLoggingIn: false,
      });

      toast.success(t("Logged in successfully"));
    } catch (error) {
      const errorMessage = error.response?.data?.message || t("Login failed");
      toast.error(errorMessage);

      set({ isLoggingIn: false, user: null, subscriptionPlan: null });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, subscriptionPlan: null, isLoggingOut: false });

      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false, user: null, subscriptionPlan: null });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({
        user: response.data.user,
        subscriptionPlan: response.data.user.subscriptionPlan, // Set subscription plan after auth check
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, subscriptionPlan: null, isCheckingAuth: false });
    }
  },

  updateSubscriptionPlan: (newPlan) => {
    // Update the subscription plan in the store
    set({ subscriptionPlan: newPlan });
  },
}));
