import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { env } from "./env";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderI: env.MESSAGE_SENDER,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const faceBookAuthProvider = new FacebookAuthProvider();
