// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-93cb2.firebaseapp.com',
  projectId: 'mern-auth-93cb2',
  storageBucket: 'mern-auth-93cb2.appspot.com',
  messagingSenderId: '631326292893',
  appId: '1:631326292893:web:47539c7773933e64648d74',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
