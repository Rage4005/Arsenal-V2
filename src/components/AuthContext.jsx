import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUserData(user) {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            username: user.displayName || user.email.split('@')[0],
            email: user.email,
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback
        setUserData({
          username: user.displayName || user.email.split('@')[0],
          email: user.email,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      setUserData(null);
    }
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const additionalInfo = getAdditionalUserInfo(result);
    return { user: result.user, isNewUser: additionalInfo.isNewUser, result };
  }

  function logout() {
    return signOut(auth);
  }

  // Create or update user profile in Firestore
  async function saveUserProfile(user, username) {
    try {
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        const data = {
          username: username || user.displayName || user.email.split('@')[0],
          email: user.email,
          createdAt: new Date().toISOString(),
        };
        await setDoc(userRef, data);
        setUserData(data);
      } else {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error("Error saving user profile:", error);
      setUserData({
        username: username || user.displayName || user.email.split('@')[0],
        email: user.email,
        createdAt: new Date().toISOString(),
      });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
         await fetchUserData(user);
      } else {
         setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    loginWithGoogle,
    logout,
    saveUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
