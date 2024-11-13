import { FormSchema } from "@/lib/schemas/newDrugSchema";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type Unit = {
  value: string;
  label: string;
};

export type UnitCategory = {
  label: string;
  units: Unit[];
};
export interface DosageForm {
  label: string;
  value: string;
}

export type Generics = Pick<FormSchema, "generics">;
export type Strength = Pick<FormSchema, "strength">;
export type WatchGenerics = Generics["generics"];

export type UserInDb = Pick<
  User,
  "displayName" | "email" | "uid" | "photoURL" | "phoneNumber"
>;

export type FetchedDrugList = FormSchema & {
  submittedBy: string;
  date: Timestamp;
  id: string;
};

export type Drug = {
  no: string;
  brandName: string;
  genericName: string;
  dosageFormName: string;
  strength: string;
  packSize: string;
  companyName: string;
  countryOfOrigin: string;
  agentName: string;
};
