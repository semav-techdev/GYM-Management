import { Users, UserCheck, Dumbbell } from "lucide-react"

export default function DashboardView() {
  const stats = [
    { title: "Total Members", value: "326", icon: UserCheck },
    { title: "Total Staff", value: "425", icon: Users },
    { title: "Equipments", value: "528", icon: Dumbbell },
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
    >
      {/* red overlay */}
      <div className="absolute inset-0 bg-red-950/70"></div>

      {/* Main content */}
      <div className="relative z-10 ml-10 pt-20 px-10">
        <h1 className="text-white text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-white/80 mt-4 text-xl">
          welcome back, Admin! 👋
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
          {stats.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="
                bg-[#d2b1b1]/80
                rounded-3xl
                px-10
                py-8
                backdrop-blur-md
                shadow-xl
                flex
                flex-col
                justify-center
                gap-8
              "
            >
              <div className="flex items-center gap-4">
                <Icon
                  size={35}
                  className="text-black"
                />

                <span className="font-bold text-2xl">
                  {title}
                </span>
              </div>

              <h2 className="text-center text-6xl font-bold">
                {value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
