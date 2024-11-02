import logInSchema, { LogInSchemaType } from "@/lib/schemas/LogInSchema";
import Login from "@/pages/LogIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const RHFLogInProvider = () => {
  const methods = useForm<LogInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(logInSchema),
  });

  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  );
};

export default RHFLogInProvider;
