import { useState } from "react";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "../../i18n/LanguageContext";
import { getLocalizedValue } from "../../i18n/localize";
import { pagePath } from "../../lib/navigation";

const LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`;

/*
 * =======================================================
 * SEGNAPOSTO IMMAGINE
 * =======================================================
 *
 * Alcuni drink sono già in carta ma non
 * hanno ancora una foto in public/.
 *
 * Invece di lasciare l’icona di immagine
 * rotta del browser, mostriamo il logo in
 * filigrana: la card mantiene le stesse
 * proporzioni e la griglia non si sposta
 * quando la foto verrà aggiunta.
 */
function ImagePlaceholder() {
  return (
    <span
      aria-hidden="true"
      className="
        relative
        z-10

        flex
        h-full
        w-full
        items-center
        justify-center
      "
    >
      <span
        className="
          block
          h-[58%]
          w-[58%]

          bg-[#B9A37A]/45

          transition-transform
          duration-700

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/product:-translate-y-[2px]
          group-hover/product:scale-[1.035]
        "
        style={{
          WebkitMaskImage: `url("${LOGO_URL}")`,
          maskImage: `url("${LOGO_URL}")`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
}

function PriceRule() {
  return (
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
  );
}

function PriceValue({ children }) {
  return (
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
      {children}
    </span>
  );
}

export default function ProductCard({
  product,
}) {
  const { language, t } =
    useLanguage();

  const [imageFailed, setImageFailed] =
    useState(false);

  const name = getLocalizedValue(
    product.name,
    language
  );

  const description =
    getLocalizedValue(
      product.description,
      language
    );

  const price = getLocalizedValue(
    product.price,
    language
  );

  const showImage =
    Boolean(product.image) &&
    !imageFailed;

  /*
   * Il Gin Tonic non ha un prezzo unico:
   * dipende dal gin scelto, quindi la card
   * diventa un link e porta direttamente
   * alla sezione Gin del menu, dove ogni
   * etichetta ha il suo prezzo.
   */
  const href = product.menuAnchor
    ? `${pagePath("/menu")}#${product.menuAnchor}`
    : null;

  const tag = product.tagKey
    ? t(product.tagKey)
    : null;

  const Root = href ? "a" : "article";

  const rootProps = href
    ? {
        href,
        "aria-label": `${name} — ${
          tag ??
          t("recommended.viewOnMenu")
        }`,
      }
    : {};

  return (
    <Root
      {...rootProps}
      className="
        group/product

        flex
        h-full
        min-w-0
        flex-col

        text-[#2F2A21]
        no-underline

        focus-visible:outline-none
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

          group-focus-visible/product:ring-1
          group-focus-visible/product:ring-[#AD9060]/70

          sm:p-[18px]

          lg:p-[12px]

          xl:p-[16px]
        "
      >
        {showImage ? (
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            onError={() =>
              setImageFailed(true)
            }
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
        ) : (
          <ImagePlaceholder />
        )}

        {/*
          Il tag sta dentro la cornice della
          foto: non ruba altezza al blocco di
          testo, quindi le card della fila
          restano tutte allineate.
        */}
        {tag && (
          <span
            className="
              absolute
              bottom-[10px]
              left-[10px]
              z-20

              inline-flex
              max-w-[calc(100%-20px)]
              items-center
              gap-[5px]

              rounded-full
              border
              border-[#AD9060]/45

              bg-[#F5F2EA]/90

              px-[9px]
              py-[6px]

              font-sans
              text-[8px]
              font-medium
              uppercase
              leading-none
              tracking-[0.16em]
              text-[#7C644A]

              transition-[background-color,border-color,transform]
              duration-400

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              group-hover/product:-translate-y-[3px]
              group-hover/product:border-[#AD9060]/80
              group-hover/product:bg-[#F5F2EA]

              sm:bottom-[12px]
              sm:left-[12px]
              sm:px-[11px]
              sm:text-[9px]
            "
          >
            <span className="truncate">
              {tag}
            </span>

            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.6}
              className="
                h-[11px]
                w-[11px]
                shrink-0

                transition-transform
                duration-400

                group-hover/product:-translate-y-[1px]
                group-hover/product:translate-x-[1px]
              "
            />
          </span>
        )}

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
          {name}
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

        {/*
          I vini hanno due formati, bottiglia
          e calice: una riga per ciascuno.
        */}
        {product.prices?.length > 0 && (
          <div
            className="
              mt-[11px]

              flex
              flex-col
              gap-[7px]

              sm:mt-[13px]

              lg:mt-[15px]
            "
          >
            {product.prices.map(
              (entry) => (
                <div
                  key={entry.labelKey}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-[10px]
                  "
                >
                  <span
                    className="
                      shrink-0

                      font-sans
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[#8A7558]

                      sm:text-[9px]
                    "
                  >
                    {t(entry.labelKey)}
                  </span>

                  <PriceRule />

                  <PriceValue>
                    {entry.value}
                  </PriceValue>
                </div>
              )
            )}
          </div>
        )}

        {!product.prices?.length &&
          price && (
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
              <PriceRule />

              <PriceValue>
                {price}
              </PriceValue>
            </div>
          )}
      </div>
    </Root>
  );
}
