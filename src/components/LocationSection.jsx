function LocationSection() {
  return (
    <section
      className="overflow-hidden bg-[#F4EFE7] px-6 py-24 text-[#1A1917] sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Left — Information */}
          <div>

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B96843] sm:tracking-[0.3em]">
              Come Find Us
            </p>

            <h2 className="font-['Playfair_Display'] text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Gather Around
              <br />
              The Table
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#5B5750] sm:text-base sm:leading-8">
              Join us in the heart of the city for thoughtfully crafted
              food, warm hospitality, and an atmosphere made for lingering.
            </p>

            {/* Details */}
            <div className="mt-10 space-y-7">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B96843]">
                  Address
                </p>

                <a
                  href="https://maps.google.com/?q=1840+Market+Street+New+York+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm leading-6 text-[#4B4842] transition-colors duration-300 hover:text-[#B96843]"
                >
                  1840 Market Street
                  <br />
                  New York, NY 10001
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B96843]">
                  Hours
                </p>

                <p className="mt-2 text-sm leading-6 text-[#4B4842]">
                  Monday – Thursday · 5:00 PM – 10:00 PM
                  <br />
                  Friday – Saturday · 5:00 PM – 11:00 PM
                  <br />
                  Sunday · 4:00 PM – 9:00 PM
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B96843]">
                  Contact
                </p>

                <div className="mt-2 text-sm leading-6 text-[#4B4842]">
                  <a
                    href="tel:+12125550184"
                    className="transition-colors duration-300 hover:text-[#B96843]"
                  >
                    +1 (212) 555-0184
                  </a>
                  <br />
                  <a
                    href="mailto:hello@emberandplate.com"
                    className="transition-colors duration-300 hover:text-[#B96843]"
                  >
                    hello@emberandplate.com
                  </a>
                </div>
              </div>

            </div>

            {/* Directions */}
            <a
              href="https://maps.google.com/?q=1840+Market+Street+New+York+NY+10001"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 border-b border-[#1A1917] pb-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[#B96843] hover:text-[#B96843] sm:text-sm"
            >
              Get Directions

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

          </div>

          {/* Right — Map Placeholder */}
          <div className="relative min-h-[420px] overflow-hidden bg-[#D9D1C4] sm:min-h-[500px]">

            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(#6D6961 1px, transparent 1px), linear-gradient(90deg, #6D6961 1px, transparent 1px)",
                backgroundSize: "45px 45px",
              }}
            />

            {/* Map Card */}
            <a
              href="https://maps.google.com/?q=1840+Market+Street+New+York+NY+10001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Ember & Plate on Google Maps"
              className="absolute left-1/2 top-1/2 block w-[82%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#F4EFE7] p-6 shadow-2xl transition-transform duration-300 hover:scale-[1.02] sm:p-8"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B96843] text-xs text-white">
                  ●
                </div>

                <div>
                  <p className="font-['Playfair_Display'] text-xl">
                    Ember & Plate
                  </p>

                  <p className="mt-1 text-xs text-[#6D6961]">
                    1840 Market Street
                  </p>
                </div>

              </div>

              <div className="mt-7 h-px bg-[#1A1917]/10" />

              <div className="mt-5 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6D6961]">
                  Downtown · New York City
                </p>
                <span className="text-xs font-semibold text-[#B96843]">
                  Open in Maps ↗
                </span>
              </div>

            </a>

          </div>

        </div>

      </div>
    </section>
  )
}

export default LocationSection