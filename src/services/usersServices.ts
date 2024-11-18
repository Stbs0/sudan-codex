import axios from "axios";
import { BASE_API } from "@/constants";
import { User } from "firebase/auth";

export const SaveUserInFIreStore = async (user: User) => {
  const idToken = await user.getIdToken();
  await axios.post(
    `${BASE_API}`,
    { idToken },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
};
