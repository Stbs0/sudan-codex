import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>something went wrong</p>

      <Button onClick={() => navigate(-1)}> Go back</Button>
    </div>
  );
};

export default ErrorElement;
