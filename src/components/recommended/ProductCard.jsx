import { useLanguage } from "../../i18n/LanguageContext";

export default function ProductCard({
  product,
}) {
  const { language } = useLanguage();

  const description =
    product.description?.[language] ??
    product.description?.it ??
    "";

  return (
    <article
      className="
        group/product

        flex
        h-full
        min-w-0
        flex-col
      "
    >
      <div
        className="
          relative

          flex
          aspect-[9/10]
          w-full
          items-center
          justify-center
          overflow-hidden

          rounded-[6px]
          bg-card-bg

          p-[14px]

          transition-[transform,background-color,box-shadow]
          duration-500

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/product:-translate-y-[3px]
          group-hover/product:bg-[#ECE0CB]
          group-hover/product:shadow-[0_16px_34px_rgba(68,53,36,0.08)]

          sm:p-[18px]

          lg:p-[12px]

          xl:p-[16px]
        "
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="
            relative
            z-10

            h-full
            w-full
            object-contain

            will-change-transform

            transition-transform
            duration-700

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/product:-translate-y-[2px]
            group-hover/product:scale-[1.035]
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[radial-gradient(circle_at_50%_80%,rgba(173,144,96,0.13),transparent_58%)]

            opacity-0

            transition-opacity
            duration-500

            group-hover/product:opacity-100
          "
        />
      </div>

      <div
        className="
          flex
          flex-1
          flex-col

          pt-[11px]

          sm:pt-[13px]

          lg:pt-[15px]
        "
      >
        <h4
          className="
            min-h-[2.05em]

            font-serif
            text-[20px]
            font-normal
            leading-[1.02]
            text-[#2F2A21]

            transition-[color,transform]
            duration-400

            group-hover/product:translate-x-[2px]
            group-hover/product:text-[#635B4E]

            sm:text-[22px]

            lg:text-[24px]
          "
        >
          {product.name}
        </h4>

        <p
          className="
            mt-[7px]
            min-h-[2.8em]

            font-sans
            text-[12px]
            font-normal
            leading-[1.42]
            text-[#635B4E]

            transition-[color,transform]
            duration-400

            group-hover/product:translate-x-[2px]
            group-hover/product:text-[#4D463D]

            sm:mt-[8px]
            sm:text-[13px]
            sm:leading-[1.45]

            lg:text-[14px]
          "
        >
          {description}
        </p>

        {product.price && (
          <div
            className="
              mt-[11px]

              flex
              items-center
              justify-between
              gap-[12px]

              sm:mt-[13px]

              lg:mt-[15px]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                min-w-[28px]
                flex-1

                origin-left

                bg-[#D8D2C6]

                transition-[transform,background-color]
                duration-600

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                group-hover/product:scale-x-[1.025]
                group-hover/product:bg-[#AD9060]/70
              "
            />

            <span
              className="
                shrink-0

                font-serif
                text-[18px]
                font-normal
                leading-none
                text-[#2F2A21]

                transition-[color,transform]
                duration-400

                group-hover/product:-translate-y-[1px]
                group-hover/product:text-[#635B4E]

                sm:text-[20px]

                lg:text-[22px]
              "
            >
              {product.price}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}