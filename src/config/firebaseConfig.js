import { initializeApp } from "firebase/app"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4yTVzzTiKUiRGa4xl_OW6g4qlWxNtlog",
  authDomain: "blog-management-942dd.firebaseapp.com",
  projectId: "blog-management-942dd",
  storageBucket: "blog-management-942dd.firebasestorage.app",
  messagingSenderId: "18115729617",
  appId: "1:18115729617:web:fcfb35a99af2483f8a4df0",
  measurementId: "G-TSBRVKCZR5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);