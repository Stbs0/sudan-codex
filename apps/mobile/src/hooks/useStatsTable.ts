import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { usePostHog } from "posthog-react-native";
import { useEffect, useState } from "react";
import { toast } from "sonner-native";

export const useStatsTable = ({
  slug,
  url,
  qKey,
}: {
  slug: string;
  url: Parameters<typeof api>[0];
  qKey: string;
}) => {
  const [sorting, setSorting] = useState<SortingState>(() => [
    { id: "brand_name", desc: false },
  ]);
  const posthog = usePostHog();
  const { data, error, isFetching } = useQuery({
    queryKey: ["stats", qKey, slug],
    queryFn: async () => {
      const res = await api(url, {
        params: { slug },
      });
      if (res.error) {
        throw new Error("Failed to fetch drug info");
      }
      return res.data;
    },
  });

  useEffect(() => {
    if (!error) return;
    toast.error("Failed to fetch drug info");
    console.error(error);

    posthog.captureException(error, {
      properties: {
        api: url,
        tanstackQueryKey: qKey,
        slug,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, posthog]);

  return { data, error, isFetching, sorting, setSorting };
};
