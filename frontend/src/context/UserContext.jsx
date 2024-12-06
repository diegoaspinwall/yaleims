"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../../lib/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser && currentUser.email !== user?.email) {
        try {
          const data = await fetchOrAddUserData(currentUser.email);
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
            matches: data.user.matches,
            college: data.user.college,
            points: data.user.points,
          });
        } catch (error) {
          console.error("Error setting user:", error);
        }
      } else if (!currentUser) {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);
  

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;

      if (!signedInUser.email.endsWith("@yale.edu")) {
        throw new Error("You must use a Yale email to sign in.");
      }

      const data = await fetchOrAddUserData(signedInUser.email); // Pass ID Token explicitly

      setUser({
        name: signedInUser.displayName,
        email: signedInUser.email,
        matches: data.user.matches,
        college: data.user.college,
        points: data.user.points
      });

    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert(error.message);
      setUser(null); // Ensure the user state is cleared if sign-in fails
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };
  
  const fetchOrAddUserData = async (email) => {
    try {
      const response = await fetch('https://us-central1-yims-125a2.cloudfunctions.net/fetchOrAddUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,  // Pass the email directly
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  return (
    <UserContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
