import api from "@/lib/api";
import { auth } from "@/lib/firebase";
import { UpdateUserSchemaType, tellUsMoreSchemaType } from "@/lib/schemas";
import { SaveUserReturnTypes } from "@/types/types";
import { User } from "firebase/auth";

export const SaveUserInFIreStore = async (user: User, providerId: string) => {
  const idToken = await user.getIdToken();
  await api.post(
    `/user/create`,
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
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

export const getTokenId = async () => {
  return await auth.currentUser?.getIdToken();
};

export const getUser = async (idToken: string) => {
  const { data } = await api.get<SaveUserReturnTypes>(`/user/me`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return data;
};

export const completeProfile = async (
  idToken: string,
  data: tellUsMoreSchemaType & { profileComplete: boolean }
) => {
  return await api.post(`/user/complete-profile`, data, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
export const updateUser = async (
  idToken: string,
  data: UpdateUserSchemaType
) => {
  return await api.post(`/user/update`, data, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};
