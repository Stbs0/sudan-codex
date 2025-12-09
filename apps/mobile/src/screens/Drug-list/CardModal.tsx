import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useModal } from "@/hooks/useModal";
import { Modal, Pressable, View } from "react-native";

const CardModal = () => {
  const { modalData, open, setOpen } = useModal();
  if (!modalData) return null;
  const {
    agentName,
    brandName,
    companyName,
    countryOfOrigin,
    dosageFormName,
    genericName,
    packSize,
    strength,
  } = modalData;
  return (
    <Modal
      animationType="fade"
      visible={open}
      onRequestClose={() => setOpen(false)}
      transparent
    >
      <Pressable
        onPress={() => setOpen(false)}
        className="flex-1 items-center justify-center bg-black/80 mx-2"
      >
        <Card className=" py-2 rounded-none border-2 shadow-black shadow-md">
          <CardContent className="gap-1">
            <View className="gap-1   ">
              <View className="flex-row ">
                <Text>
                  <Text className=" font-extrabold text-neutral-700   dark:text-blue-200  ">
                    {(brandName || "No Available Data") +
                      " " +
                      (strength || "No Available Data")}
                  </Text>
                  <Text className="font-bold"> — </Text>
                  <Text className="dark:text-rose-400 text-rose-500">
                    {packSize || "No Available Data"}
                  </Text>
                </Text>
              </View>
              <View className=" gap-1 font-bold text-sm ">
                <Text>
                  <Text className="dark:text-green-400 text-green-500 font-extrabold">
                    {genericName || "No Available Data"}
                  </Text>
                  <Text className="font-bold text-sm "> — </Text>
                  <Text className="font-bold dark:text-blue-400 text-blue-700">
                    {dosageFormName || "No Available Data"}
                  </Text>
                </Text>
              </View>
            </View>

            <View className="items-start gap-1 ">
              <Text className="text-sm font-bold dark:text-pink-400 text-pink-700">
                {companyName}
              </Text>
              <Text className="text-sm font-bold dark:text-orange-400 text-orange-700">
                {agentName}
              </Text>
              <Text className="text-sm font-bold dark:text-violet-400 text-violet-500">
                {countryOfOrigin}
              </Text>
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </Modal>
  );
};

export default CardModal;
