import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAwrWbGUHOyMlgJQurSmbQjSOj5NX1Aacg",
  authDomain: "cj-art-software.firebaseapp.com",
  projectId: "cj-art-software",
  storageBucket: "cj-art-software.appspot.com",
  messagingSenderId: "645095877574",
  appId: "1:645095877574:web:5dfcee71f4bc11e24960c7",
  measurementId: "G-6G2040YFW1"
};

  console.log("Firebase Config:", firebaseConfig);
 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  // export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const functions = getFunctions(app);
  export const storage = getStorage(app);
  
  console.log("Firebase initialized:", app);
  console.log("Firestore instance:", db);
  export default app;
  