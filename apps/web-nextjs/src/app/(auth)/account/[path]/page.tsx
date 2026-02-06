import {
  AuthLoading,
  SecuritySettingsCards,
  SignedIn,
} from "@daveyplate/better-auth-ui";
import { accountViewPaths } from "@daveyplate/better-auth-ui/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { AccountSettingsCards } from "@/components/auth/account-field-update";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const dynamicParams = false;
const validPaths = [accountViewPaths.SETTINGS, accountViewPaths.SECURITY];
export function generateStaticParams() {
  return validPaths.map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <>
      <AuthLoading>
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader>
            <Skeleton className='h-6 w-1/3' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent className='space-y-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-3/4' />
          </CardContent>
        </Card>
      </AuthLoading>
      <SignedIn>
        <div
          className={cn(
            "flex w-full grow flex-col gap-2 md:flex-row md:gap-12"
          )}>
          <div className='flex justify-between gap-2 md:hidden'>
            <Label className='text-base font-semibold'>
              {validPaths.find((i) => i === path)}
            </Label>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='outline'>
                  <MenuIcon />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className='hidden'>settings</DrawerTitle>
                </DrawerHeader>
                <div className='flex flex-col px-4 pb-4'>
                  {validPaths.map((item) => (
                    <Link
                      key={item}
                      href={`/account/${item}`}>
                      <Button
                        size='lg'
                        className={cn(
                          "w-full justify-start px-4 transition-none",
                          path === item ? "font-semibold" : "text-foreground/70"
                        )}
                        variant='ghost'>
                        {item}
                      </Button>
                    </Link>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className='hidden md:block'>
            <div className={cn("flex w-48 flex-col gap-1 lg:w-60")}>
              {validPaths.map((item) => (
                <Link
                  key={item}
                  href={`/account/${item}`}>
                  <Button
                    size='lg'
                    className={cn(
                      "w-full justify-start px-4 transition-none",
                      path === item ? "font-semibold" : "text-foreground/70"
                    )}
                    variant='ghost'>
                    {item}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex w-full items-center justify-center py-8 pr-4'>
            {path === accountViewPaths.SETTINGS ? (
              <AccountSettingsCards />
            ) : (
              <SecuritySettingsCards />
            )}
          </div>
        </div>
      </SignedIn>
    </>
  );
}
