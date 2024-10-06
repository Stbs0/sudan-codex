import { auth, db } from "@/config/firebase";
import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { collection, addDoc, Timestamp } from "firebase/firestore";
export const createDrug = async (drug: FormSchema) => {
  try {
    const newDrug = await addDoc(collection(db, "drug"), {
      ...drug,
      date: Timestamp.now(),
      author: auth.currentUser?.uid,
    });
    console.log("Document written with ID: ", newDrug.id);
    return newDrug.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
