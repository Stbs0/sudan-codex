import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

const ConsentSheet = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("posthog-consent");
    if (consent === null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const handleConsent = (agree: boolean) => {
    if (agree) {
      posthog.opt_in_capturing();
      posthog.capture("consent_given");
      localStorage.setItem("posthog-consent", "granted");
    } else {
      localStorage.setItem("posthog-consent", "declined");
      posthog.opt_out_capturing();
      posthog.reset();
    }
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>We value your privacy</SheetTitle>
          <SheetDescription>
            We use analytics (PostHog) to improve the app. By accepting, you
            agree to the collection of anonymous usage data. Read our{" "}
            <a
              href='/privacy-policy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary underline'>
              Privacy Policy
            </a>
            .
          </SheetDescription>
        </SheetHeader>
        <div className='flex items-center justify-end gap-4 p-4'>
          <Button onClick={() => handleConsent(false)}>Decline</Button>
          <Button
            autoFocus
            className='bg-blue-600 dark:bg-blue-600 dark:text-white'
            onClick={() => handleConsent(true)}>
            Accept
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ConsentSheet;
