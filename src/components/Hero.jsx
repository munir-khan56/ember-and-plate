function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0E0E0D] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-10 lg:pt-24">

        <div className="max-w-3xl">

          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#C9A66B] sm:mb-6 sm:text-sm sm:tracking-[0.3em]">
            Modern American Kitchen
          </p>

          <h1 className="font-['Playfair_Display'] text-[clamp(4rem,16vw,9rem)] leading-[0.88] tracking-tight text-[#F4EFE7]">
            Ember
            <br />
            <span className="text-[#B96843]">&amp; Plate</span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-[#F4EFE7]/75 sm:mt-8 sm:text-base lg:text-lg">
            Crafted for the moments worth gathering for. Discover bold
            flavors, warm hospitality, and food made to be remembered.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">

            <a
              href="#menu"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#B96843] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-[#C47A56] sm:text-sm"
            >
              Explore Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#reservations"
              className="inline-flex min-h-12 items-center justify-center border border-[#F4EFE7]/40 px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#F4EFE7] transition duration-300 hover:border-[#F4EFE7] hover:bg-[#F4EFE7]/10 sm:text-sm"
            >
              Reserve a Table
            </a>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">

        <span className="text-[10px] uppercase tracking-[0.35em] text-[#F4EFE7]/50">
          Scroll
        </span>

        <div className="h-10 w-px bg-[#F4EFE7]/30" />

      </div>
    </section>
  )
}

export default Hero