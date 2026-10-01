import { useState } from "react"
import { Link } from "react-router-dom"

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const trimmed = newsletterEmail.trim()
    if (trimmed && trimmed.includes("@") && trimmed.includes(".")) {
      setNewsletterSubscribed(true)
      setNewsletterEmail("")
    }
  }

  return (
    <footer className="bg-[#0E0E0D] text-[#F4EFE7]">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-5">

            <Link
              to="/"
              className="inline-block font-['Playfair_Display'] text-3xl tracking-wide transition-colors duration-300 hover:text-[#C9A66B]"
            >
              EMBER <span className="text-[#B96843]">&</span> PLATE
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#9C978F]">
              A modern American kitchen built around bold flavors,
              thoughtful ingredients, and the moments that bring people
              together.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C978F] transition-colors duration-300 hover:text-[#C9A66B]"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C978F] transition-colors duration-300 hover:text-[#C9A66B]"
              >
                Facebook
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C978F] transition-colors duration-300 hover:text-[#C9A66B]"
              >
                TikTok
              </a>

            </div>

          </div>

          {/* Explore */}
          <div className="lg:col-span-2">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">

              <Link
                to="/"
                className="group flex items-center gap-2 text-sm text-[#9C978F] transition-colors duration-300 hover:text-[#F4EFE7]"
              >
                <span>Home</span>
              </Link>

              <Link
                to="/menu"
                className="text-sm text-[#9C978F] transition-colors duration-300 hover:text-[#F4EFE7]"
              >
                Menu
              </Link>

              <a
                href="/#story"
                className="text-sm text-[#9C978F] transition-colors duration-300 hover:text-[#F4EFE7]"
              >
                Our Story
              </a>

              <a
                href="/#reservations"
                className="text-sm text-[#9C978F] transition-colors duration-300 hover:text-[#F4EFE7]"
              >
                Reservations
              </a>

            </nav>

          </div>

          {/* Visit */}
          <div className="lg:col-span-2">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
              Visit
            </p>

            <div className="mt-6 space-y-5 text-sm leading-6 text-[#9C978F]">

              <a
                href="https://maps.google.com/?q=1840+Market+Street+New+York+NY+10001"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-[#F4EFE7]"
              >
                1840 Market Street
                <br />
                New York, NY 10001
              </a>

              <div>
                <a
                  href="tel:+12125550184"
                  className="transition-colors duration-300 hover:text-[#F4EFE7]"
                >
                  +1 (212) 555-0184
                </a>

                <br />

                <a
                  href="mailto:hello@emberandplate.com"
                  className="transition-colors duration-300 hover:text-[#F4EFE7]"
                >
                  hello@emberandplate.com
                </a>
              </div>

            </div>

          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A66B]">
              Stay In The Know
            </p>

            <p className="mt-6 max-w-sm text-sm leading-6 text-[#9C978F]">
              Seasonal menus, special evenings, and stories from our
              kitchen.
            </p>

            {newsletterSubscribed ? (
              <div className="mt-6 border border-[#C9A66B]/30 bg-[#C9A66B]/10 p-4">
                <p className="text-xs text-[#C9A66B]">
                  Thank you for subscribing. We look forward to sharing our kitchen with you.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 flex w-full max-w-sm border-b border-[#F4EFE7]/20 pb-3 transition-colors duration-300 focus-within:border-[#C9A66B]"
              >
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent pr-4 text-sm text-[#F4EFE7] outline-none placeholder:text-[#6D6961]"
                />

                <button
                  type="submit"
                  disabled={!newsletterEmail.trim()}
                  className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F4EFE7] transition-colors duration-300 hover:text-[#C9A66B] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Join
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F4EFE7]/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

          <p className="text-[11px] tracking-wide text-[#6D6961]">
            © 2026 Ember & Plate. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault()
                alert("Ember & Plate respects your privacy and guest confidentiality.")
              }}
              className="text-[11px] text-[#6D6961] transition-colors duration-300 hover:text-[#9C978F]"
            >
              Privacy
            </a>

            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault()
                alert("Reservations are held for 15 minutes past booking time.")
              }}
              className="text-[11px] text-[#6D6961] transition-colors duration-300 hover:text-[#9C978F]"
            >
              Terms
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer