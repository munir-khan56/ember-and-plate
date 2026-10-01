function AdminOverview({ menuItems, reservations, onNavigate }) {
  const totalMenu = menuItems.length
  const totalReservations = reservations.length
  const pendingReservations = reservations.filter(
    (r) => r.status === "pending"
  ).length
  const confirmedReservations = reservations.filter(
    (r) => r.status === "confirmed"
  ).length

  const stats = [
    {
      label: "Total Menu Items",
      value: totalMenu,
      detail: "Active restaurant offerings",
      actionTab: "menu",
    },
    {
      label: "Total Reservations",
      value: totalReservations,
      detail: "All recorded bookings",
      actionTab: "reservations",
    },
    {
      label: "Pending Bookings",
      value: pendingReservations,
      detail: "Awaiting confirmation",
      actionTab: "reservations",
      highlight: pendingReservations > 0,
    },
    {
      label: "Confirmed Bookings",
      value: confirmedReservations,
      detail: "Secured dining tables",
      actionTab: "reservations",
    },
  ]

  const recentReservations = reservations.slice(0, 5)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A66B]">
          Management Console
        </p>
        <h1 className="mt-2 font-['Playfair_Display'] text-3xl sm:text-4xl text-[#F4EFE7]">
          Ember & Plate Dashboard
        </h1>
        <p className="mt-2 text-sm text-[#9C978F]">
          Real-time overview of current restaurant operations, menu items, and
          guest bookings.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            onClick={() => onNavigate(stat.actionTab)}
            className={`cursor-pointer border border-[#F4EFE7]/10 bg-[#171614] p-6 transition duration-300 hover:border-[#B96843]/50 ${
              stat.highlight ? "ring-1 ring-[#C9A66B]/30" : ""
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9C978F]">
              {stat.label}
            </p>
            <p className="mt-3 font-['Playfair_Display'] text-4xl text-[#F4EFE7]">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-[#6D6961]">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Backend Status Notice regarding Users */}
      <div className="border border-[#F4EFE7]/10 bg-[#171614]/80 p-5">
        <div className="flex items-start gap-3">
          <span className="text-[#C9A66B]">ℹ</span>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F4EFE7]">
              User Directory Status
            </h4>
            <p className="mt-1 text-xs leading-5 text-[#9C978F]">
              A customer user directory endpoint is not currently configured in
              the backend API. User authentication and role-based permissions
              are fully active, and guest user profiles are linked directly to
              their respective reservations.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="border border-[#F4EFE7]/10 bg-[#171614] p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-[#F4EFE7]/10 pb-5">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl text-[#F4EFE7]">
              Recent Reservations
            </h3>
            <p className="text-xs text-[#9C978F]">
              Latest incoming reservation requests
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("reservations")}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A66B] transition hover:text-[#F4EFE7]"
          >
            View All →
          </button>
        </div>

        {recentReservations.length === 0 ? (
          <p className="py-8 text-center text-xs text-[#6D6961]">
            No reservations recorded yet.
          </p>
        ) : (
          <div className="mt-6 divide-y divide-[#F4EFE7]/5">
            {recentReservations.map((res) => (
              <div
                key={res._id}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-[#F4EFE7]">
                    {res.name}
                  </p>
                  <p className="text-xs text-[#6D6961]">
                    {new Date(res.date).toLocaleDateString()} at {res.time} ·{" "}
                    {res.guests} guest{res.guests > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                      res.status === "confirmed"
                        ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                        : res.status === "cancelled"
                        ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
                        : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOverview
