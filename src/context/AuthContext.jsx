import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import apiRequest from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Single state object to prevent multiple re-renders
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    isInitialized: false,
  });

  const updateAuthState = useCallback(
    (updates, navigateTo = null) => {
      setAuthState((prev) => ({ ...prev, ...updates }));
      if (navigateTo) {
        navigate(navigateTo);
      }
    },
    [navigate]
  );

  const login = async (formData) => {
    const startTime = Date.now();
    const minimumLoadingTime = 300;

    updateAuthState({ loading: true });

    try {
      const res = await apiRequest.post("/auth/login", formData);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        const rolePath = res.data.user.role.toLowerCase();
        updateAuthState(
          {
            user: res.data.user,
            loading: false,
            isInitialized: true,
          },
          `/${rolePath}`
        );
      }, remainingTime);
    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        updateAuthState({
          user: null,
          loading: false,
          isInitialized: true,
        });
      }, remainingTime);

      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateAuthState(
        { user: null, loading: false, isInitialized: true },
        "/login"
      );
    } catch (error) {
      console.error("Logout error:", error);
      updateAuthState({ loading: false });
    }
  };

  const checkAuth = async () => {
    const startTime = Date.now();
    const minimumLoadingTime = 300;

    try {
      updateAuthState({ loading: true });
      const res = await apiRequest.post("/auth/checkAuth");

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        if (res.data.user) {
          updateAuthState({
            user: res.data.user,
            loading: false,
            isInitialized: true,
          });
        } else {
          updateAuthState(
            { user: null, loading: false, isInitialized: true },
            "/login"
          );
        }
      }, remainingTime);
    } catch (err) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

      setTimeout(() => {
        updateAuthState(
          { user: null, loading: false, isInitialized: true },
          "/login"
        );
      }, remainingTime);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading: authState.loading,
        setLoading: (loading) => updateAuthState({ loading }),
        user: authState.user,
        checkAuth,
        isInitialized: authState.isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
