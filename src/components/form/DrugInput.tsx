import { useFormContext } from "react-hook-form";

import { Input } from "../ui/input";
import { FormSchema } from "@/lib/schemas/newDrugSchema";
interface Props {
  placeholder: string;
  name: keyof FormSchema;

  type?: string;
}
const DrugField = ({ placeholder, name, type }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();
  const isNumber = type === "number";
  return (
    <div className='ml-2 '>
      <Input
        className='placeholder:italic'
        id={name}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: isNumber })}
        type={type}
      />
      {errors[name] && (
        <p className='text-sm text-red-600'>
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default DrugField;
