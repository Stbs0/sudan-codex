import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api-client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "./ui/text";
type ViewCountProps = {
  id: number;
  createdAt: string;
  updatedAt: string;
  url:
    | "/api/v1/agents/:slug/:id/view"
    | "/api/v1/generics/:slug/:id/view"
    | "/api/v1/companies/:slug/:id/view"
    | "/api/v1/drugs/:slug/:id/view";
  slug: string;
};

const ViewCount = ({ id, createdAt, updatedAt, url, slug }: ViewCountProps) => {
  const { t } = useTranslation();
  return (
    <View className='flex gap-2'>
      <Text className='text-muted-foreground text-sm'>
        {t("stats.table.headers.addedOn")}: {createdAt.split("T")[0]}
      </Text>
      <Text className='text-muted-foreground text-sm'>
        {t("stats.table.headers.lastUpdated")}: {updatedAt.split("T")[0]}
      </Text>
      <Suspense fallback={<Skeleton className='h-4 w-24' />}>
        <Count
          id={id}
          url={url}
          slug={slug}
        />
      </Suspense>
    </View>
  );
};

const Count = ({
  id,
  url,
  slug,
}: Pick<ViewCountProps, "id" | "url" | "slug">) => {
  const { t } = useTranslation();
  const { data } = useSuspenseQuery({
    queryKey: ["view-count", id, url, slug],
    queryFn: () => fetchCount({ url, id, slug }),
  });

  return (
    <Text className='text-muted-foreground text-sm'>
      {t("stats.table.headers.viewCount")}: {data.view_count}
    </Text>
  );
};
export default ViewCount;

const fetchCount = async ({
  url,
  id,
  slug,
}: {
  url: ViewCountProps["url"];
  id: number;
  slug: string;
}): Promise<{ view_count: number }> => {
  const res = await api(url, {
    cache: "no-store",
    params: { slug, id: String(id) },
  });
  if (res.error) {
    throw Error("view count error" + res.error.message);
  }
  return res.data;
};
