import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useModal } from "@/hooks/useModal";
import { Modal, Pressable, View } from "react-native";

const CardModal = () => {
  const { modalData, open, setOpen } = useModal();
  if (!modalData) return null;
  const {
    agent_name,
    brand_name,
    company_name,
    country_name,

    dosage_form,
    generic_name,
    pack_size,
    strength,
  } = modalData;
  return (
    <Modal
      animationType='fade'
      visible={open}
      onRequestClose={() => setOpen(false)}
      transparent>
      <Pressable
        onPress={() => setOpen(false)}
        className='mx-2 flex-1 items-center justify-center bg-black/80'>
        <Card className='rounded-none border-2 py-2 shadow-md shadow-black'>
          <CardContent className='gap-1'>
            <View className='gap-1'>
              <View className='flex-row'>
                <Text>
                  <Text className='font-extrabold text-neutral-700 dark:text-blue-200'>
                    {(brand_name || "No Available Data") +
                      " " +
                      (strength || "No Available Data")}
                  </Text>
                  <Text className='font-bold'> — </Text>
                  <Text className='text-rose-500 dark:text-rose-400'>
                    {pack_size || "No Available Data"}
                  </Text>
                </Text>
              </View>
              <View className='gap-1 text-sm font-bold'>
                <Text>
                  <Text className='font-extrabold text-green-500 dark:text-green-400'>
                    {generic_name || "No Available Data"}
                  </Text>
                  <Text className='text-sm font-bold'> — </Text>
                  <Text className='font-bold text-blue-700 dark:text-blue-400'>
                    {dosage_form || "No Available Data"}
                  </Text>
                </Text>
              </View>
            </View>

            <View className='items-start gap-1'>
              <Text className='text-sm font-bold text-pink-700 dark:text-pink-400'>
                {company_name || "No Available Data"}
              </Text>
              <Text className='text-sm font-bold text-orange-700 dark:text-orange-400'>
                {agent_name || "No Available Data"}
              </Text>
              <Text className='text-sm font-bold text-violet-500 dark:text-violet-400'>
                {country_name || "No Available Data"}
              </Text>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Modal>
  );
};

export default CardModal;
