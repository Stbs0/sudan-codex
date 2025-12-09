// import React, { useState } from "react";
// import { Button, View } from "react-native";
// import { Input } from "./ui/input";
// import { Text } from "./ui/text";

// const SearchDrugInfo = ({
//   handleSubmit,
//   generic,
// }: {
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>, route: string) => void;
//   generic: string;
// }) => {
//   const [route, setRoute] = useState("");
//   return (
//     <View className="flex flex-col gap-4">
//       <View className="flex flex-col gap-4">
//         <View className="flex justify-center gap-2 max-md:flex-col">
//           <View className="flex flex-col gap-2">
//             <Text>Search By Generic Name</Text>
//             <Input
//               placeholder="Enter generic name"
//               id="genericName"
//               defaultValue={generic}
//             />
//             <Text className="text-xs text-gray-500">
//               Hint: try deleting the salt name from the generic name
//             </Text>
//           </View>
//           <View className="flex flex-col gap-2">
//             <Text> Search By Route</Text>
//             {/* <AutoComplete
//               setRoute={setRoute}
//               options={DRUG_ROUTES}
//               route={route}
//             /> */}
//           </View>
//         </View>
//         <View className="flex justify-center">
//           <Button title="Search" />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SearchDrugInfo;

//  see https://github.com/Stbs0/sudancodex-mobile/pull/10#discussion_r2347246207
