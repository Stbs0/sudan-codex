import { db } from "@/config/firebase";
import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { FetchedDrugList } from "@/types/types";
import {
  Timestamp,
  getDocs,
  collection,
  QuerySnapshot,
  CollectionReference,
  doc,
  setDoc,
} from "firebase/firestore";
import { v7 as uuidv7 } from "uuid";

const drugsCollection = collection(
  db,
  "drugs",
) as CollectionReference<FetchedDrugList>;

export const saveDrug = async (drug: FormSchema, userId: string) => {
  try {
    console.log(drug);
    const drugRef = doc(db, "drugs", uuidv7());
    await setDoc(drugRef, {
      ...drug,
      date: Timestamp.now(),
      submittedBy: userId,
      id: drugRef.id,
    });
    console.log("Document written  ", drug);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDrugs = async () => {
  const drugsSnapshot: QuerySnapshot<FetchedDrugList> =
    await getDocs(drugsCollection);

  return drugsSnapshot;
};
