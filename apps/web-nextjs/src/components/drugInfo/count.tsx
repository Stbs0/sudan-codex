import { useSuspenseQuery } from "@tanstack/react-query";

import type { ViewCountProps } from "./view-count";

export const Count = ({
  id,
  entity,
  slug,
}: Pick<ViewCountProps, "id" | "entity" | "slug">) => {
  const { data } = useSuspenseQuery({
    queryKey: ["viewCount", entity, id, slug],
    queryFn: () => fetchCount({ entity, id, slug }),
    gcTime: 0,
  });

  return (
    <p className='text-muted-foreground text-sm'>
      View count: {data.view_count}
    </p>
  );
};
const fetchCount = async ({
  entity,
  id,
  slug,
}: {
  entity: ViewCountProps["entity"];
  id: number;
  slug: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(
    `${baseUrl}/api/v1/${entity}/${slug}/${id.toString()}/view`
  );
  if (!res.ok) {
    throw new Error("view count error " + res.status);
  }
  return (await res.json()) as { view_count: null | number };
};
