import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormSchema } from "@/lib/formSchema";

const DrugField = ({
  register,
  label,
  placeholder,
  name,
  errors,
  ...props
}: {
  label: string;
  placeholder: string;
  name: keyof FormSchema;
  errors: FieldErrors<FormSchema>;
  register: UseFormRegister<FormSchema>;
  props?: [string, number];
}) => {
  console.log(errors);
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        className='placeholder:italic'
        id={name}
        placeholder={placeholder}
        {...register(name)}
        {...props}
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
