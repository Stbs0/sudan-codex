import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import { memo, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export const ModeToggle = memo(function ModeToggle() {
  const { setTheme } = useTheme();

  return useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className='shrink-0 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800'>
          <Button
            className='size-7'
            variant='outline'
            size='icon'>
            <Sun
              color='#fff'
              className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90'
            />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='border-purple-200'
          align='end'>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>{" "}
          <Separator />
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    [setTheme]
  );
});
