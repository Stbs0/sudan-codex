"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "../../ui/sidebar";
import SigninAndLogoutButton from "./SigninAndLogoutButton";

const MobileAuthBtns = () => {
  const { data } = useAuth();
  const { isMobile } = useSidebar();
  return (
    <div className='flex items-center justify-between gap-2 p-2'>
      {!data && isMobile ? <SigninAndLogoutButton /> : null}
    </div>
  );
};

export default MobileAuthBtns;
