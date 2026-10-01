import { useState, useEffect } from "react"
import { fetchMenuItems, getReservations } from "../lib/api"
import { useAuth } from "../context/AuthContext"
import AdminNavbar from "../components/admin/AdminNavbar"
import AdminOverview from "../components/admin/AdminOverview"
import AdminMenu from "../components/admin/AdminMenu"
import AdminReservations from "../components/admin/AdminReservations"

function AdminDashboard() {
  const { token } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [menuItems, setMenuItems] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshIndex, setRefreshIndex] = useState(0)

  const handleRefresh = () => {
    setRefreshIndex((prev) => prev + 1)
  }

  useEffect(() => {
    let isMounted = true

    Promise.all([fetchMenuItems(), getReservations(token)])
      .then(([menuData, resData]) => {
        if (!isMounted) return
        setMenuItems(menuData)
        setReservations(resData)
        setError(null)
        setLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err.message || "Failed to load dashboard data.")
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [token, refreshIndex])

  return (
    <div className="min-h-screen bg-[#0E0E0D] text-[#F4EFE7]">
      {/* Navigation */}
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#B96843] border-t-transparent" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#9C978F]">
              Loading Management Console...
            </p>
          </div>
        )}

        {/* Global Error Banner */}
        {!loading && error && (
          <div className="mb-8 border border-rose-500/30 bg-rose-500/10 p-4 text-center">
            <p className="text-xs text-rose-300">{error}</p>
            <button
              type="button"
              onClick={handleRefresh}
              className="mt-3 border border-rose-400/40 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-rose-200 transition hover:bg-rose-500/20"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content based on Active Tab */}
        {!loading && !error && (
          <>
            {activeTab === "overview" && (
              <AdminOverview
                menuItems={menuItems}
                reservations={reservations}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === "menu" && (
              <AdminMenu menuItems={menuItems} onRefresh={handleRefresh} />
            )}

            {activeTab === "reservations" && (
              <AdminReservations
                reservations={reservations}
                onRefresh={handleRefresh}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
