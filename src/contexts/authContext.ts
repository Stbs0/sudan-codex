import { User } from "firebase/auth";
import { createContext } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;
