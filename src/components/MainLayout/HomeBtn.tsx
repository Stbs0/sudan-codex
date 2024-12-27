// import TransparentLogo from "@/assets/logo/TransparentLogo";
import { useNavigate } from "react-router-dom";
export default function HomeBtn() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className='cursor-pointer text-2xl font-bold text-white'>
      {/* <TransparentLogo className='size-96' /> */}
    </div>
  );
}
