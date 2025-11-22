"use client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function DrugContentErrorFallback() {
  return (
    <Alert variant={"destructive"}>
      <AlertTitle>Try Again</AlertTitle>
      <AlertDescription>
        If the page didn&apos;t find the drug you are looking for, please try
        again with a different route and a correct generic name.
      </AlertDescription>
    </Alert>
  );
}

export default DrugContentErrorFallback;
