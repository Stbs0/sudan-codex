import { SignUpForm } from "@/screens/auth/sign-up-form";
import { View } from "react-native";

export default function ModalScreen() {
  return (
    <View className='bg-background flex-1'>
      <SignUpForm />
    </View>
  );
}
