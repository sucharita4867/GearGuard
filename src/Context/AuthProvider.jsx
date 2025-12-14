import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase-init";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Email + Password Login
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register User
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Logout User
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  // Update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: currentUser.email,
              name: currentUser.displayName,
              image: currentUser.photoURL,
              role: "Employee",
            }),
          });

          const res = await fetch(`${import.meta.env.VITE_API_URL}/getToken`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: currentUser.email }),
          });

          if (!res.ok) {
            throw new Error("Token fetch failed");
          }

          const data = await res.json();

          if (data?.token) {
            localStorage.setItem("token", data.token);
            setUser(currentUser);
          } else {
            throw new Error("No token received");
          }
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        await signOut(auth);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    googleLogin,
    signIn,
    registerUser,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
