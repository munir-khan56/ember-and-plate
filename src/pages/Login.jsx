import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { login, isAuthenticated } = useAuth()
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

    if (!formData.email.trim() || !formData.password) {
      setError("Please provide both email and password.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      })
      navigate("/")
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0E0E0D] text-[#F4EFE7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left — Image */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=85"
            alt="Ember & Plate dining"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute bottom-12 left-12 z-10 max-w-md">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A66B]">
              Welcome Back
            </p>

            <h2 className="font-['Playfair_Display'] text-5xl leading-tight">
              Good food is
              <br />
              better together.
            </h2>
          </div>
        </div>

        {/* Right — Login */}
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
                Account
              </p>

              <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl">
                Welcome back
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#9C978F]">
                Sign in to manage your reservations, orders, and dining
                experience.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 border border-[#B96843]/40 bg-[#B96843]/10 p-3.5 text-center">
                <p className="text-xs text-[#F4EFE7]/90">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9C978F]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Please contact host or reset password via support.")
                    }
                    className="text-xs text-[#C9A66B] transition hover:text-[#F4EFE7]"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-[#F4EFE7]/15 bg-[#171614] px-4 py-3.5 text-sm text-[#F4EFE7] outline-none transition placeholder:text-[#6D6961] focus:border-[#B96843]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B96843] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#C47A56] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-[#9C978F]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#C9A66B] transition hover:text-[#F4EFE7]"
              >
                Create one
              </Link>
            </p>

            {/* Back */}
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
      </div>
    </main>
  )
}

export default Login