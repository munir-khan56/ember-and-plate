function ChefSection() {
  return (
    <section className="relative overflow-hidden bg-[#0E0E0D]">

      <div className="group relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px]">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=85"
          alt="Chef preparing a dish in the kitchen"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 transition-colors duration-700 group-hover:bg-black/55" />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0E0E0D] to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-24 sm:min-h-[680px] sm:px-8 lg:min-h-[720px] lg:px-10">

          <div className="max-w-2xl">

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A66B] sm:tracking-[0.3em]">
              Behind The Plate
            </p>

            <h2 className="font-['Playfair_Display'] text-4xl leading-[1.02] text-[#F4EFE7] sm:text-6xl lg:text-7xl">
              Where Fire
              <br />
              Meets Craft
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#F4EFE7]/75 sm:text-base sm:leading-8 lg:text-lg">
              Great food starts long before it reaches the table.
              Our kitchen brings together patience, precision, and the
              energy of an open flame.
            </p>

            {/* Detail */}
            <div className="mt-9 flex items-center gap-5 sm:mt-10 sm:gap-6">

              <div className="h-px w-12 bg-[#B96843] sm:w-16" />

              <span className="text-[10px] uppercase tracking-[0.22em] text-[#F4EFE7]/60 sm:text-xs sm:tracking-[0.25em]">
                Crafted daily
              </span>

            </div>

          </div>

        </div>

        {/* Bottom Detail */}
        <div className="absolute bottom-8 right-6 z-10 hidden lg:block lg:right-10">

          <p className="text-right text-xs uppercase tracking-[0.25em] text-[#F4EFE7]/50">
            Ember & Plate
            <br />
            Est. 2026
          </p>

        </div>

      </div>

    </section>
  )
}

export default ChefSection