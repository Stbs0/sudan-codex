import { UseFormReturn } from "react-hook-form";
import { Inputs } from "@/types/formSchema";
import Select from "react-select";

const formatGroupLabel = (data: ) => (
  <div >
    <span>{data.label}</span>
    <span >{data.options.length}</span>
  </div>
);

const SelectForm = ({
  form,
  label,
  name,
  values,
  message,
  placeholder,
}: {
  form: UseFormReturn<Inputs>;
  label: string;
  name: keyof Inputs;
  values: string[];
  message?: string;
  placeholder?: string;
}) => {
  return (
    <div>
      <Select options={values}
      placeholder={placeholder}
      formatGroupLabel={} />
    </div>
  );
};

export default SelectForm;
