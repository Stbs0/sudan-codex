"use client";
import { Button } from "../ui/button";
import { Config, driver } from "driver.js";


function TourBtn() {
  // TODO: fix driver.js later
  // const driverConfig: Config = {
  //   showProgress: true,
  //   allowClose: true,

  //   allowKeyboardControl: true,
  //   disableActiveInteraction: true,
  //   steps: [
  //     {
  //       element: document.querySelectorAll("#drugInfo-card")[0], // Use the ID selector
  //       popover: {
  //         title: "This is a Drug Card",
  //         description: "Press on it to see more information about the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: document.querySelectorAll(
  //         " #drugInfo-card-brandName"
  //       )[0],
  //       popover: {
  //         title: "Brand Name",
  //         description: "This is the brand name of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-strength",
  //       popover: {
  //         title: "Strength",
  //         description: "This is the strength of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-dosageFormName",
  //       popover: {
  //         title: "Dosage Form",
  //         description: "This is the dosage form of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-packSize",
  //       popover: {
  //         title: "Pack Size",
  //         description: "This is the pack size of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-genericName",
  //       popover: {
  //         title: "Generic Name",
  //         description: "This is the generic name of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-agentName",
  //       popover: {
  //         title: "Agent Name",
  //         description:
  //           "This is the agent name of the drug. it refers to the compony that pack the drug, not the manufacturing of the API.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-companyName",
  //       popover: {
  //         title: "Company Name",
  //         description: "This is the company name of the drug.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //     {
  //       element: "#drugInfo-card #drugInfo-card-countryOfOrigin",
  //       popover: {
  //         title: "Country of Origin",
  //         description:
  //           "This is the country of origin of the drug. It is based on the company that manufacture the API.",
  //         side: "top",
  //         align: "center",
  //       },
  //     },
  //   ],
  // };
  const onStartTour = () => {
    // const driverObj = driver(driverConfig);
    // driverObj.drive();
    // return () => {
    //   driverObj.destroy();
    // };
  };
  // TODO: enable auto start tour on first visit either by checking drugList length or a tooltip on the tour button
  //   useEffect(() => {
  //     if (!drugList?.pages.length) return;
  //     const hasVisited = localStorage.getItem("hasVisited");
  //     if (hasVisited) return;

  //     const destroy = startTour();
  //     localStorage.setItem("hasVisited", "true");
  //     return destroy;
  //   }, [drugList?.pages.length, startTour]);
  return (
    <div className='flex justify-between gap-2'>
      <p className='text-center text-2xl'>Search Drug</p>
      <Button
        variant={"outline"}
        onClick={onStartTour}
        className='w-fit'>
        Guide me
      </Button>
    </div>
  );
}

export default TourBtn;
