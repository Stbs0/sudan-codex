import { FormSchema } from "@/lib/schemas";
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
export type DrugProperty = Drug[keyof Drug];

export type SaveUserReturnTypes = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  profileComplete: boolean;
  providerId: string;
  phoneNumber: string;
};
export type PrivateOutletTypes = {
  isPending: boolean;
  isError: boolean;
  data: SaveUserReturnTypes;
  error: unknown;
};

// interface DrugResult {
//   indications_and_usage: string[];
//   dosage_and_administration: string[];
//   dosage_and_administration_table: string[];
//   dosage_forms_and_strengths: string[];
//   contraindications: string[];
//   warnings_and_cautions: string[];
//   adverse_reactions: string[];
//   adverse_reactions_table: string[];
//   drug_interactions: string[];
//   use_in_specific_populations: string[];
//   use_in_specific_populations_table: string[];
// }

export type FetchedDrugInfo = {
  results: Array<Record<string, string[]>>;
};
