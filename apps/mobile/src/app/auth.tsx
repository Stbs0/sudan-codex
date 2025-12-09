import { SignUpForm } from "@/screens/auth/sign-up-form";
import { View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="items-center justify-center flex-1">
      <SignUpForm />
    </View>
  );
}
