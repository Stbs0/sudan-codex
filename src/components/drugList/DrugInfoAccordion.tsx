import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DrugInfoAccordion = ({
  title,
  content,
}: {
  title: string;
  content: string[];
}) => {
  return (
    <Accordion
      type='single'
      collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DrugInfoAccordion;
