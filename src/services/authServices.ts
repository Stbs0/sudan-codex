import { auth, faceBookAuthProvider, googleAuthProvider } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
  return await signOut(auth);
};

export const GoogleSignIn = async () =>
  await signInWithPopup(auth, googleAuthProvider).catch(async (err) => {
    if ((err as FirebaseError).code === "auth/popup-blocked") {
      return await signInWithRedirect(auth, googleAuthProvider);
    }
    throw err;
  });

export const FaceBookSignIn = async () =>
  await signInWithPopup(auth, faceBookAuthProvider).catch(async (err) => {
    if ((err as FirebaseError).code === "auth/popup-blocked") {
      return await signInWithRedirect(auth, faceBookAuthProvider);
    }
    throw err;
  });
