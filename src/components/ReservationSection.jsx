import { useState } from "react"
import { createReservation } from "../lib/api"

function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear errors when the user edits fields
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    // Basic frontend validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      setError("Please fill out all required fields to complete your reservation.")
      return
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Please provide a valid email address.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        specialRequests: formData.specialRequests.trim(),
      }

      const result = await createReservation(payload)

      setSuccess(
        `Thank you, ${result.name}. Your table for ${result.guests} guest${
          result.guests > 1 ? "s" : ""
        } on ${new Date(result.date).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })} at ${result.time} is requested!`
      )

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        specialRequests: "",
      })
    } catch (err) {
      setError(
        err.message || "Failed to submit reservation. Please try again or call us directly."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="reservations"
      className="overflow-hidden bg-[#171614] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden border border-[#F4EFE7]/10 lg:grid-cols-2">
          {/* Image */}
          <div className="group relative min-h-[420px] sm:min-h-[520px] lg:min-h-[680px]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
              alt="Elegant restaurant dining room"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Reservation Content */}
          <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <div className="w-full max-w-lg">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A66B] sm:tracking-[0.3em]">
                Reservations
              </p>

              <h2 className="font-['Playfair_Display'] text-4xl leading-[1.05] text-[#F4EFE7] sm:text-5xl lg:text-6xl">
                Your Table
                <br />
                Is Waiting
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#9C978F] sm:text-base sm:leading-8">
                Join us for an evening of good food, warm hospitality,
                and moments worth remembering.
              </p>

              {/* Feedback messages */}
              {success && (
                <div className="mt-6 border border-[#C9A66B]/30 bg-[#C9A66B]/10 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
                    Reservation Requested
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[#F4EFE7]/90 sm:text-sm">
                    {success}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 border border-[#B96843]/40 bg-[#B96843]/10 p-3.5 text-center">
                  <p className="text-xs text-[#F4EFE7]/90">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Name & Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reservation-name"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                    >
                      Full Name *
                    </label>
                    <input
                      id="reservation-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 placeholder:text-[#6D6961] focus:border-[#B96843]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reservation-phone"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="reservation-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(212) 555-0184"
                      className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 placeholder:text-[#6D6961] focus:border-[#B96843]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="reservation-email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="reservation-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 placeholder:text-[#6D6961] focus:border-[#B96843]"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reservation-date"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                    >
                      Date *
                    </label>
                    <input
                      id="reservation-date"
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 focus:border-[#B96843]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reservation-time"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                    >
                      Time *
                    </label>
                    <select
                      id="reservation-time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 focus:border-[#B96843]"
                    >
                      <option value="" disabled>
                        Select time
                      </option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label
                    htmlFor="reservation-guests"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9C978F]"
                  >
                    Guests *
                  </label>
                  <select
                    id="reservation-guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border border-[#F4EFE7]/15 bg-[#0E0E0D] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition-colors duration-300 focus:border-[#B96843]"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="10">10 Guests</option>
                    <option value="12">12 Guests</option>
                  </select>
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-3 bg-[#B96843] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#C47A56] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Securing Table..." : "Find a Table"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReservationSection