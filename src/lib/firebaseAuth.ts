import {
  connectAuthEmulator,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}
export const googleAuthProvider = new GoogleAuthProvider();
export const faceBookAuthProvider = new FacebookAuthProvider();
