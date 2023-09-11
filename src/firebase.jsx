import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAUs2-Y1VyX6m8fPOGH17mpuAkMnhVjUvE",
    authDomain: "fir-1db37.firebaseapp.com",
    projectId: "fir-1db37",
    storageBucket: "fir-1db37.appspot.com",
    messagingSenderId: "736326003706",
    appId: "1:736326003706:web:67b3b4530a0f87d8511243"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)