import { useNavigate } from "react-router-dom";
export default function HomeBtn() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className='text-2xl font-bold text-white cursor-pointer'>
      DrugWiki
    </div>
  );
}
