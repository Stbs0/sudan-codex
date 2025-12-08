export type Theme = "dark" | "light" | "system";

export type Unit = {
  value: string;
  label: string;
};

// export type Drug = {
//   no: string;
//   brandName: string;
//   genericName: string;
//   dosageFormName: string;
//   strength: string;
//   packSize: string;
//   companyName: string;
//   countryOfOrigin: string;
//   agentName: string;
// };

// export type DrugWithSlugs = Drug & {
//   genericNameSlug: string;
//   companyNameSlug: string;
//   agentNameSlug: string;
//   countryOfOriginSlug: string;
// };

export type SaveUserReturnTypes = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  profileComplete: boolean;
  providerId: string;
  phoneNumber: string;
};

export type FetchedDrugInfo = {
  results: Array<Record<string, string[]>>;
};

export type Occupations =
  | "Student"
  | "Administrator"
  | "Pharmacist"
  | "Medical Representative"
  | "Other";
