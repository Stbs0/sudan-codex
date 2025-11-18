import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
const propToDelete = [
  "spl_patient_package_insert",
  "spl_patient_package_insert_table",
  "spl_unclassified_section",
  "spl_product_data_elements",
];

const DrugInfoAccordion = ({ data }: { data: Record<string, string[]> }) => {
  const keys = Object.keys(data)
    .filter((key) => Array.isArray(data[key]) && !propToDelete.includes(key))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Accordion
      type='multiple'
      className='w-full'>
      {keys.map((key, index) => {
        return (
          <AccordionItem
            key={index}
            value={`item-${index}`}>
            <AccordionTrigger>
              {key.replace(/_/g, " ").toUpperCase()}
            </AccordionTrigger>
            <AccordionContent>
              <p>{data[key]}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
  //  Object.keys(data).map((key) => (
  //             <DrugInfoAccordion
  //               key={key}
  //               title={key.replace(/_/g, " ")}
  //               content={data[key]}
  //             />
  //           ))
  // if (typeof content === "string") return null;

  // return (
  //   <Accordion type='multiple'>
  //     <AccordionItem value='item-1'>
  //       <AccordionTrigger>{title.toUpperCase()}</AccordionTrigger>
  //       <AccordionContent className='max-w-l'>{content}</AccordionContent>
  //     </AccordionItem>
  //   </Accordion>
  // );
};

export default DrugInfoAccordion;
