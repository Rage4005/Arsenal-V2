import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmpQVzRCUyTJicKNs51LNSo5B1Tqrag1Q",
  authDomain: "arsenalv-2.firebaseapp.com",
  projectId: "arsenalv-2",
  storageBucket: "arsenalv-2.firebasestorage.app",
  messagingSenderId: "32625399827",
  appId: "1:32625399827:web:9071a26c24b4c8d48e47e6",
  measurementId: "G-WKWK6HXN61"
};

const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;9