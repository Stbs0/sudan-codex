import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const usersCollection = collection(db, "users");

const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await addDoc(usersCollection, {
    email: user.email,
    uid: user.uid,
    preferences: {
      language: "en",
      theme: "light",
      unit: "metric",
      unitSystem: "metric",
      timeFormat: "12h",
      dateFormat: "dd/mm/yyyy",
      showNotifications: true,
    },
  });
};

export { createUser };
