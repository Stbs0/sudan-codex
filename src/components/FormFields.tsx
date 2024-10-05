import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { signUpSchemaType } from "@/lib/schemas/signUpSchema";

type Props = {
  register: UseFormRegister<signUpSchemaType>;
  label: string;
  placeholder?: string;
  type?: string;
  name: keyof signUpSchemaType;
  errors: FieldErrors;
};

const FormFields = ({
  register,
  label,
  name,
  errors,
  placeholder,
  type,
}: Props) => {
  return (
    <>
      <Label htmlFor='first-name'>{label}</Label>
      <Input 
        className={`placeholder:italic ${errors[name] ? "border-red-600 bg-red-50" : ""}`}
        {...register(name)}
        id={label}
        placeholder={placeholder}
        type={type}
      />

      {errors[name] && (
        <p className='text-sm text-red-600'>
          {errors[name]?.message?.toString()}
        </p>
      )}
      
    </>
  );
};

export default FormFields;
