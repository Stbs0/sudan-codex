
import signUpSchema, { signUpSchemaType } from "@/lib/schemas/signUpSchema";
import SignUp from "@/pages/SignUp";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RHFSignUpProvider = () => {
  const methods = useForm<signUpSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: zodResolver(signUpSchema),
  });

  return (
    <FormProvider {...methods}>
      <SignUp />
    </FormProvider>
  );
};

export default RHFSignUpProvider;
