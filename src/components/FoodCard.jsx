function FoodCard({ image, name, description, price }) {
  return (
    <article className="group overflow-hidden bg-[#171614]">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">

        <div className="flex items-start justify-between gap-5">

          <h3 className="max-w-[75%] font-['Playfair_Display'] text-2xl leading-tight text-[#F4EFE7] transition-colors duration-300 group-hover:text-[#C9A66B]">
            {name}
          </h3>

          <span className="shrink-0 pt-1 text-sm font-medium text-[#C9A66B]">
            ${price}
          </span>

        </div>

        <p className="mt-4 text-sm leading-6 text-[#9C978F]">
          {description}
        </p>

        <a
          href="/#reservations"
          className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B96843] transition-colors duration-300 hover:text-[#C9A66B]"
        >
          Reserve to Taste
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

      </div>
    </article>
  )
}

export default FoodCard