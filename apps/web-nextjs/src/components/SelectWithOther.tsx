// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldLabel,
// } from "@/components/ui/field";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { type UpdateUserType } from "@sudan-codex/types";
// import { type ReactFormApi } from "@tanstack/react-form";

// interface SelectWithOtherProps<T extends "specialty" | "occupation"> {
//   form: ReactFormApi<UpdateUserType, any>;
//   name: T;
//   label: string;
//   placeholder: string;
//   description?: string;
//   options: NonNullable<UpdateUserType[T]>[];
// }
// const SelectWithOther = <T extends "specialty" | "occupation">({
//   form,
//   name,
//   label,
//   placeholder,
//   description,
//   options,
// }: SelectWithOtherProps<T>) => {
//   return (
//     <form.Field name={name}>
//       {(field) => (
//         <Field data-invalid={field.state.meta.errors.length > 0}>
//           <FieldLabel htmlFor={name}>{label}</FieldLabel>

//           <Select
//             name={field.name}
//             value={(field.state.value as string) ?? ""}
//             onValueChange={(value) => field.handleChange(value as any)}>
//             <SelectTrigger id={name}>
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>

//             <SelectContent>
//               {options.map((option) => (
//                 <SelectItem
//                   key={option}
//                   value={option}>
//                   {option}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {description && <FieldDescription>{description}</FieldDescription>}
//           <FieldError
//             errors={field.state.meta.errors.map((err) => ({
//               message: err?.toString(),
//             }))}
//           />
//         </Field>
//       )}
//     </form.Field>
//   );
// };

// export default SelectWithOther;
