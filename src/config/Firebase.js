// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByD3Xp8_zz4waZDmAnpvwntAbDhugnUuQ",
  authDomain: "vite-contact-69e12.firebaseapp.com",
  projectId: "vite-contact-69e12",
  storageBucket: "vite-contact-69e12.appspot.com",
  messagingSenderId: "827336718624",
  appId: "1:827336718624:web:2c13b07f87eba56627ff45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)