import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-N3n710U7Je0fEQt_fgd1FxvJcnFDOXo",
  authDomain: "alura-esporte-raz.firebaseapp.com",
  projectId: "alura-esporte-raz",
  storageBucket: "alura-esporte-raz.appspot.com",
  messagingSenderId: "181230369203",
  appId: "1:181230369203:web:2f585a61ea72c5b37e73c6",
  measurementId: "G-43Q8FT2L3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export { auth };