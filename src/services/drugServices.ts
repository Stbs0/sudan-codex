import { auth, db } from "@/config/firebase";
import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { addDoc, Timestamp, getDocs, collection } from "firebase/firestore";

const drugsCollection = collection(db, "drugs");

export const saveDrug = async (drug: FormSchema) => {
  try {
    console.log(drug);

    const newDrug = await addDoc(drugsCollection, {
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

export const getDrugs = async () => {
  const drugsSnapshot = await getDocs(drugsCollection);

  return drugsSnapshot;
};
