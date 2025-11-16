// import { cn } from "@/lib/utils";
// import { X } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
// import { useState } from "react";
// import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
// const DevAlert = () => {
//   const [show, setShow] = useState(true);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className='fixed right-4 bottom-4 z-50 w-80'
//           initial={{
//             opacity: 0,
//             translateX: 200,
//           }}
//           animate={{
//             opacity: 1,
//             translateX: 0,
//             transition: { duration: 0.5, delay: 0.5 },
//           }}
//           exit={{ opacity: 0, translateX: 200, transition: { duration: 0.5 } }}>
//           <Alert
//             variant='default'
//             className={cn("bg-yellow-100")}>
//             <AlertTitle className='flex justify-between'>
//               Heads up!
//               <X
//                 className='h-4 w-4 cursor-pointer'
//                 onClick={() => {
//                   setShow(false);
//                 }}
//               />
//             </AlertTitle>
//             <AlertDescription>
//               This website is still in development; some features may not work
//               as expected.
//             </AlertDescription>
//           </Alert>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DevAlert;
