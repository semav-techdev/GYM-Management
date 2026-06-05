import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const TOKEN_LIFETIME_MS = 60 * 60 * 1000;

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiresAt: null,
      isAuthenticated: false,

      login: (user, token) => {
        set({
          user,
          token,
          expiresAt: Date.now()+TOKEN_LIFETIME_MS,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },

      checkTokenExpiration: () => {
        const {token,expiresAt} = get();

        if (!token || !expiresAt || Date.now()>=expiresAt) {
          get().logout();
          return false;
        }

        try {
          const decoded = jwtDecode(token);

          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            get().logout();

            return false;
          }

          return true;

        } catch (error) {
          get().logout();

          return false;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
