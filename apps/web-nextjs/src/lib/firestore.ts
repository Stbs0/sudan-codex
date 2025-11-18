import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
