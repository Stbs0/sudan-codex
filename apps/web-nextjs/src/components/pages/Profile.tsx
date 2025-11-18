// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/hooks/useAuth";
// import { auth } from "@/lib/firebase";
// import { useUpdateUser } from "@/lib/queryQlient";
// import { UpdateUserSchemaType, updateUserSchema } from "@/lib/schemas";
// import { getInitials } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { validatePassword } from "firebase/auth";
// import { useForm } from "react-hook-form";

// export default function Profile() {
//   const { data: user } = useAuth();
//   const mutate = useUpdateUser();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, dirtyFields },
//   } = useForm({
//     defaultValues: {
//       name: user?.displayName,
//       email: user?.email,
//       password: "",
//       confirmPassword: "",
//     },
//     mode: "onSubmit",
//     resolver: zodResolver(updateUserSchema),
//   });
//   const onSubmit = async (data: UpdateUserSchemaType) => {
//     // if (data.currentPassword) {
//     //   const status = await validatePassword(auth, data.currentPassword);
//     //   status.isValid ?
//     // }
//     const touchedFields = {};
//     for (const key in dirtyFields) {
//       // @ts-expect-error i dont care
//       touchedFields[key] = data[key];
//     }
//     mutate(touchedFields);
//   };

//   return (
//     <main>
//       <div className='space-y-6 px-4 sm:px-6'>
//         <div className='space-y-2'>
//           <div className='flex items-center space-x-3'>
//             <Avatar className='h-16 w-16'>
//               <AvatarImage
//                 src={user?.photoURL || ""}
//                 alt='profile'
//               />
//               <AvatarFallback>
//                 {getInitials(user?.displayName || "")}
//               </AvatarFallback>
//             </Avatar>

//             <div className='space-y-1'>
//               <h1 className='text-2xl font-bold dark:text-gray-100'>
//                 {user?.displayName}
//               </h1>
//             </div>
//           </div>
//         </div>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className='space-y-8'>
//           <Card className='p-3'>
//             <CardContent className='flex flex-col gap-4'>
//               <div className='space-y-2'>
//                 <Label htmlFor='name'>Name</Label>
//                 <Input
//                   id='name'
//                   {...register("name")}
//                   placeholder={user?.displayName as string}
//                 />
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='email'>Email</Label>
//                 <Input
//                   id='email'
//                   {...register("email")}
//                   placeholder={user?.email as string}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className='p-3'>
//             <CardHeader>
//               <h2 className='text-2xl font-semibold'>Change Password</h2>
//             </CardHeader>
//             <CardContent className='space-y-4'>
//               <div className='space-y-2'>
//                 <Label htmlFor='new-password'>New Password</Label>
//                 <Input
//                   {...register("password")}
//                   type='password'
//                   id='new-password'
//                 />
//                 {errors.password && (
//                   <p className='text-red-500'>{errors.password.message}</p>
//                 )}
//               </div>
//               <div className='space-y-2'>
//                 <Label htmlFor='confirm-password'>Confirm Password</Label>
//                 <Input
//                   {...register("confirmPassword")}
//                   type='password'
//                   id='confirm-password'
//                 />
//                 {errors.confirmPassword && (
//                   <p className='text-red-500'>
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//           <div className='flex justify-center'>
//             <Button
//               className=''
//               disabled={isSubmitting}>
//               Save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
