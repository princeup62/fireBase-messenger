// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjrdtaiiKftvbmtiK1JS35N-f3dmmh-9M",
  authDomain: "fir-messenger-730e5.firebaseapp.com",
  projectId: "fir-messenger-730e5",
  storageBucket: "fir-messenger-730e5.appspot.com",
  messagingSenderId: "434814905751",
  appId: "1:434814905751:web:f36d2fbce0a311d111e8d2",
  dataBaseURL: "https://fir-messenger-730e5.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
