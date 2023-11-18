// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfaj6mhqebykF9DRf1JJMluG2boh6OiUk",
  authDomain: "pinterest-clone-ec9c3.firebaseapp.com",
  projectId: "pinterest-clone-ec9c3",
  storageBucket: "pinterest-clone-ec9c3.appspot.com",
  messagingSenderId: "441403081706",
  appId: "1:441403081706:web:ee66bda1170bbef77ae893"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}