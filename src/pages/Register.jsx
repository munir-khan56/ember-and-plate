import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill out all required fields.")
      return
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Please provide a valid email address.")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0E0E0D] text-[#F4EFE7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — Form */}
        <div className="flex items-center justify-center px-6 py-16 sm:px-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link
              to="/"
              className="font-['Playfair_Display'] text-2xl tracking-wide"
            >
              EMBER <span className="text-[#B96843]">&</span> PLATE
            </Link>

            <div className="mt-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A66B]">
                Create Account
              </p>

              <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl">
                Join us
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#9C978F]">
                Create an account to manage your reservations, orders,
                and dining experience.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 border border-[#B96843]/40 bg-[#B96843]/10 p-3.5 text-center">
                <p className="text-xs text-[#F4EFE7]/90">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#9C978F]"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-[#F4EFE7]/15 bg-[#171614] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#9C978F]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#F4EFE7]/15 bg-[#171614] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#9C978F]"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 characters)"
                  className="w-full border border-[#F4EFE7]/15 bg-[#171614] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#9C978F]"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full border border-[#F4EFE7]/15 bg-[#171614] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B96843] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#C47A56] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-[#9C978F]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#C9A66B] transition hover:text-[#F4EFE7]"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-10 text-center">
              <Link
                to="/"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D6961] transition hover:text-[#F4EFE7]"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
            alt="Ember & Plate dining room"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute bottom-12 left-12 z-10 max-w-md">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A66B]">
              Ember & Plate
            </p>

            <h2 className="font-['Playfair_Display'] text-5xl leading-tight text-[#F4EFE7]">
              Make every
              <br />
              gathering memorable.
            </h2>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register