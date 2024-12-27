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
  if (typeof content === "string") return null;

  return (
    <Accordion type='multiple'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{title.toUpperCase()}</AccordionTrigger>
        <AccordionContent className='max-w-l'>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DrugInfoAccordion;
