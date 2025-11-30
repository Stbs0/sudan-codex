"use client";
import { Config, driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
const driverConfig: Config = {
  showProgress: true,
  allowClose: true,

  allowKeyboardControl: true,
  disableActiveInteraction: true,
  steps: [
    {
      element: "#drugInfo-card",
      popover: {
        title: "This is a Drug Card",
        description: "Press on it to see more information about the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-brandName",
      popover: {
        title: "Brand Name",
        description: "This is the brand name of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-strength",
      popover: {
        title: "Strength",
        description: "This is the strength of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-dosageFormName",
      popover: {
        title: "Dosage Form",
        description: "This is the dosage form of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-packSize",
      popover: {
        title: "Pack Size",
        description: "This is the pack size of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-genericName",
      popover: {
        title: "Generic Name",
        description: "This is the generic name of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-agentName",
      popover: {
        title: "Agent Name",
        description:
          "This is the agent name of the drug. It refers to the company that packs the drug, not the manufacturer of the API.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-companyName",
      popover: {
        title: "Company Name",
        description: "This is the company name of the drug.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#drugInfo-card-countryOfOrigin",
      popover: {
        title: "Country of Origin",
        description:
          "This is the country of origin of the drug. It is based on the company that manufacture the API.",
        side: "bottom",
        align: "center",
      },
    },
  ],
};
function TourBtn() {
  const startTour = useCallback(() => {
    // Check if the first card element exists before starting the tour
    const firstCardElement = document.querySelector("#drugInfo-card");
    if (!firstCardElement) {
      toast.info("No drug cards available to start the tour.");
      return () => {}; // Return a no-op cleanup function
    }

    const driverObj = driver(driverConfig);
    driverObj.drive();
    return () => {
      driverObj.destroy();
    };
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) return;
    const destroy = startTour();
    localStorage.setItem("hasVisited", "true");

    return destroy;
  }, [startTour]);

  const onStartTourClick = () => {
    localStorage.setItem("hasVisited", "true");
    startTour();
  };
  return (
    <Button
      variant={"outline"}
      onClick={onStartTourClick}
      className='w-fit'>
      Guide me
    </Button>
  );
}

export default TourBtn;
