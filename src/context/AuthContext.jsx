import { createContext, useEffect, useReducer } from "react";

import { supabase } from "../services/supabaseClients";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    // Check if a user is already logged in
    const getCurrentUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      dispatch({
        type: "AUTH_IS_READY",
        payload: session?.user || null,
      });
    };

    getCurrentUser();

    // Listen for future authentication changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        dispatch({
          type: "LOGIN",
          payload: session?.user || null,
        });
      }

      if (event === "SIGNED_OUT") {
        dispatch({
          type: "LOGOUT",
        });
      }
    });

    // Cleanup listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
