import { UnitCategory } from "./types/types";

export const drugUnits: UnitCategory[] = [
  {
    label: "Weight Units",
    units: [
      { value: "mg", label: "mg" },
      { value: "g", label: "g" },
      { value: "mcg", label: "mcg" },
      { value: "ng", label: "ng" },
      { value: "kg", label: "kg" },
    ],
  },
  {
    label: "Volume Units",
    units: [
      { value: "mL", label: "mL" },
      { value: "L", label: "L" },
      { value: "dL", label: "dL" },
    ],
  },
  {
    label: "Concentration UnitsVolume)",
    units: [
      { value: "mg/mL", label: "mg/mL" },
      { value: "g/mL", label: "g/mL" },
      { value: "mcg/mL", label: "mcg/mL" },
      { value: "ng/mL", label: "ng/mL" },
      { value: "mg/L", label: "mg/L" },
      { value: "g/L", label: "g/L" },
      { value: "mcg/L", label: "mcg/L" },
      { value: "mmol/L", label: "mmol/L" },
    ],
  },
  {
    label: "Other Concentration Units",
    units: [
      { value: "%", label: "%)" },
      { value: "IU/mL", label: "IU/mL" },
      { value: "U/mL", label: "U/mL" },
    ],
  },
  {
    label: "Dosage Units",
    units: [
      { value: "mg/kg", label: "mg/kg" },
      { value: "mg/m²", label: "mg/m²" },
      { value: "mcg/kg", label: "mcg/kg" },
    ],
  },
  {
    label: "Other Units",
    units: [
      { value: "mEq", label: "mEq" },
      { value: "mmol", label: "mmol" },
      { value: "mOsm", label: "mOsm" },
    ],
  },
];
