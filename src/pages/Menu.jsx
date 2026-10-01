import { useState, useEffect } from "react"
import { fetchMenuItems } from "../lib/api"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const categories = [
  "All",
  "Starters",
  "Mains",
  "Pasta",
  "Seafood",
  "Desserts",
]

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category)
      setLoading(true)
      setError(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    fetchMenuItems(activeCategory)
      .then((data) => {
        if (isMounted) {
          setItems(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [activeCategory])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F4EFE7] text-[#1A1917]">
      {/* Header */}
      <section className="bg-[#0E0E0D] px-6 pb-20 pt-32 text-center text-[#F4EFE7] lg:px-10 lg:pb-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A66B]">
          Ember & Plate
        </p>

        <h1 className="font-['Playfair_Display'] text-5xl leading-tight sm:text-6xl lg:text-8xl">
          Our Menu
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#9C978F] sm:text-base">
          Thoughtfully prepared dishes, seasonal ingredients, and
          bold flavors from our kitchen.
        </p>
      </section>

      {/* Menu Section */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Categories */}
          <div className="mb-12 flex gap-6 overflow-x-auto border-b border-[#1A1917]/10 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`shrink-0 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  activeCategory === category
                    ? "text-[#B96843]"
                    : "text-[#6D6961] hover:text-[#1A1917]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((placeholder) => (
                <div
                  key={placeholder}
                  className="animate-pulse overflow-hidden bg-white/40 p-6"
                >
                  <div className="aspect-[4/3] w-full rounded bg-[#1A1917]/10" />
                  <div className="mt-6 h-6 w-3/4 rounded bg-[#1A1917]/10" />
                  <div className="mt-3 h-4 w-full rounded bg-[#1A1917]/5" />
                  <div className="mt-6 h-4 w-1/3 rounded bg-[#1A1917]/10" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="py-16 text-center">
              <p className="text-sm text-[#6D6961]">
                Unable to load menu right now. Please try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && items.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-[#6D6961]">
                No dishes available in this category.
              </p>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && !error && items.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item._id || item.name}
                  className="group overflow-hidden bg-white/40"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-['Playfair_Display'] text-2xl">
                        {item.name}
                      </h2>

                      <span className="shrink-0 text-sm font-semibold text-[#B96843]">
                        ${item.price}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#6D6961]">
                      {item.description}
                    </p>

                    <a
                      href="/#reservations"
                      className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1917] transition hover:text-[#B96843]"
                    >
                      Reserve to Taste →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>

    <Footer />
  </>
)
}

export default Menu