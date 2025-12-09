// import api from "@/lib/api";

import type { tellUsMoreSchemaType } from "@/lib/schemas";
import type {
  SaveUserReturnTypes,
  UserDataToSaveToFirebaseTypes,
} from "@/types";
import { deleteUser, getAuth, signOut } from "@react-native-firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "@react-native-firebase/firestore";
const db = getFirestore();
const auth = getAuth();
const docRef = (uid: string) => doc(db, "users", uid);

export const SaveUserInFireStore = async (
  userData: UserDataToSaveToFirebaseTypes,
  uid: string,
) => {
  const userRef = docRef(uid);

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
    throw new Error("Firestore User not found");
  }

  return docSnap.data() as SaveUserReturnTypes;
};

export const completeProfile = async (
  data: tellUsMoreSchemaType & { profileComplete: boolean },
) => {
  if (!auth.currentUser) {
    return null;
  }
  const userRef = docRef(auth.currentUser.uid);

  await updateDoc(userRef, data);
};

export const deleteUserData = async () => {
  if (!auth.currentUser) {
    return null;
  }
  const userRef = docRef(auth.currentUser.uid);
  await Promise.all([deleteDoc(userRef), deleteUser(auth.currentUser)]);
};

export const signOutUser = async () => {
  await signOut(auth);
};
