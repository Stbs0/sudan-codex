"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const NoticeSheet = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const noticeSeen = localStorage.getItem("analytics-notice");
    if (noticeSeen === null) {
      // setOpen(true);
      localStorage.setItem("analytics-notice", "true");

      // Auto-close after 6 seconds (optional)
      const timer = setTimeout(() => setOpen(false), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>We use analytics to improve your experience</SheetTitle>
          <SheetDescription>
            This site collects <strong>anonymous usage data</strong> with
            PostHog to help us understand how the app is used and make it
            better. Learn more in our{" "}
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
      </SheetContent>
    </Sheet>
  );
};

export default NoticeSheet;
