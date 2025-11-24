import DrugList from "@/components/drugList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drug List | Sudan Codex",
  description:
    "Explore Sudan Codex's extensive drug list, featuring detailed information on various medications available in Sudan. Search by generic names, brand names, manufacturers, and more.",
};

export default function DrugListPage() {
  return (
    <div className='mx-auto grid w-full gap-4 px-3 md:max-w-2xl dark:text-gray-100'>
      <DrugList />
    </div>
  );
}
