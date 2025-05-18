import { create } from "zustand";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true, // Add loading state

  // Initialize the auth state
  init: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ 
          isAuthenticated: true, 
          user,
          isLoading: false 
        });
      } else {
        set({ 
          isAuthenticated: false, 
          user: null,
          isLoading: false 
        });
      }
    });
    
    // Return cleanup function
    return () => unsubscribe();
  },

  login: (userData) => set({ 
    isAuthenticated: true, 
    user: userData 
  }),

  // Proper logout action with Firebase integration
  logout: async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      set({ 
        isAuthenticated: false, 
        user: null 
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Re-throw if you want to handle in component
    }
  },
}));

export default useAuthStore;