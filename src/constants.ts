import { Home, Pill } from "lucide-react";
import {  Unit } from "./types/types";
export const DRUG_UNITS: Unit[] = [
  { value: "mg", label: "mg" },
  { value: "g", label: "g" },
  { value: "mcg", label: "mcg" },
  { value: "ng", label: "ng" },
  { value: "U", label: "U" },
  { value: "IU", label: "IU" },
  { value: "kg", label: "kg" },
  { value: "mL", label: "mL" },
  { value: "L", label: "L" },
  { value: "% w/w", label: "% w/w" },
  { value: "% w/v", label: "% w/v" },
  { value: "% v/v", label: "% v/v" },
  { value: "%", label: "%" },
  { value: "other", label: "Other" },
];

export const DOSAGE_FORMS = [
  {
    label: "AEROSOL",
  },
  {
    label: "AEROSOL, FOAM",
  },
  {
    label: "AEROSOL, METERED",
  },
  {
    label: "AEROSOL, POWDER",
  },
  {
    label: "AEROSOL, SPRAY",
  },
  {
    label: "BAR, CHEWABLE",
  },
  {
    label: "BEAD",
  },
  {
    label: "CAPSULE",
  },
  {
    label: "CAPSULE, COATED",
  },
  {
    label: "CAPSULE, COATED PELLETS",
  },
  {
    label: "CAPSULE, COATED, EXTENDED RELEASE",
  },
  {
    label: "CAPSULE, DELAYED RELEASE",
  },
  {
    label: "CAPSULE, DELAYED RELEASE PELLETS",
  },
  {
    label: "CAPSULE, EXTENDED RELEASE",
  },
  {
    label: "CAPSULE, FILM COATED, EXTENDED RELEASE",
  },
  {
    label: "CAPSULE, GELATIN COATED",
  },
  {
    label: "CAPSULE, LIQUID FILLED",
  },
  {
    label: "CELLULAR SHEET",
  },
  {
    label: "CHEWABLE GEL",
  },
  {
    label: "CLOTH",
  },
  {
    label: "CONCENTRATE",
  },
  {
    label: "CREAM",
  },
  {
    label: "CREAM, AUGMENTED",
  },
  {
    label: "CRYSTAL",
  },
  {
    label: "DISC",
  },
  {
    label: "DOUCHE",
  },
  {
    label: "DRESSING",
  },
  {
    label: "DRUG-ELUTING CONTACT LENS",
  },
  {
    label: "ELIXIR",
  },
  {
    label: "EMULSION",
  },
  {
    label: "ENEMA",
  },
  {
    label: "EXTRACT",
  },
  {
    label: "FIBER, EXTENDED RELEASE",
  },
  {
    label: "FILM",
  },
  {
    label: "FILM, EXTENDED RELEASE",
  },
  {
    label: "FILM, SOLUBLE",
  },
  {
    label: "FOR SOLUTION",
  },
  {
    label: "FOR SUSPENSION",
  },
  {
    label: "FOR SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "GAS",
  },
  {
    label: "GEL",
  },
  {
    label: "GEL, DENTIFRICE",
  },
  {
    label: "GEL, METERED",
  },
  {
    label: "GLOBULE",
  },
  {
    label: "GRANULE",
  },
  {
    label: "GRANULE, DELAYED RELEASE",
  },
  {
    label: "GRANULE, EFFERValueESCENT",
  },
  {
    label: "GRANULE, FOR SOLUTION",
  },
  {
    label: "GRANULE, FOR SUSPENSION",
  },
  {
    label: "GRANULE, FOR SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "GUM, CHEWING",
  },
  {
    label: "IMPLANT",
  },
  {
    label: "INHALANT",
  },
  {
    label: "INJECTABLE FOAM",
  },
  {
    label: "INJECTABLE, LIPOSOMAL",
  },
  {
    label: "INJECTION",
  },
  {
    label: "INJECTION, EMULSION",
  },
  {
    label: "INJECTION, LIPID COMPLEX",
  },
  {
    label: "INJECTION, POWDER, FOR SOLUTION",
  },
  {
    label: "INJECTION, POWDER, FOR SUSPENSION",
  },
  {
    label: "INJECTION, POWDER, FOR SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "INJECTION, POWDER, LYOPHILIZED, FOR LIPOSOMAL SUSPENSION",
  },
  {
    label: "INJECTION, POWDER, LYOPHILIZED, FOR SOLUTION",
  },
  {
    label: "INJECTION, POWDER, LYOPHILIZED, FOR SUSPENSION",
  },
  {
    label: "INJECTION, POWDER, LYOPHILIZED, FOR SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "INJECTION, SOLUTION",
  },
  {
    label: "INJECTION, SOLUTION, CONCENTRATE",
  },
  {
    label: "INJECTION, SUSPENSION",
  },
  {
    label: "INJECTION, SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "INJECTION, SUSPENSION, LIPOSOMAL",
  },
  {
    label: "INJECTION, SUSPENSION, SONICATED",
  },
  {
    label: "INSERT",
  },
  {
    label: "INSERT, EXTENDED RELEASE",
  },
  {
    label: "INTRAUTERINE DEVICE",
  },
  {
    label: "IRRIGANT",
  },
  {
    label: "JELLY",
  },
  {
    label: "KIT",
  },
  {
    label: "LINIMENT",
  },
  {
    label: "LIPSTICK",
  },
  {
    label: "LIQUID",
  },
  {
    label: "LIQUID, EXTENDED RELEASE",
  },
  {
    label: "LOTION",
  },
  {
    label: "LOTION, AUGMENTED",
  },
  {
    label: "LOTION/SHAMPOO",
  },
  {
    label: "LOZENGE",
  },
  {
    label: "MOUTHWASH",
  },
  {
    label: "NOT APPLICABLE",
  },
  {
    label: "OIL",
  },
  {
    label: "OINTMENT",
  },
  {
    label: "OINTMENT, AUGMENTED",
  },
  {
    label: "PASTE",
  },
  {
    label: "PASTE, DENTIFRICE",
  },
  {
    label: "PASTILLE",
  },
  {
    label: "PATCH",
  },
  {
    label: "PATCH, EXTENDED RELEASE",
  },
  {
    label: "PATCH, EXTENDED RELEASE, ELECTRICALLY CONTROLLED",
  },
  {
    label: "PELLET",
  },
  {
    label: "PELLET, IMPLANTABLE",
  },
  {
    label: "PELLETS, COATED, EXTENDED RELEASE",
  },
  {
    label: "PILL",
  },
  {
    label: "PLASTER",
  },
  {
    label: "POULTICE",
  },
  {
    label: "POWDER",
  },
  {
    label: "POWDER, DENTIFRICE",
  },
  {
    label: "POWDER, FOR SOLUTION",
  },
  {
    label: "POWDER, FOR SUSPENSION",
  },
  {
    label: "POWDER, METERED",
  },
  {
    label: "RING",
  },
  {
    label: "RINSE",
  },
  {
    label: "SALVE",
  },
  {
    label: "SHAMPOO",
  },
  {
    label: "SHAMPOO, SUSPENSION",
  },
  {
    label: "SOAP",
  },
  {
    label: "SOLUTION",
  },
  {
    label: "SOLUTION, CONCENTRATE",
  },
  {
    label: "SOLUTION, FOR SLUSH",
  },
  {
    label: "SOLUTION, GEL FORMING / DROPS",
  },
  {
    label: "SOLUTION, GEL FORMING, EXTENDED RELEASE",
  },
  {
    label: "SOLUTION/ DROPS",
  },
  {
    label: "SPONGE",
  },
  {
    label: "SPRAY",
  },
  {
    label: "SPRAY, METERED",
  },
  {
    label: "SPRAY, SUSPENSION",
  },
  {
    label: "STICK",
  },
  {
    label: "STRIP",
  },
  {
    label: "SUPPOSITORY",
  },
  {
    label: "SUPPOSITORY, EXTENDED RELEASE",
  },
  {
    label: "SUSPENSION",
  },
  {
    label: "SUSPENSION, EXTENDED RELEASE",
  },
  {
    label: "SUSPENSION/ DROPS",
  },
  {
    label: "SWAB",
  },
  {
    label: "SYRUP",
  },
  {
    label: "SYSTEM",
  },
  {
    label: "TABLET",
  },
  {
    label: "TABLET, CHEWABLE",
  },
  {
    label: "TABLET, CHEWABLE, EXTENDED RELEASE",
  },
  {
    label: "TABLET, COATED",
  },
  {
    label: "TABLET, COATED PARTICLES",
  },
  {
    label: "TABLET, DELAYED RELEASE",
  },
  {
    label: "TABLET, DELAYED RELEASE PARTICLES",
  },
  {
    label: "TABLET, EFFERVESCENT",
  },
  {
    label: "TABLET, EXTENDED RELEASE",
  },
  {
    label: "TABLET, FILM COATED",
  },
  {
    label: "TABLET, FILM COATED, EXTENDED RELEASE",
  },
  {
    label: "TABLET, FOR SOLUTION",
  },
  {
    label: "TABLET, FOR SUSPENSION",
  },
  {
    label: "TABLET, MULTILAYER",
  },
  {
    label: "TABLET, MULTILAYER, EXTENDED RELEASE",
  },
  {
    label: "TABLET, ORALLY DISINTEGRATING",
  },
  {
    label: "TABLET, ORALLY DISINTEGRATING, DELAYED RELEASE",
  },
  {
    label: "TABLET, SOLUBLE",
  },
  {
    label: "TABLET, SUGAR COATED",
  },
  {
    label: "TABLET WITH SENSOR",
  },
  {
    label: "TAMPON",
  },
  {
    label: "TAPE",
  },
  {
    label: "TINCTURE",
  },
  {
    label: "TROCHE",
  },
  {
    label: "TUBE",
  },
  {
    label: "UNIT DOSE",
  },
  {
    label: "VAGINAL INSERT",
  },
  {
    label: "VAPOR",
  },
  {
    label: "WAFER",
  },
  {
    label: "WATER",
  },
  {
    label: "WAX",
  },
];


export const PACKAGING_TYPES = [
  {
    label: "AMPULE",
    value: "ampule",
  },
  {
    label: "APPLICATOR",
    value: "applicator",
  },
  {
    label: "BAG",
    value: "bag",
  },
  {
    label: "BLISTER PACK",
    value: "blister pack",
  },
  {
    label: "BOTTLE",
    value: "bottle",
  },
  {
    label: "BOTTLE, DISPENSING",
    value: "bottle, dispensing",
  },
  {
    label: "BOTTLE, DROPPER",
    value: "bottle, dropper",
  },
  {
    label: "BOTTLE, GLASS",
    value: "bottle, glass",
  },
  {
    label: "BOTTLE, PLASTIC",
    value: "bottle, plastic",
  },
  {
    label: "BOTTLE, PUMP",
    value: "bottle, pump",
  },
  {
    label: "BOTTLE, SPRAY",
    value: "bottle, spray",
  },
  {
    label: "BOTTLE, UNIT-DOSE",
    value: "bottle, unit-dose",
  },
  {
    label: "BOTTLE, WITH APPLICATOR",
    value: "bottle, with applicator",
  },
  {
    label: "BOX",
    value: "box",
  },
  {
    label: "BOX, UNIT-DOSE",
    value: "box, unit-dose",
  },
  {
    label: "CAN",
    value: "can",
  },
  {
    label: "CANISTER",
    value: "canister",
  },
  {
    label: "CAPSULE",
    value: "capsule",
  },
  {
    label: "CARTON",
    value: "carton",
  },
  {
    label: "CARTRIDGE",
    value: "cartridge",
  },
  {
    label: "CASE",
    value: "case",
  },
  {
    label: "CELLO PACK",
    value: "cello pack",
  },
  {
    label: "CONTAINER",
    value: "container",
  },
  {
    label: "CONTAINER, FLEXIBLE INTERMEDIATE BULK",
    value: "container, flexible intermediate bulk",
  },
  {
    label: "CUP",
    value: "cup",
  },
  {
    label: "CUP, UNIT-DOSE",
    value: "cup, unit-dose",
  },
  {
    label: "CYLINDER",
    value: "cylinder",
  },
  {
    label: "DEWAR",
    value: "dewar",
  },
  {
    label: "DIALPACK",
    value: "dialpack",
  },
  {
    label: "DOSE PACK",
    value: "dose pack",
  },
  {
    label: "DRUM",
    value: "drum",
  },
  {
    label: "INHALER",
    value: "inhaler",
  },
  {
    label: "INHALER, REFILL",
    value: "inhaler, refill",
  },
  {
    label: "JAR",
    value: "jar",
  },
  {
    label: "JUG",
    value: "jug",
  },
  {
    label: "KIT",
    value: "kit",
  },
  {
    label: "NOT APPLICABLE",
    value: "not applicable",
  },
  {
    label: "PACKAGE",
    value: "package",
  },
  {
    label: "PACKAGE, COMBINATION",
    value: "package, combination",
  },
  {
    label: "PACKET",
    value: "packet",
  },
  {
    label: "PAIL",
    value: "pail",
  },
  {
    label: "PATCH",
    value: "patch",
  },
  {
    label: "POUCH",
    value: "pouch",
  },
  {
    label: "PRE-FILLED SYRINGE",
    value: "pre-filled syringe",
  },
  {
    label: "SUPERSACK",
    value: "supersack",
  },
  {
    label: "SYRINGE",
    value: "syringe",
  },
  {
    label: "SYRINGE, GLASS",
    value: "syringe, glass",
  },
  {
    label: "SYRINGE, PLASTIC",
    value: "syringe, plastic",
  },
  {
    label: "TABMINDER",
    value: "tabminder",
  },
  {
    label: "TANK",
    value: "tank",
  },
  {
    label: "TRAY",
    value: "tray",
  },
  {
    label: "TUBE",
    value: "tube",
  },
  {
    label: "TUBE, WITH APPLICATOR",
    value: "tube, with applicator",
  },
  {
    label: "VIAL",
    value: "vial",
  },
  {
    label: "VIAL, DISPENSING",
    value: "vial, dispensing",
  },
  {
    label: "VIAL, GLASS",
    value: "vial, glass",
  },
  {
    label: "VIAL, MULTI-DOSE",
    value: "vial, multi-dose",
  },
  {
    label: "VIAL, PATENT DELIVERY SYSTEM",
    value: "vial, patent delivery system",
  },
  {
    label: "VIAL, PHARMACY BULK PACKAGE",
    value: "vial, pharmacy bulk package",
  },
  {
    label: "VIAL, PIGGYBACK",
    value: "vial, piggyback",
  },
  {
    label: "VIAL, PLASTIC",
    value: "vial, plastic",
  },
  {
    label: "VIAL, SINGLE-DOSE",
    value: "vial, single-dose",
  },
  {
    label: "VIAL, SINGLE-USE",
    value: "vial, single-use",
  },
];
export const NAV_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Drug Form",
    url: "/drug-form",
    icon: Pill,
  },
  {
    title: "Drug list",
    url: "/drug-form",
    icon: Pill,
  },
];