import { useState } from "react"
import { updateReservationStatus, deleteReservation } from "../../lib/api"

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"]

function AdminReservations({ reservations, onRefresh }) {
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await updateReservationStatus(id, newStatus)
      await onRefresh()
    } catch (err) {
      alert(err.message || "Failed to update reservation status")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id, guestName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete the reservation for ${guestName}?`
      )
    ) {
      return
    }

    setDeletingId(id)
    try {
      await deleteReservation(id)
      await onRefresh()
    } catch (err) {
      alert(err.message || "Failed to delete reservation")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredReservations = reservations.filter((r) => {
    const matchesStatus =
      filterStatus === "All" || r.status === filterStatus
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.phone.toLowerCase().includes(term)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-['Playfair_Display'] text-2xl text-[#F4EFE7]">
          Guest Reservations ({reservations.length})
        </h2>
        <p className="text-xs text-[#9C978F]">
          Review guest bookings, update attendance status, and manage table
          schedules
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", ...STATUS_OPTIONS].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`shrink-0 rounded px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition ${
                filterStatus === status
                  ? "bg-[#C9A66B]/20 text-[#C9A66B] ring-1 ring-[#C9A66B]/40"
                  : "bg-[#171614] text-[#9C978F] hover:text-[#F4EFE7]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 border border-[#F4EFE7]/15 bg-[#171614] px-4 py-2 text-xs text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-[#F4EFE7]/10 bg-[#171614]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#F4EFE7]/10 bg-[#0E0E0D] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]">
              <tr>
                <th className="px-6 py-4">Guest Info</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Party</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F4EFE7]/5">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#6D6961]">
                    No reservations found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => (
                  <tr
                    key={res._id}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#F4EFE7]">{res.name}</p>
                        {res.specialRequests && (
                          <p className="mt-1 text-[11px] text-[#C9A66B]/90 italic">
                            “{res.specialRequests}”
                          </p>
                        )}
                        {res.user && (
                          <span className="mt-1 inline-block rounded bg-[#C9A66B]/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-[#C9A66B]">
                            Registered Member
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[#9C978F]">
                      <p>{res.email}</p>
                      <p className="mt-0.5 text-[11px] text-[#6D6961]">
                        {res.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-[#F4EFE7]">
                        {new Date(res.date).toLocaleDateString(undefined, {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-[11px] text-[#C9A66B]">{res.time}</p>
                    </td>

                    <td className="px-6 py-4 font-semibold text-[#F4EFE7]">
                      {res.guests} guest{res.guests > 1 ? "s" : ""}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={res.status}
                        disabled={updatingId === res._id}
                        onChange={(e) =>
                          handleStatusChange(res._id, e.target.value)
                        }
                        className={`rounded border border-[#F4EFE7]/15 bg-[#0E0E0D] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.1em] outline-none transition focus:border-[#B96843] ${
                          res.status === "confirmed"
                            ? "text-emerald-400"
                            : res.status === "cancelled"
                            ? "text-rose-400"
                            : res.status === "completed"
                            ? "text-blue-400"
                            : "text-amber-400"
                        }`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        disabled={deletingId === res._id}
                        onClick={() => handleDelete(res._id, res.name)}
                        className="border border-rose-500/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-rose-300 transition hover:bg-rose-500/15 disabled:opacity-50"
                      >
                        {deletingId === res._id ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminReservations
