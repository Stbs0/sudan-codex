import { SignUpForm } from "@/screens/auth/sign-up-form";
import { View } from "react-native";

export default function ModalScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <SignUpForm />
    </View>
  );
}
