import { useState, useEffect } from "react"
import FoodCard from "./FoodCard"
import { fetchMenuItems } from "../lib/api"

function SignatureDishes() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetchMenuItems()
      .then((data) => {
        if (!isMounted) return
        // Prioritize signature dishes if present, or take the first 3
        const signatureNames = [
          "Ember Grilled Ribeye",
          "Truffle Mushroom Pasta",
          "Ember Signature Burger",
        ]
        const matched = data.filter((item) => signatureNames.includes(item.name))
        const selected = matched.length >= 3 ? matched.slice(0, 3) : data.slice(0, 3)

        setDishes(selected)
        setLoading(false)
      })
      .catch(() => {
        if (!isMounted) return
        setError(true)
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="signature-dishes"
      className="bg-[#0E0E0D] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#B96843]">
            From our kitchen
          </p>

          <h2 className="font-['Playfair_Display'] text-4xl leading-tight text-[#F4EFE7] sm:text-5xl lg:text-6xl">
            A Taste of What
            <br />
            We're Known For
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#9C978F] sm:text-base">
            Thoughtfully prepared dishes built around bold flavors,
            quality ingredients, and the warmth of the flame.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((placeholder) => (
              <div
                key={placeholder}
                className="animate-pulse bg-[#171614] p-6"
              >
                <div className="aspect-[4/3] w-full rounded bg-[#24221E]" />
                <div className="mt-6 h-6 w-3/4 rounded bg-[#24221E]" />
                <div className="mt-3 h-4 w-full rounded bg-[#24221E]/60" />
                <div className="mt-2 h-4 w-2/3 rounded bg-[#24221E]/40" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 text-center">
            <p className="text-sm text-[#9C978F]">
              Unable to load signature dishes right now.
            </p>
          </div>
        )}

        {/* Dishes Grid */}
        {!loading && !error && dishes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {dishes.map((dish) => (
              <FoodCard
                key={dish._id || dish.name}
                image={dish.image}
                name={dish.name}
                description={dish.description}
                price={dish.price}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/menu"
            className="border-b border-[#B96843] pb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#F4EFE7] transition hover:text-[#C9A66B]"
          >
            View Full Menu →
          </a>
        </div>
      </div>
    </section>
  )
}

export default SignatureDishes