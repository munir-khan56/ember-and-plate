function StorySection() {
  return (
    <section
      id="story"
      className="overflow-hidden bg-[#F4EFE7] text-[#1A1917]"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

        {/* Image */}
        <div className="group relative h-[55vh] min-h-[420px] overflow-hidden sm:h-[600px] lg:h-[700px]">

          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85"
            alt="Warm restaurant interior"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-black/0" />

        </div>

        {/* Content */}
        <div className="flex items-center px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-24">

          <div className="max-w-xl">

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B96843] sm:tracking-[0.3em]">
              Our Philosophy
            </p>

            <h2 className="font-['Playfair_Display'] text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              More Than
              <br />
              Just a Meal
            </h2>

            <div className="mt-7 h-px w-16 bg-[#C9A66B]" />

            <p className="mt-8 text-sm leading-7 text-[#4B4842] sm:text-base sm:leading-8">
              At Ember & Plate, we believe the best meals are the ones
              that become memories. Our kitchen brings together bold
              American flavors, seasonal ingredients, and the warmth of
              cooking over an open flame.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#4B4842] sm:text-base sm:leading-8">
              Every plate is prepared with intention, every ingredient
              has a purpose, and every table is a place to gather.
            </p>

            <a
              href="/#menu"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#1A1917] pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#B96843] hover:text-[#B96843] sm:mt-10 sm:text-sm"
            >
              Explore Our Kitchen
              <span className="transition-transform duration-300 hover:translate-x-1">
                →
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}

export default StorySection