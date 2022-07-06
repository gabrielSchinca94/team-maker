// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj07uPZTYhvQdzKuqou2cwX7wGZLvNiYs",
  authDomain: "test-react-native-175a7.firebaseapp.com",
  projectId: "test-react-native-175a7",
  storageBucket: "test-react-native-175a7.appspot.com",
  messagingSenderId: "258206841544",
  appId: "1:258206841544:web:b4e7a1a259d5cd763083fd"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );