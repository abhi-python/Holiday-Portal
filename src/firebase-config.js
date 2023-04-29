import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA1FCyE2dnz11xPjvsbYz9tIEL5Rd1nxVY",
  authDomain: "holiday-aa6bf.firebaseapp.com",
  projectId: "holiday-aa6bf",
  storageBucket: "holiday-aa6bf.appspot.com",
  messagingSenderId: "210664493373",
  appId: "1:210664493373:web:6627b307ff67b4d206f554"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)