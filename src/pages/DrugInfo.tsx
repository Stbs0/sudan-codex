import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DrugInfo = () => {
  const { state: drug } = useLocation();
  const [d, setd] = useState({});
  useEffect(() => {
    axios
      .post("http://localhost:1574/v1/drug", { name: drug.genericName })
      .then((res) => {
        setd(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(d);
  return <div>DrugInfo</div>;
};

export default DrugInfo;
