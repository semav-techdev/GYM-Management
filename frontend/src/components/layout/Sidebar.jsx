import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Dumbbell,
} from "lucide-react"

import { useNavigate, useLocation } from "react-router-dom"
import useAuthStore from "../../stores/authStore"
import logo from "../../../public/logo.png"
const navItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Staff",
    id: "staffs",
    icon: Users,
  },
  {
    title: "Members",
    id: "members",
    icon: UserCheck,
  },
  {
    title: "Equipment",
    id: "equipments",
    icon: Dumbbell,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore(
    (state) => state.logout
  )

  return (
    <Sidebar
      className="
      w-75
      h-screen
      fixed
      left-0
      top-0
      border-none
      bg-black/30
      backdrop-blur-lg
      "
    >
      {/* Logo */}
      <div className="flex flex-col items-center py-8">
        <img
          src={logo}
          className="w-48"
        />

        <span className="text-red-400 text-sm tracking-[3px]">
          STRONGER EVERY DAY
        </span>
      </div>

      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-5 space-y-5">
              {navItems.map(
                ({
                  title,
                  id,
                  icon: Icon,
                }) => {
                  const active =
                    location.pathname ===
                    `/${id}`

                  return (
                    <SidebarMenuItem
                      key={id}
                    >
                      <button
                        onClick={() =>
                          navigate(`/${id}`)
                        }
                        className={`
                          w-full
                          flex
                          items-center
                          gap-4
                          px-6
                          py-4
                          rounded-full
                          transition-all
                          text-lg
                          cursor-pointer
                          ${
                            active
                              ? "bg-red-400 text-white"
                              : "text-white/80 hover:bg-white/10"
                          }
                        `}
                      >
                        <Icon size={28} />

                        {title}
                      </button>

                      {!active && (
                        <div className="border-b border-white/10 mt-4"></div>
                      )}
                    </SidebarMenuItem>
                  )
                }
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <button
          onClick={logout}
          className="
          w-full
          bg-gray-200
          py-4
          rounded-full
          text-red-700
          text-xl
          font-bold
          hover:scale-105
          transition
          cursor-pointer
          "
        >
          LOG OUT
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}