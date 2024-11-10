import {
  auth,
  db,
  faceBookAuthProvider,
  googleAuthProvider,
} from "@/config/firebase";
import { UserInDb } from "@/types/types";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
  return await signOut(auth);
};

export const GoogleSignIn = async () =>
  await signInWithPopup(auth, googleAuthProvider);
export const FaceBookSignIn = async () =>
  await signInWithPopup(auth, faceBookAuthProvider);

const usersRef = collection(db, "users");

export const SaveUserInFIreStore = async (user: UserInDb) => {
  return await addDoc(usersRef, user);
};
