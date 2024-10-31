import { auth } from "@/config/firebase";
import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { addDoc, Timestamp } from "firebase/firestore";
import { drugsCollection } from "./collections";

export const saveDrug = async (drug: FormSchema) => {
  try {
    console.log(drug)
    const drugRef = drugsCollection();
    const newDrug = await addDoc(drugRef, {
      ...drug,
      date: Timestamp.now(),
      submittedBy: auth.currentUser?.uid,
    });
    console.log("Document written  ", drug);
    return newDrug;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
