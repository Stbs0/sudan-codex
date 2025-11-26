import InfiniteScrollComponent from "@/components/drugList/infinate-scroll-component";
import SearchDrug from "@/components/drugList/search-drug-btn";
import TourBtn from "@/components/drugList/tour-btn";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drug List | Sudan Codex",
  description:
    "Explore Sudan Codex's extensive drug list, featuring detailed information on various medications available in Sudan. Search by generic names, brand names, manufacturers, and more.",
};

export default function DrugListPage() {
  return (
    <div className='mx-auto grid w-full gap-4 px-3 md:max-w-2xl dark:text-gray-100'>
      <div className='flex flex-col gap-2 py-2'>
        <TourBtn />
        <SearchDrug />
      </div>
      <ScrollToTopButton />

      <InfiniteScrollComponent />
    </div>
  );
}
