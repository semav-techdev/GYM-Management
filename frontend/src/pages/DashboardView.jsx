import { Users, UserCheck, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/axios";

export default function DashboardView() {
  const [dashboardStats, setDashboardStats] = useState({
    members: 0,
    staff: 0,
    equipment: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setDashboardStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    { title: "Total Members", value: dashboardStats.members, icon: UserCheck },
    { title: "Total Staff", value: dashboardStats.staff, icon: Users },
    { title: "Equipments", value: dashboardStats.equipment, icon: Dumbbell },
  ];

  return (
    <div className="min-h-screen relative">
      {/* overlay glow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-white text-5xl font-extrabold tracking-tight">
            Dashboard
          </h1>
          <p className="text-white/70 mt-3 text-lg">
            Welcome back, Admin 👋 Here’s your gym overview today.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="
                group
                relative
                rounded-3xl
                p-8
                bg-white/10
                border border-white/10
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                transition-all duration-300
                hover:scale-[1.03]
                hover:bg-white/15
                hover:border-red-400/40
              "
            >
              {/* icon */}
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-red-600/20 border border-red-500/30 shadow-lg">
                  <Icon size={28} className="text-red-400" />
                </div>
              </div>

              {/* value */}
              <div className="mt-6">
                <h2 className="text-4xl font-bold text-white">
                  {value}
                </h2>
                <p className="text-white/60 mt-2 text-sm tracking-wide">
                  {title}
                </p>
              </div>

              {/* glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-red-500/5 blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}