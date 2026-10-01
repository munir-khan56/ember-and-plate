import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function AdminNavbar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth()

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "menu", label: "Menu Management" },
    { id: "reservations", label: "Reservations" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#F4EFE7]/10 bg-[#0E0E0D]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-['Playfair_Display'] text-xl tracking-wide text-[#F4EFE7]"
          >
            EMBER <span className="text-[#B96843]">&</span> PLATE
          </Link>
          <span className="rounded bg-[#B96843]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A66B] ring-1 ring-[#C9A66B]/30">
            Admin Portal
          </span>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "bg-[#B96843] text-white"
                    : "text-[#9C978F] hover:bg-white/5 hover:text-[#F4EFE7]"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.15em] text-[#9C978F] transition hover:text-[#C9A66B]"
          >
            ← View Site
          </Link>

          <div className="h-4 w-px bg-[#F4EFE7]/15" />

          <span className="hidden text-xs text-[#F4EFE7]/80 sm:inline">
            {user?.name}
          </span>

          <button
            type="button"
            onClick={logout}
            className="border border-[#F4EFE7]/20 px-3.5 py-1.5 text-xs uppercase tracking-[0.15em] text-[#F4EFE7] transition hover:border-[#B96843] hover:bg-[#B96843]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
