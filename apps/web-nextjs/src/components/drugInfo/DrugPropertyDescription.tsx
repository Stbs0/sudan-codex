type Props = { title: string; property: string };

const DrugPropertyDescription = ({ title, property }: Props) => {
  return (
    <div className='flex flex-col gap-1 border-l-2 border-blue-400 p-2'>
      <dt className='font-medium text-gray-500'>{title}</dt>
      <dd>{property}</dd>
    </div>
  );
};

export default DrugPropertyDescription;
