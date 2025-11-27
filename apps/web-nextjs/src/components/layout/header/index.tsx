import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { SigninAndLogoutButtonOrProfilePic } from "./signin-and-logout-btn-or-profile-pic";

const Header = () => {
  return (
    <header className='bg-background relative flex h-16 items-center justify-between border-b p-3 shadow-sm'>
      <div className='z-10 flex items-center space-x-3'>
        <SidebarTrigger />
      </div>

      <div className='absolute left-1/2 -translate-x-1/2'>
        <Logo />
      </div>

      <div className='z-10 flex items-center space-x-3'>
        <ModeToggle />
        <SigninAndLogoutButtonOrProfilePic />
      </div>
    </header>
  );
};

export default Header;
