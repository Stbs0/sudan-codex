"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "../../ui/sidebar";
import SigninAndLogoutButton from "./SigninAndLogoutButton";

const MobileAuthBtns = () => {
  const { user } = useAuth();
  const { isMobile } = useSidebar();
  return (
    <div className='flex items-center justify-between gap-2 p-2'>
      {!user && isMobile ? <SigninAndLogoutButton /> : null}
    </div>
  );
};

export default MobileAuthBtns;
