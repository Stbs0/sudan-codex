import { api } from "@/lib/api-client";
import {
  type AgentApiResponseType,
  type CompanyApiResponseType,
  type GenericApiResponseType,
} from "@sudan-codex/db/schema";
import { useQuery } from "@tanstack/react-query";
import { type SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner-native";

type StatsRoute =
  | "/api/agents/:slug"
  | "/api/companies/:slug"
  | "/api/generics/:slug";

type RouteOutputMap = {
  "/api/agents/:slug": AgentApiResponseType;
  "/api/companies/:slug": CompanyApiResponseType;
  "/api/generics/:slug": GenericApiResponseType;
};

export const useStatsTable = <TRoute extends StatsRoute>({
  slug,
  url,
  qKey,
}: {
  slug: string;
  url: TRoute;
  qKey: string;
}) => {
  const [sorting, setSorting] = useState<SortingState>(() => [
    { id: "brand_name", desc: false },
  ]);
  const { data, error, isFetching } = useQuery({
    queryKey: ["stats", qKey, slug],
    queryFn: async (): Promise<RouteOutputMap[TRoute]> => {
      let res;
      if (url === "/api/agents/:slug") {
        res = await api("/api/agents/:slug", { params: { slug } });
      } else if (url === "/api/companies/:slug") {
        res = await api("/api/companies/:slug", { params: { slug } });
      } else if (url === "/api/generics/:slug") {
        res = await api("/api/generics/:slug", { params: { slug } });
      } else {
        throw new Error("Invalid stats route");
      }

      if (res.error) {
        throw new Error("Failed to fetch drug info");
      }
      return res.data as RouteOutputMap[TRoute];
    },
  });

  useEffect(() => {
    if (!error) return;
    toast.error("Failed to fetch drug info");
    console.error(error);
  }, [error]);

  return { data, error, isFetching, sorting, setSorting };
};
