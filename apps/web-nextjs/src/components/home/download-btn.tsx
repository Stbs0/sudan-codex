"use client";
import { ArrowRight, Smartphone } from "lucide-react";
import { usePostHog } from "posthog-js/react";

import { Button } from "@/components/ui/button";

export function DownloadButton() {
  const posthog = usePostHog();
  return (
    <Button
      asChild
      size='lg'
      variant='secondary'
      onClick={() => posthog.capture("download_app")}
      className='group rounded-2xl px-8 py-7 text-lg font-bold shadow-xl'>
      <a
        href='https://download.sudancodex.app/sudancodexv1.apk'
        download='sudancodex.apk'
        title='Download Sudan Codex Android App (APK)'
        aria-label='Download Sudan Codex Android App (APK)'
        rel='noopener noreferrer'>
        <Smartphone className='mr-2 h-6 w-6' />
        Get the App
        <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
      </a>
    </Button>
  );
}
