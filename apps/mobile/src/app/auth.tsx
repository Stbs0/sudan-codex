import { View } from "react-native";

import { SignUpForm } from "@/screens/auth/sign-up-form";

export default function ModalScreen() {
  return (
    <View className='bg-background flex-1'>
      <SignUpForm />
    </View>
  );
}
