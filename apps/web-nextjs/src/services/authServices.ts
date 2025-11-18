import { auth } from "@/src/lib/firebaseAuth";
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

export const FaceBookSignIn = async () =>
  await signInWithPopup(
    auth,
    new FacebookAuthProvider(),
    browserPopupRedirectResolver
  ).catch(async (err) => {
    if ((err as FirebaseError).code === "auth/popup-blocked") {
      return await signInWithRedirect(
        auth,
        new FacebookAuthProvider(),
        browserPopupRedirectResolver
      );
    }
    throw err;
  });
