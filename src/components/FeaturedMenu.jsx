import { useState, useEffect } from "react"
import { fetchMenuItems } from "../lib/api"

const categories = [
  "All",
  "Starters",
  "Mains",
  "Pasta",
  "Seafood",
  "Desserts",
]

function FeaturedMenu() {
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
    <section
      id="menu"
      className="bg-[#F4EFE7] px-6 py-24 text-[#1A1917] sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#B96843] sm:tracking-[0.3em]">
              The Menu
            </p>

            <h2 className="font-['Playfair_Display'] text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Explore Our
              <br />
              Kitchen
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#5B5750] sm:text-base">
            Seasonal ingredients, thoughtful techniques, and bold flavors
            come together across every part of our menu.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-12 overflow-x-auto border-b border-[#1A1917]/15">
          <div className="flex min-w-max gap-7 pb-4 sm:gap-9">
            {categories.map((category) => {
              const isActive = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`relative shrink-0 pb-1 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#B96843]"
                      : "text-[#6D6961] hover:text-[#1A1917]"
                  }`}
                >
                  {category}

                  {/* Active indicator */}
                  <span
                    className={`absolute -bottom-[17px] left-0 h-px bg-[#B96843] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Content State: Loading, Error, Empty, or Items */}
        {loading && (
          <div className="mt-8 grid gap-x-12 lg:grid-cols-2">
            {[1, 2, 3, 4].map((placeholder) => (
              <div
                key={placeholder}
                className="animate-pulse border-b border-[#1A1917]/10 py-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="w-full">
                    <div className="mb-3 h-5 w-44 rounded bg-[#1A1917]/10" />
                    <div className="h-4 w-3/4 rounded bg-[#1A1917]/5" />
                  </div>
                  <div className="h-5 w-10 shrink-0 rounded bg-[#1A1917]/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-12 py-12 text-center">
            <p className="text-sm text-[#6D6961]">
              Unable to load menu right now. Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="mt-12 py-12 text-center">
            <p className="text-sm text-[#6D6961]">
              No dishes available in this category.
            </p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="mt-8 grid gap-x-12 lg:grid-cols-2">
            {items.map((item) => (
              <article
                key={item._id || item.name}
                className="group border-b border-[#1A1917]/10 py-7 transition-colors duration-300 hover:border-[#B96843]/40"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="font-['Playfair_Display'] text-xl leading-tight transition-colors duration-300 group-hover:text-[#B96843] sm:text-2xl">
                      {item.name}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-[#6D6961]">
                      {item.description}
                    </p>
                  </div>

                  <span className="shrink-0 pt-1 text-sm font-medium text-[#1A1917]">
                    ${item.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Full Menu CTA */}
        <div className="mt-12 text-center">
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 border border-[#1A1917] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#1A1917] hover:text-[#F4EFE7] sm:text-sm"
          >
            View Full Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMenu