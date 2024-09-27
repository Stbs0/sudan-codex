export enum OralDosageForm {
  TABLET = "Tablet",
  CHEWABLE_TABLET = "Chewable Tablet",
  EFFERVESCENT_TABLET = "Effervescent Tablet",
  SUBLINGUAL_TABLET = "Sublingual Tablet",
  BUCCAL_TABLET = "Buccal Tablet",
  ORALLY_DISINTEGRATING_TABLET = "Orally Disintegrating Tablet",
  FILM_COATED_TABLET = "Film-coated Tablet",
  ENTERIC_COATED_TABLET = "Enteric-coated Tablet",

  CAPSULE = "Capsule",
  HARD_CAPSULE = "Hard Capsule",
  SOFT_GELATIN_CAPSULE = "Soft Gelatin Capsule",
  DELAYED_RELEASE_CAPSULE = "Delayed-release Capsule",
  SUSTAINED_RELEASE_CAPSULE = "Sustained-release Capsule",

  ORAL_SOLUTION = "Oral Solution",
  ORAL_SUSPENSION = "Oral Suspension",
  SYRUP = "Syrup",
  ELIXIR = "Elixir",
  EMULSION = "Emulsion",

  POWDER_FOR_ORAL_SUSPENSION = "Powder for Oral Suspension",
  EFFERVESCENT_GRANULE = "Effervescent Granule",
  POWDER_FOR_RECONSTITUTION = "Powder for Reconstitution",

  LOZENGE = "Lozenge",
  TROCHE = "Troche",
  PASTILLE = "Pastille",

  MEDICATED_CHEWING_GUM = "Medicated Chewing Gum",
}

export enum TopicalDosageForm {
  OINTMENT = "Ointment",
  CREAM = "Cream",
  GEL = "Gel",
  LOTION = "Lotion",
  PASTE = "Paste",
  SPRAY = "Spray",
  TRANSDERMAL_PATCH = "Transdermal Patch",
  FOAM = "Foam",
}

export enum InhalationDosageForm {
  METERED_DOSE_INHALER = "Metered-dose Inhaler",
  DRY_POWDER_INHALER = "Dry Powder Inhaler",
  NEBULIZER = "Nebulizer",

  NASAL_SPRAY_SOLUTION = "Nasal Spray Solution",
  NASAL_SPRAY_SUSPENSION = "Nasal Spray Suspension",
}
export enum InjectableDosageForm {
  SOLUTION_FOR_INJECTION = "Solution for Injection",
  SUSPENSION_FOR_INJECTION = "Suspension for Injection",
  EMULSION_FOR_INJECTION = "Emulsion for Injection",
  LYOPHILIZED_POWDER_FOR_INJECTION = "Lyophilized Powder for Injection",
  PREFILLED_SYRINGE = "Prefilled Syringe",
  INSULIN_PEN = "Insulin Pen",
}
export enum OphthalmicDosageForm {
  EYE_DROPS_SOLUTION = "Eye Drops Solution",
  EYE_DROPS_SUSPENSION = "Eye Drops Suspension",
  EYE_OINTMENT = "Eye Ointment",
  EYE_GEL = "Eye Gel",
}
export enum OticDosageForm {
  EAR_DROPS = "Ear Drops",
  EAR_OINTMENT = "Ear Ointment",
}

export enum RectalDosageForm {
  RECTAL_SUPPOSITORY = "Rectal Suppository",
  RECTAL_OINTMENT = "Rectal Ointment",
  RECTAL_FOAM = "Rectal Foam",
  ENEMA = "Enema",
  RECTAL_GEL = "Rectal Gel",
}
export enum VaginalDosageForm {
  VAGINAL_SUPPOSITORY = "Vaginal Suppository",
  VAGINAL_TABLET = "Vaginal Tablet",
  VAGINAL_CREAM = "Vaginal Cream",
  VAGINAL_RING = "Vaginal Ring",
  VAGINAL_GEL = "Vaginal Gel",
  VAGINAL_FOAM = "Vaginal Foam",
  VAGINAL_DOUCHE = "Vaginal Douche",
}
export enum UrethralDosageForm {
  URETHRAL_SUPPOSITORY = "Urethral Suppository",
}
export enum TransdermalDosageForm {
  NICOTINE_PATCH = "Nicotine Patch",
  HORMONE_PATCH = "Hormone Patch",
}
export enum OtherDosageForm {
  IMPLANT = "Implant",
  PELLET = "Pellet",
  MEDICATED_TAMPON = "Medicated Tampon",
  INTRATHECAL_SOLUTION = "Intrathecal Solution",
  EPIDURAL_SOLUTION = "Epidural Solution",
  IONOPHORETIC_DELIVERY_SYSTEM = "Ionophoretic Delivery System",
  BUCCAL_FILM = "Buccal Film",
  ORAL_STRIP = "Oral Strip",
}
export enum DrugForms {
  ORAL = "Oral",
  INJECTABLE = "Injectable",
  TOPICAL = "Topical",
  INHALATION = "Inhalation",
  OPHTHALMIC = "Ophthalmic",
  OTIC = "Otic",
  RECTAL = "Rectal",
  VAGINAL = "Vaginal",
  URETHRAL = "Urethral",
  TRANSDERMAL = "Transdermal",
  OTHERS = "Others",
}

export type DosageFormUnion =
  | OralDosageForm
  | InjectableDosageForm
  | TopicalDosageForm
  | InhalationDosageForm
  | InjectableDosageForm
  | OphthalmicDosageForm
  | OticDosageForm
  | RectalDosageForm
  | VaginalDosageForm
  | UrethralDosageForm
  | TransdermalDosageForm
  | OtherDosageForm;

// export interface Inputs {
//   brand: string;
//   generic: string;
//   manufacturer: string;
//   dosageForm: DrugForms;
//   typeOfDosageForm: DosageFormUnion;
//   strength: {
//     number: 0;
//     nominator: "";
//     denominator?: "";
//   };
//   agency: string;
//   packaging: string;
//   price: number;
// }
