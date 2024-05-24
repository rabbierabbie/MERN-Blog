//In this file we set up firebase though firebaseconfig
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Auth_Firebase_Key, //we need to hide the apikey and for that we create an env file.
  
  //When we were using create react app we used process.env.<name of var>. Here, we are using vite, so this statement is to be written.

  //Loaded env variables are also exposed to your client source code via import.meta.env as strings. Only VITE_SOME_KEY will be exposed as import.meta.env.VITE_SOME_KEY to your client source code, but DB_PASSWORD will not.
  authDomain: "mern-blog-6bcc5.firebaseapp.com",
  projectId: "mern-blog-6bcc5",
  storageBucket: "mern-blog-6bcc5.appspot.com",
  messagingSenderId: "240949997725",
  appId: "1:240949997725:web:18680413b178b78139e474"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);