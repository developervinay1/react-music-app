import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA1BA6lnyLsY8PMvKIPOXK6ElQeqPoUipE",
  authDomain: "music-app-4ec2b.firebaseapp.com",
  projectId: "music-app-4ec2b",
  storageBucket: "music-app-4ec2b.appspot.com",
  messagingSenderId: "823157927932",
  appId: "1:823157927932:web:8806104415fc2f9f78cc79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
