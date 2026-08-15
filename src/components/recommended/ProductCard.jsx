import { useLanguage } from "../../i18n/LanguageContext";

export default function ProductCard({ product }) {
  const { language } = useLanguage();

  const description =
    product.description?.[language] ??
    product.description?.it ??
    "";

  return (
    <article
      className="
        flex
        h-full
        min-w-0
        flex-col
      "
    >
      {/* Immagine */}
      <div
        className="
          flex
          aspect-[9/10]
          w-full
          items-center
          justify-center
          overflow-hidden

          rounded-[6px]
          bg-card-bg

          p-[14px]

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
            h-full
            w-full
            object-contain

            transition-transform
            duration-300
            ease-out

            hover:scale-[1.025]
          "
        />
      </div>

      {/* Informazioni */}
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

            sm:mt-[8px]
            sm:text-[13px]
            sm:leading-[1.45]

            lg:text-[14px]
          "
        >
          {description}
        </p>

        {/* Prezzo */}
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
                bg-[#D8D2C6]
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