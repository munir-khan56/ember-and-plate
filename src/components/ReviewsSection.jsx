const reviews = [
  {
    quote:
      "Every dish felt intentional. The atmosphere, service, and food made the entire evening feel special.",
    name: "Olivia M.",
    detail: "Dinner Guest",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The ribeye was exceptional, but what stood out most was how thoughtful every part of the experience felt.",
    name: "James R.",
    detail: "Local Guest",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "A beautiful space with genuinely memorable food. Ember & Plate has quickly become one of our favorite places.",
    name: "Sophia L.",
    detail: "Regular Guest",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
]

function ReviewsSection() {
  return (
    <section className="bg-[#0E0E0D] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B96843] sm:tracking-[0.3em]">
            From Our Guests
          </p>

          <h2 className="font-['Playfair_Display'] text-4xl leading-[1.05] text-[#F4EFE7] sm:text-5xl lg:text-6xl">
            Worth Coming Back For
          </h2>

        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-px overflow-hidden border border-[#F4EFE7]/10 bg-[#F4EFE7]/10 md:grid-cols-3 lg:mt-16">

          {reviews.map((review) => (
            <article
              key={review.name}
              className="group bg-[#0E0E0D] px-7 py-9 transition-colors duration-500 hover:bg-[#151412] sm:px-8 sm:py-10 lg:px-10"
            >

              {/* Stars */}
              <div
                className="text-xs tracking-[0.25em] text-[#C9A66B]"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </div>

              {/* Quote */}
              <blockquote className="mt-7 font-['Playfair_Display'] text-xl leading-8 text-[#F4EFE7]/90 transition-colors duration-300 group-hover:text-[#F4EFE7]">
                “{review.quote}”
              </blockquote>

              {/* Guest */}
              <div className="mt-8 flex items-center gap-4">

                <div className="relative shrink-0">
                  <img
                    src={review.image}
                    alt={review.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-[#F4EFE7]/15 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#F4EFE7]">
                    {review.name}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#9C978F]">
                    {review.detail}
                  </p>
                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  )
}

export default ReviewsSection