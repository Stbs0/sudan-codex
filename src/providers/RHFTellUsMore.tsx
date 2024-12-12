import { Form } from "@/components/ui/form";
import { tellUsMoreSchema } from "@/lib/schemas/tellUsMoreSchema";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

const RHFTellUsMore = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      age: "",
      university: "",
      occupation: "",
      phoneNumber: "",
    },
    mode: "all",
    resolver: zodResolver(tellUsMoreSchema),
  });
  return (
    <FormProvider {...methods}>
      <Form {...methods}>{children}</Form>
    </FormProvider>
  );
};

export default RHFTellUsMore;
