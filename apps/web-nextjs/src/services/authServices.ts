import { auth } from "@/lib/firebaseAuth";
import { signOut } from "firebase/auth";

export const logout = async () => {
  return await signOut(auth);
};
