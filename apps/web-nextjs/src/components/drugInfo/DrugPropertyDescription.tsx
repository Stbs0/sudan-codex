import { Drug } from "@sudan-codex/db";
import { Route } from "next";
import Link from "next/link";
type Props = { title: string; property: Drug[keyof Drug]; path?: string };

const DrugPropertyDescription = ({
  title,
  property,
  path,
  ...props
}: Props) => {
  const content = (
    <div className='flex flex-col gap-1 border-l-2 border-blue-400 p-2'>
      <dt className='font-medium text-gray-500'>{title}</dt>
      <dd>{String(property)}</dd>
    </div>
  );

  if (path) {
    return (
      <Link
        {...props}
        className='hover:underline'
        href={path as Route}>
        {content}
      </Link>
    );
  }

  return content;
};
export default DrugPropertyDescription;
