import { Drug } from "@sudan-codex/db";
import { CircleAlert } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
type Props = { title: string; property: Drug[keyof Drug]; path?: string };

const DrugPropertyDescription = ({
  title,
  property,
  path,
  ...props
}: Props) => {
  // FIXME: the icons arent aligned correcltty with the text

  if (path) {
    return (
      <div className='flex flex-col gap-1 border-l-2 border-blue-400 p-2'>
        <dt className='flex font-medium text-gray-500'>{title}</dt>
        <dd
          data-testid={title}
          className='flex'>
          <Link
            {...props}
            className='flex hover:underline'
            href={path as Route}>
            {String(property)}
          </Link>
          <CircleAlert
            className='ml-2 inline-block'
            size={16}
          />
        </dd>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-1 border-l-2 border-blue-400 p-2'>
      <dt className='font-medium text-gray-500'>{title}</dt>

      <dd data-testid={title}>{String(property)}</dd>
    </div>
  );
};
export default DrugPropertyDescription;
