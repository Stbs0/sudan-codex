import { Card, CardContent } from "@/components/ui/card";
import { getDrugs } from "@/services/drugServices";
import { useEffect, useState } from "react";

const DrugList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const drugsSnapshot = await getDrugs();
      const arr = [];
      drugsSnapshot.forEach((item) => {
        arr.push(item.data());
      });
      setData(arr);
    };
    getData();
  }, []);
  console.log(data);
  return (
    <div className='w-full'>
      <div>
        <div>Drug List</div>
        <Card>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrugList;
