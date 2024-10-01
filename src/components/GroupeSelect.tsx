import { UseFormRegister, useFormContext } from "react-hook-form";
import Select from "react-select";
import { drugUnits } from "@/constants";
import { FormSchema } from "@/lib/formSchema";

const drugOptions = drugUnits.map((unit) => ({
  label: unit.label,
  options: unit.units,
}));
// const formatGroupLabel = (data: { label: string; options: Unit[] }) => (
//   <div>
//     <span>{data.label}</span>
//   </div>
// );

interface Props {
  register: UseFormRegister<FormSchema>;
  // label: string;
  name: keyof FormSchema;
  // values: string[];
  // message?: string;
  placeholder?: string;
}

const GroupSelect = ({
  name,

  placeholder,
}: Props) => {
  const { register } = useFormContext<FormSchema>();
  return (
    <div>
      <Select
        options={drugOptions}
        placeholder={placeholder}
        // formatGroupLabel={formatGroupLabel}
        onChange={() => register(name)}
      />
    </div>
  );
};

export default GroupSelect;
