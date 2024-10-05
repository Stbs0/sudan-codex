import { auth } from "@/config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsUserLoggedIn(true);
      } else {
        setUser(null);
        setIsUserLoggedIn(false);
      }
    });
    return () => unSub();
  }, []);

  return { user, isUserLoggedIn,  };
};
export default useAuth