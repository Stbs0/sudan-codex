import api from "@/lib/api";
import { auth } from "@/lib/firebase";
import { UpdateUserSchemaType, tellUsMoreSchemaType } from "@/lib/schemas";
import { SaveUserReturnTypes } from "@/types/types";
import { User } from "firebase/auth";

export const SaveUserInFIreStore = async (user: User, providerId: string) => {
  const token = await getTokenId();

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
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTokenId = async () => {
  return await auth.currentUser?.getIdToken();
};

export const getUser = async () => {
  const token = await getTokenId();
  console.log("token", token);
  const data: SaveUserReturnTypes = await api.get(`/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const completeProfile = async (
  data: tellUsMoreSchemaType & { profileComplete: boolean }
) => {
  const token = await getTokenId();

  return await api.post(`/user/complete-profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateUser = async (data: UpdateUserSchemaType) => {
  const token = await getTokenId();

  return await api.post(`/user/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
