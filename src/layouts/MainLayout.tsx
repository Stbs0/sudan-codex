
import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Footer from "@/components/MainLayout/Footer";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Toaster } from "sonner";
import {
  SidebarInset,
  SidebarProvider,
  
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/MainLayout/app-sidebar";

const MainLayout = () => {
  const { loading } = useAuth();

  return (
    <SidebarProvider defaultOpen={false}>
      {loading && <SpinnerOverlay />}
      <AppSidebar />
      <SidebarInset className='   dark:bg-gray-900 dark:text-white  '>
        <Header />
        <main className=' grid p-8 h-full '>
          <Outlet />
        </main>
        <Toaster
          richColors
          expand={true}
          closeButton
        />
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
