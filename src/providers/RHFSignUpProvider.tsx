import signUpSchema, { signUpSchemaType } from "@/lib/schemas/signUpSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RHFSignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<signUpSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: zodResolver(signUpSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default RHFSignUpProvider;
