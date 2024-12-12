import logInSchema, { LogInSchemaType } from "@/lib/schemas/LogInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RHFLogInProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<LogInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(logInSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default RHFLogInProvider;
