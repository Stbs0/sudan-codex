import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const GenericInput = () => {
  const {
    fields: genericsFields,
    append: genericsFieldsAppend,
    remove: genericsFieldsRemove,
  } = useFieldArray({
    name: "generics",
  });
  const { append: strengthFieldsAppend, remove: strengthFieldsRemove } =
    useFieldArray({
      name: "strength",
    });
    
    
  return (
    <div className='border-l-2 border-neutral-500 px-2'>
      <FormLabel>Generic Name</FormLabel>
      {genericsFields.map((item, index) => {
        return (
          <FormField
            key={item.id}
            name={`generics.${index}.generic`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex'>
                    <Input
                      placeholder='Amocaln'
                      className='border-slate-500 w-40 mr-8'
                      {...field}
                    />
                    <div className=''>
                      {index === 0 ? (
                        <Button
                        type="button"
                          className='w-24 bg-blue-600 hover:bg-blue-700'
                          onClick={(e) => {
                            e.preventDefault();
                             strengthFieldsAppend(
                               {
                                 nominator: 0,
                                 denominator: 0,
                                 nominatorUnit: "mg",
                                 denominatorUnit: "ml",
                               },
                               { shouldFocus: false },
                             );
                            genericsFieldsAppend(
                              { generic: "" },
                              { focusIndex: index },
                            );
                            
                          }}>
                          Add more
                        </Button>
                      ) : null}{" "}
                      {index !== 0 && (
                        <Button

                          className='w-24'
                          variant={"destructive"}
                          onClick={(e) => {
                            e.preventDefault()
                            genericsFieldsRemove(index);
                            strengthFieldsRemove(index);
                          }}>
                          remove
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>

                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}

     
      <FormDescription>Add the Generic Name of the Drug</FormDescription>
    </div>
  );
};

export default GenericInput;
