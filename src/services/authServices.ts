import { auth, db, faceBookAuthProvider, googleAuthProvider } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
  return signOut(auth);
};

export const GoogleSignIn = async () =>
  signInWithPopup(auth, googleAuthProvider);
export const FaceBookSignIn = async () =>
  signInWithPopup(auth, faceBookAuthProvider);

const usersRef = collection(db, "users");


export const SaveUserInFIreStore = async (user: { email: string }) => {
  return addDoc(usersRef, user);
};
