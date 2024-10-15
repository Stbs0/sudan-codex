import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const ProfilePic = () => {
  const { user } = useAuth();
  return (
    <Avatar>
      <AvatarImage src={user?.photoURL ?? undefined} />
      <AvatarFallback>{getInitials(user?.displayName || "")}</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePic;
