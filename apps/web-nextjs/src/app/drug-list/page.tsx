import InfiniteScrollComponent from "@/components/drugList/infinate-scroll-component";
import SearchDrug from "@/components/drugList/search-drug-btn";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Drug List | Sudan Codex",
  description:
    "Explore Sudan Codex's extensive drug list, featuring detailed information on various medications available in Sudan. Search by generic names, brand names, manufacturers, and more.",
};

export default function DrugListPage() {
  console.log("first");
  return (
    <div className='mx-auto grid w-full gap-4 px-3 md:max-w-2xl dark:text-gray-100'>
      <div className='flex flex-col gap-2 py-2'>
        <SearchDrug />
      </div>
      <ScrollToTopButton />
      <Suspense
        fallback={[...Array(10)].map((_, index) => (
          <Skeleton
            key={index}
            className='w-full'
          />
        ))}>
        <InfiniteScrollComponent />
      </Suspense>
    </div>
  );
}
