import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[85vh] flex-col items-center justify-center bg-[#0E0E0D] px-6 py-32 text-center text-[#F4EFE7]">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A66B]">
            404 · Page Not Found
          </p>

          <h1 className="font-['Playfair_Display'] text-7xl font-normal tracking-tight text-[#F4EFE7] sm:text-8xl lg:text-9xl">
            4<span className="text-[#B96843]">0</span>4
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-[#9C978F] sm:text-lg">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#B96843] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#C47A56] sm:w-auto"
            >
              Back to Home
            </Link>

            <Link
              to="/menu"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#F4EFE7]/25 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F4EFE7] transition duration-300 hover:border-[#C9A66B] hover:text-[#C9A66B] sm:w-auto"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default NotFound
