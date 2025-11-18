import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import Logo from "./Logo";
import MobileAuthBtns from "./MobileAuthBtns";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants";

// export const AppSidebar = ({
//   ...props
// }: React.ComponentProps<typeof Sidebar>) => {
//   // const { setOpenMobile } = useSidebar();
//   return (
//     <Sidebar
//       {...props}
//       collapsible='offcanvas'>
//       <SidebarHeader className='flex items-center'>
//         <div className='flex justify-center p-2'>
//           <Link
//             // onClick={() => setOpenMobile(false)}
//             href='/'>
//             <Logo />
//           </Link>
//         </div>
//         <MobileAuthBtns />
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {NAV_ITEMS.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     // onClick={() => setOpenMobile(false)}
//                     asChild>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='offcanvas'
      {...props}>
      <SidebarHeader>
        <SidebarHeader className='flex items-center'>
          <div className='flex justify-center p-2'>
            <Link
              // onClick={() => setOpenMobile(false)}
              href='/'>
              <Logo />
            </Link>
          </div>
          <MobileAuthBtns />
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    // onClick={() => setOpenMobile(false)}
                    asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
