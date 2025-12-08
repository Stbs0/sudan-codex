import {
  browserLocalPersistence,
  connectAuthEmulator,
  indexedDBLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { app } from "./firebase";

export const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
});
// if (process.env.NODE_ENV === "development") {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
// }
