import { db } from "@/config/firebase";
import { FormSchema } from "@/lib/formSchema";
import { collection, addDoc } from "firebase/firestore";
export const createDrug = async (drug:FormSchema) => {
  try {
    const newDrug = await addDoc(collection(db, "drug"), drug);
    console.log("Document written with ID: ", newDrug.id);
    return newDrug;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
