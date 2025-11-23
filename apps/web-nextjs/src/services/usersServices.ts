// import api from "@/lib/api";
import { auth } from "@/lib/firebaseAuth";
import { db } from "@/lib/firestore";
import { type tellUsMoreSchemaType } from "@/lib/schemas";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { SaveUserReturnTypes } from "../lib/types";

const docRef = (uid: string) => doc(db, "users", uid);
type UserData = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  providerId: string;
  profileComplete: boolean;
};
export const SaveUserInFIreStore = async (userData: UserData, uid: string) => {
  const userRef = doc(db, "users", uid); // 🔥 Fix: Ensure Firestore is used correctly

  await setDoc(userRef, {
    uid,
    displayName: userData.displayName,
    email: userData.email,
    photoURL: userData.photoURL,
    phoneNumber: userData.phoneNumber,
    providerId: userData.providerId,
    profileComplete: userData.profileComplete,
  });
};

export const getUser = async (uid: string) => {
  const userRef = docRef(uid);

  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    return undefined;
  }

  return docSnap.data() as SaveUserReturnTypes;
};

export const completeProfile = async (
  data: tellUsMoreSchemaType & { profileComplete: boolean }
) => {
  if (!auth.currentUser) {
    return null;
  }
  const userRef = docRef(auth.currentUser.uid);

  await updateDoc(userRef, data);
};
