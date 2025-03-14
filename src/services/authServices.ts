import { auth, faceBookAuthProvider, googleAuthProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  await signInWithPopup(auth, googleAuthProvider);
export const FaceBookSignIn = async () =>
  await signInWithPopup(auth, faceBookAuthProvider);

// export const SaveUserInFIreStore = async (user: UserInDb) => {
//   const docRef = doc(db, "users", user.uid);
//   return await setDoc(docRef, user);
// };
