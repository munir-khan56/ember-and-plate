import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="font-['Playfair_Display'] text-xl tracking-wide text-[#F4EFE7]"
        >
          EMBER <span className="text-[#B96843]">&</span> PLATE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
          >
            Menu
          </Link>

          <a
            href="/#story"
            className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
          >
            Our Story
          </a>

          <a
            href="/#reservations"
            className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
          >
            Reservations
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-5 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded bg-[#C9A66B]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#C9A66B] ring-1 ring-[#C9A66B]/30 transition hover:bg-[#C9A66B]/25"
                >
                  Dashboard
                </Link>
              )}
              <span className="text-sm font-medium text-[#C9A66B]">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="border border-[#F4EFE7]/30 px-5 py-2.5 text-sm text-[#F4EFE7] transition hover:border-[#B96843] hover:bg-[#B96843]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-[#F4EFE7]/30 px-5 py-2.5 text-sm text-[#F4EFE7] transition hover:border-[#B96843] hover:bg-[#B96843]"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-lg text-[#F4EFE7] md:hidden focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#F4EFE7]/10 bg-[#0E0E0D]/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
            >
              Menu
            </Link>
            <a
              href="/#story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
            >
              Our Story
            </a>
            <a
              href="/#reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#F4EFE7]/80 transition hover:text-[#C9A66B]"
            >
              Reservations
            </a>

            <div className="mt-2 flex flex-col gap-3 border-t border-[#F4EFE7]/10 pt-4">
              {user ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#C9A66B]">
                      Signed in as {user.name}
                    </span>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded bg-[#C9A66B]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A66B] ring-1 ring-[#C9A66B]/30"
                      >
                        Dashboard
                      </Link>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="border border-[#F4EFE7]/30 px-5 py-2.5 text-center text-sm text-[#F4EFE7] transition hover:border-[#B96843] hover:bg-[#B96843]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="border border-[#F4EFE7]/30 px-5 py-2.5 text-center text-sm text-[#F4EFE7] transition hover:border-[#B96843] hover:bg-[#B96843]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1 text-center text-xs text-[#9C978F] transition hover:text-[#C9A66B]"
                  >
                    New Guest? Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar