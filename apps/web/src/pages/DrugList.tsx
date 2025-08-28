import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ListItem } from "@/components/drugList/ListItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { type Config, driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const driverConfig: Config = {
  showProgress: true,
  allowClose: false,

  allowKeyboardControl: true,
  disableActiveInteraction: true,
  steps: [
    {
      element: "#drugInfo-card", // Use the ID selector
      popover: {
        title: "This is a Drug Card",
        description: "Press on it to see more information about the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-brandName",
      popover: {
        title: "Brand Name",
        description: "This is the brand name of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-strength",
      popover: {
        title: "Strength",
        description: "This is the strength of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-dosageFormName",
      popover: {
        title: "Dosage Form",
        description: "This is the dosage form of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-packSize",
      popover: {
        title: "Pack Size",
        description: "This is the pack size of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-genericName",
      popover: {
        title: "Generic Name",
        description: "This is the generic name of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-agentName",
      popover: {
        title: "Agent Name",
        description:
          "This is the agent name of the drug. it refers to the compony that pack the drug, not the manufacturing of the API.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-companyName",
      popover: {
        title: "Company Name",
        description: "This is the company name of the drug.",
        side: "top",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card #drugInfo-card-countryOfOrigin",
      popover: {
        title: "Country of Origin",
        description:
          "This is the country of origin of the drug. It is based on the company that manufacture the API.",
        side: "top",
        align: "center",
      },
    },
  ],
};
const DrugList = () => {
  const [search, setSearch] = useState("");
  const { loadMore, hasMore, drugList } = useInfiniteScroll(search);

  const firstCardRef = useRef(null); // Ref for the first card
  // const [isTourActive, setIsTourActive] = useState(false);

  const startTour = useCallback(() => {
    const driverObj = driver(driverConfig);
    driverObj.drive();
    return () => {
      driverObj.destroy();
    };
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited && firstCardRef.current) {
      const driverDestroy = startTour();
      localStorage.setItem("hasVisited", "true");
      return () => {
        driverDestroy();
      };
    }
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  const memoizedLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return (
    <>
      <title>Drug List | Sudan Codex</title>
      <meta
        name='description'
        content='Search for drugs by generic, brand, or company name in the Sudan Codex database.'
      />
      <div className='mx-auto grid w-full gap-4 px-3 md:max-w-2xl dark:text-gray-100'>
        <div className='flex flex-col gap-2 py-2'>
          <div className='flex justify-between gap-2'>
            <p className='text-center text-2xl'>Search Drug</p>
            <Button
              variant={"outline"}
              onClick={startTour}
              className='w-fit'>
              Guide me
            </Button>
          </div>
          <Input
            className='bg- rounded-3xl shadow-md placeholder:text-xs'
            placeholder='Search Generic, Brand, or Company Name'
            value={search}
            onChange={handleSearchInput}
          />
        </div>
        <ScrollToTopButton />
        <InfiniteScroll
          className='grid gap-4'
          dataLength={drugList ? drugList.length : 0}
          next={memoizedLoadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}>
          {drugList
            ? drugList.map((drug, index) => (
                <ListItem
                  key={drug.no}
                  drug={drug}
                  ref={index === 0 ? firstCardRef : null}
                />
              ))
            : [...Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  className='h-full w-full'
                />
              ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default DrugList;
