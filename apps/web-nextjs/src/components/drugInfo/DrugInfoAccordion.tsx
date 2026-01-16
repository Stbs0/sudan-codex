import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { DrugInfo } from "@sudan-codex/db";
// const propToDelete = [
//   "spl_patient_package_insert",
//   "spl_patient_package_insert_table",
//   "spl_unclassified_section",
//   "spl_product_data_elements",
// ];

const DrugInfoAccordion = ({ data }: { data: DrugInfo }) => {
  // const keys = Object.keys(data)
  //   .filter((key) => Array.isArray(data[key]) && !propToDelete.includes(key))
  //   .sort((a, b) => a.localeCompare(b));
  console.log("data", data);
  return (
    <Accordion
      type='multiple'
      className='w-full'>
      <DrugAccordion
        trigger='Indications'
        content={data?.ind}
      />
      <DrugAccordion
        trigger='Classification'
        content={data?.clas}
      />
      <DrugAccordion
        trigger='Mechanism of Action'
        content={data?.mode}
      />
      <DrugAccordion
        trigger='Clinical use'
        content={data?.clinical}
      />
      <DrugAccordion
        trigger='Adult Dose'
        content={data?.adult}
      />
      <DrugAccordion
        trigger='Pediatric Dose'
        content={data?.ped}
      />
      <DrugAccordion
        trigger='Administration'
        content={data?.admin}
      />
      <DrugAccordion
        trigger='Contraindications'
        content={data?.contra}
      />
      <DrugAccordion
        trigger='Side Effects'
        content={data?.side}
      />
      <DrugAccordion
        trigger='Pregnancy'
        content={data?.prgnancy}
      />
      <DrugAccordion
        trigger='Major Interactions'
        content={data?.intermajer}
      />
      <DrugAccordion
        trigger='Minor Interactions'
        content={data?.interminor}
      />
    </Accordion>
  );
};
const DrugAccordion = ({
  trigger,
  content,
}: {
  trigger: string;
  content: string | undefined | null;
}) => {
  const html = content || `<p><i>No Data Available</i></p>`;
  return (
    <AccordionItem
      key={trigger}
      value={trigger}>
      <AccordionTrigger>
        <p>{trigger.toUpperCase()}</p>
      </AccordionTrigger>
      <AccordionContent className=''>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </AccordionContent>
    </AccordionItem>
  );
};
export default DrugInfoAccordion;
