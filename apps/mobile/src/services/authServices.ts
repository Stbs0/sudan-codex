import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "@react-native-firebase/auth";
const auth = getAuth();

export const logout = async () => {
  return await signOut(auth);
};

export const GoogleSignIn = async () =>
  // await signInWithPopup(auth, new GoogleAuthProvider()).catch(async (err) => {
  //   if ((err as FirebaseError).code === "auth/popup-blocked") {
  await signInWithRedirect(auth, new GoogleAuthProvider());
// }
// throw err;
// });

export const FaceBookSignIn = async () =>
  await signInWithPopup(auth, new FacebookAuthProvider()).catch(async (err) => {
    if (err.code === "auth/popup-blocked") {
      return await signInWithRedirect(auth, new FacebookAuthProvider());
    }
    throw err;
  });
