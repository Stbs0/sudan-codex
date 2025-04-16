import { useAuth } from "@/hooks/useAuth";
import SigninAndLogoutButton from "./SigninAndLogoutButton";
import { useSidebar } from "../ui/sidebar";

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
