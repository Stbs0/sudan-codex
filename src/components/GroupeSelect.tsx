import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { Inputs } from "@/types/formSchema";
import Select from "react-select";
import { drugUnits } from "@/constants";
import { Unit, UnitCategory } from "@/types/types";

const drugOptions = drugUnits.map((unit) => ({
  label: unit.label,
  options: unit.units,
}));
const formatGroupLabel = (data: { label: string; options: Unit[] }) => (
  <div>
    <span>{data.label}</span>
  </div>
);

const GroupSelect = ({
  register,
  label,
  name,
  values,
  message,
  placeholder,
}: {
  register: UseFormRegister<Inputs>;
  label: string;
  name: keyof Inputs;
  values: string[];
  message?: string;
  placeholder?: string;
}) => {
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
