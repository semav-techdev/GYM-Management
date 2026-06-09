import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import background from "../../../public/background.png";

export function MainLayout() {
  return (
    <div
      className="relative flex min-h-screen w-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* dark overlay */}

      <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "18.75rem" }}>
        <div className="relative z-10 flex min-h-screen w-full">
          <AppSidebar />
          <main className="h-screen min-w-0 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
