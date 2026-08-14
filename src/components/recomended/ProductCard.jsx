import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ProductCard({ product }) {
  const { language, t } = useLanguage();

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
      {/* SVG */}
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
          "
        />
      </div>

      {/* Testi */}
      <div
        className="
          flex
          flex-1
          flex-col
          pt-[9px]
        "
      >
        <h4
          className="
            min-h-[38px]
            font-serif
            text-[17px]
            font-normal
            leading-[0.95]
            text-[#2F2A21]

            sm:text-[18px]

            lg:text-[17px]

            xl:text-[19px]
          "
        >
          {product.name}
        </h4>

        <p
          className="
            mt-[5px]
            min-h-[30px]

            font-sans
            text-[9px]
            font-normal
            leading-[13px]
            text-[#635B4E]

            sm:text-[10px]
            sm:leading-[14px]

            xl:text-[11px]
            xl:leading-[15px]
          "
        >
          {description}
        </p>

        {/* Prezzo */}
        {product.price && (
          <div
            className="
              mt-auto
              flex
              justify-end
              border-t
              border-[#D8D2C6]
              pt-[9px]

              font-sans
              text-[11px]
              font-normal
              text-[#2F2A21]
            "
          >
            {product.price}
          </div>
        )}

        {/* Link cibo */}
        {product.href && (
          <div
            className="
              mt-auto
              flex
              justify-end
              border-t
              border-[#D8D2C6]
              pt-[8px]
            "
          >
            <a
              href={product.href}
              aria-label={`${t("recommended.viewOnMenu")}: ${product.name}`}
              className="
                flex
                h-[20px]
                w-[20px]
                items-center
                justify-center
                text-[#635B4E]

                transition-transform
                duration-300

                hover:translate-x-[3px]
              "
            >
              <ArrowRight
                size={14}
                strokeWidth={1.2}
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}