import axios from "axios";
import { BASE_API } from "@/constants";
import { User } from "firebase/auth";
import { SaveUserReturnTypes } from "@/types/types";
import { auth } from "@/config/firebase";
import { tellUsMoreSchemaType } from "@/lib/schemas/tellUsMoreSchema";

export const SaveUserInFIreStore = async (user: User, providerId: string) => {
  const idToken = await user.getIdToken();
  await axios.post(
    `${BASE_API}/user/create`,
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      profileComplete: false,
      providerId,
      phoneNumber: user.phoneNumber,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
};

export const getTokenId = async () => {
  return await auth.currentUser?.getIdToken();
};

export const getUser = async (idToken: string) => {
  const { data } = await axios.get<SaveUserReturnTypes>(`${BASE_API}/user/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
  return data;
};

export const updateUser = async (
  idToken: string,
  data: tellUsMoreSchemaType & { profileComplete: boolean },
) => {
  return await axios.post(`${BASE_API}/user/complete-profile`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
};
