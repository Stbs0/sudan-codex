import { auth } from "@/lib/firebaseAuth";
import { FirebaseError } from "firebase/app";
import {
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export const logout = async () => {
  return await signOut(auth);
};

export const GoogleSignIn = async () =>
  await signInWithPopup(
    auth,
    new GoogleAuthProvider(),
    browserPopupRedirectResolver
  ).catch(async (err) => {
    if ((err as FirebaseError).code === "auth/popup-blocked") {
      return await signInWithRedirect(
        auth,
        new GoogleAuthProvider(),
        browserPopupRedirectResolver
      );
    }
    throw err;
  });
