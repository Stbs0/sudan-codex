import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { SigninAndLogoutButtonOrProfilePic } from "./signin-and-logout-btn-or-profile-pic";

const Header = () => {
  return (
    <header className='bg-background flex h-16 items-center justify-between border-b p-3 shadow-sm'>
      <div className='flex items-center space-x-3'>
        <SidebarTrigger />
        <Logo />
      </div>
      <div className='flex items-center space-x-3'>
        <ModeToggle />
        <SigninAndLogoutButtonOrProfilePic />
      </div>
    </header>
  );
};

export default Header;
