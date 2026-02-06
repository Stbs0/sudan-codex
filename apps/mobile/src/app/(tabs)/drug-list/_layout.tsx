import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
// const Tour = ({
//   tintColor,
// }: {
//   tintColor?: string | undefined;
//   canGoBack?: boolean | undefined;
// }) => {
//   return (
//     <Icon
//       className='mr-4 size-6'
//       color={tintColor}
//       as={Info}
//     />
//   );
// };
//
export const unstable_settings = {
  initial: "index",
};
export default function DrugListLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ title: t("drugList.title") }}
      />

      <Stack.Screen
        name='[slug]'
        options={{ headerBackVisible: true }}
      />
    </Stack>
  );
}
