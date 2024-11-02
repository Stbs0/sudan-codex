import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Separator } from "../ui/separator";

const ProfilePic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.photoURL ?? undefined} />
          <AvatarFallback>
            {getInitials(user?.displayName || "")}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='w-28 p-0 '>
        <div className='grid '>
          <Button
            variant={"link"}
            className='w-full outline-none'>
            <Link to={"/profile"}>Profile</Link>
          </Button>
          <Separator />
          <Button variant={"link"}>
            <Link to={"/settings"}>Settings</Link>
          </Button>
          <Separator />
          <Button
            variant={"link"}
            className='text-red-500 '
            onClick={async () => {
              await signOut(auth);
              navigate("/log-in");
            }}>
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePic;
