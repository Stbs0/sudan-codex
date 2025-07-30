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
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "@/constants";
import Logo from "./Logo";
import MobileAuthBtns from "./MobileAuthBtns";

export const AppSidebar = () => {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center'>
        <div className='flex w-full items-center justify-between space-x-2 p-2'>
          <Link
            onClick={() => setOpenMobile(false)}
            to='/'
            className='flex items-center'>
            <Logo className='h-8' />
          </Link>
          <SidebarTrigger className='ml-auto' />
        </div>
        <MobileAuthBtns />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setOpenMobile(false)}
                    asChild>
                    <Link to={item.url}>
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
      <SidebarRail />
    </Sidebar>
  );
};
