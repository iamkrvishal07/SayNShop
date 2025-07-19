import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "saynshop-ea1fe.firebaseapp.com",
  projectId: "saynshop-ea1fe",
  storageBucket: "saynshop-ea1fe.appspot.com",
  messagingSenderId: "477099259510",
  appId: "1:477099259510:web:54ce70b98ababfcec85157"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

