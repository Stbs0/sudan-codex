import { db } from "@/config/firebase";
import { collection } from "firebase/firestore";

export const drugsCollection = () => {
  return collection(db, "drugs");
};

export const usersCollection = () => {
  return collection(db, "users");
};
