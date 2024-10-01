import { useFormContext } from "react-hook-form";

import { Input } from "./ui/input";
import { FormSchema } from "@/lib/formSchema";
interface Props {
  placeholder: string;
  name: keyof FormSchema;

  props?: [string, number];
}
const DrugField = ({ placeholder, name, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchema>();

  return (
    <div className='ml-2 '>
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
