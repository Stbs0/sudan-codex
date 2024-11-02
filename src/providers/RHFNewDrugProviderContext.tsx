import formSchema, { FormSchema } from "@/lib/schemas/newDrugSchema";
import DrugForm from "@/pages/DrugForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RHFNewDrugProvider = () => {
  const methods = useForm<FormSchema>({
    shouldUnregister: true,
    defaultValues: {
      brand: "",
      generics: [{ generic: "" }],
      manufacturer: "",
      dosageForm: "AEROSOL",
      strength: [
        {
          nominator: 0,
          denominator: 0,
          nominatorUnit: "ml",
          denominatorUnit: "ml",
        },
      ],
      agency: "",
      packaging: { number: 0, packageForm: "AMPULE" },
      price: 0,
    },
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...methods}>
      <DrugForm/>
    </FormProvider>
  );
};

export default RHFNewDrugProvider;
