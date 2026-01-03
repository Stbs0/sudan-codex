// export type FetchedDrugInfo = {
//   results: Array<Record<string, string[]>>;
// };

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

export type UserDataToSaveToFirebaseTypes = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  providerId: string;
  profileComplete: boolean;
};
export type DrugInfoTypes = {
  title: string;
  drug_id: string;
  ind: string;
  adult: string;
  ped: string;
  side: string;
  prgnancy: string;
  intermajer: string;
  clinical: string;
  admin: string;
  interminor: string;
  contra: string;
  clas: string;
  mode: string;
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
  results: Record<string, string[]>[];
};

export type Drug = {
  id: number;
  slug: string;
  brand_name: string;
  dosage_form: string | null;
  pack_size: string | null;
  strength: string | null;
  company_id: number | null;
  company_name: string | null;
  agent_id: number | null;
  agent_name: string | null;
  generic_id: number | null;
  generic_name: string | null;
  country_id: number | null;
  country_name: string | null;
};
export type DrugWithSlugs = Drug & {
  company: {
    id: number;
    name: string;
    slug: string;
  } | null;
  agent: {
    id: number;
    name: string;
    slug: string;
  } | null;
  generic: {
    id: number;
    name: string;
    slug: string;
  } | null;
};
export type AgentTypes = {
  stats: {
    total_brands: number | null;
    related_generics: number | null;
    related_companies: number | null;
  };
  drugs: AgentsDrugs[];
  name: string;
};
export type AgentsDrugs = {
  slug: string;
  brand_name: string;
  pack_size: string | null;
  strength: string | null;
  company_name: string | null;
  generic_name: string | null;
  company: {
    slug: string;
  } | null;
  generic: {
    slug: string;
  } | null;
};

export type FetchedDrugs = {
  data: Drug[];
  nextPage: number | null;
};
