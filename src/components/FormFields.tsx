import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFormContext } from "react-hook-form";
import { signUpSchemaType } from "@/lib/schemas/signUpSchema";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  name: keyof signUpSchemaType;
};

const FormFields = ({
  label,
  name,

  placeholder,
  type,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Label htmlFor='first-name'>{label}</Label>
      <Input
        className={`placeholder:italic ${
          errors[name] ? "border-red-600 bg-red-50" : ""
        }`}
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
