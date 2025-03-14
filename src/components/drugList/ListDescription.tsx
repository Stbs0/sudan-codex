interface ListDescriptionProps {
  title: string;
  text: string;
}
const ListDescription = ({ title, text }: ListDescriptionProps) => {
  return (
    <div className='text-sm'>
      <span className='font-semibold'>{title}: </span>
      <span className='text-gray-600 dark:text-gray-300'>{text}</span>
    </div>
  );
};

export default ListDescription;
