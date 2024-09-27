import { UseFormReturn } from "react-hook-form";

import { DrugForms, Inputs } from "@/types/formSchema";
import getDosageForms from "@/lib/utils";
import SelectForm from "./SelectForm";

const DrugSelect = ({
  form,
  label,
  name,
  second,
  message,
}: {
  form: UseFormReturn<Inputs>;
  label: string;
  name: keyof Inputs;
  second?: boolean;
  message?: string;
  placeholder?: string;
}) => {
  const v = getDosageForms(form.watch("dosageForm"));

  const values = Object.values(second ? v : DrugForms);
  return (
    <SelectForm
      form={form}
      label={label}
      name={name}
      values={values}
      message={message}
      placeholder={values[0]}
    />
  );
};

export default DrugSelect;
