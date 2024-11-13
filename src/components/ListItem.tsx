import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Drug } from "@/types/types";
import { Button } from "./ui/button";
type Props = {
  drug: Drug;
};
export const ListItem = ({ drug }: Props) => {
  return (
    <Card
      className=' bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: 'url("src/assets/bg/listBg.png")' }}>
      <CardHeader>
        <CardTitle>
          <span>{drug.brandName}</span>
          <span className='ml-2 font-normal'>{drug.strength}</span>
          <span className='ml-1 font-normal'></span>
          <span className='ml-1 font-normal'> {drug.dosageFormName}</span>
        </CardTitle>
        <CardContent className='p-0 pt-2  flex'>
          <div className='flex-1'>
            <div>Generic Name: {drug.genericName}</div>
            <div>{drug.companyName}</div>
            <div>{drug.countryOfOrigin}</div>
          </div>
          <div>
            <Button>Info</Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
