import { Stack } from "expo-router";
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

export default function DrugListLayout() {
  // const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ title: "Drug List" }}
      />

      <Stack.Screen
        name='[slug]'
        options={{ headerBackVisible: true }}
      />
    </Stack>
  );
}
