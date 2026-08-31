import { useLanguage } from "../../i18n/LanguageContext";
import { useImageRotation } from "../../lib/useImageRotation";

/*
 * =======================================================
 * IMMAGINI DELLA CARD
 * =======================================================
 *
 * Sono verticali, quindi occupano una colonna
 * stretta a tutta altezza da tablet in su.
 *
 * Su mobile, dove la card diventa a colonna
 * singola, restano visibili come fascia in
 * fondo: il taglio è centrato, perché in tutte
 * e tre il soggetto sta al centro del fotogramma.
 *
 * L'intervallo è volutamente diverso da quello
 * dell'hero, così le due rotazioni non vanno
 * mai a tempo tra loro.
 */
const BAR_IMAGES = [
  "/appuntamento1.webp",
  "/appuntamento2.webp",
  "/appuntamento3.webp",
];

const BAR_ROTATION_MS = 7000;

export default function BarSection() {
  const { t } = useLanguage();

  const activeImage = useImageRotation(
    BAR_IMAGES.length,
    BAR_ROTATION_MS
  );

  return (
    <section
      id="vibes"
      aria-labelledby="bar-section-title"
      className="
        bg-[#F2F1EC]
        px-[14px]
        py-[30px]

        sm:px-8
        sm:py-[42px]

        lg:px-10
        lg:py-[60px]

        xl:px-12
        xl:py-[68px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
        "
      >
        <div
          className="
            relative
            overflow-hidden

            border
            border-[#8F826D]

            bg-section-bar
          "
        >

          <div
            className="
              relative
              z-10

              grid

              md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)_minmax(0,0.6fr)]

              lg:min-h-[330px]

              xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.62fr)]
              xl:min-h-[360px]
            "
          >
            {/* Citazione */}
            <div
              className="
                flex
                flex-col
                justify-center

                px-[22px]
                pb-[18px]
                pt-[26px]

                sm:px-8
                sm:pb-[22px]
                sm:pt-[34px]

                md:border-r
                md:border-[#9E9078]/55
                md:px-10
                md:py-[44px]

                lg:px-12
                lg:py-[52px]

                xl:px-[58px]
                xl:py-[58px]
              "
            >
              <blockquote>
                <h2
                  id="bar-section-title"
                  className="
                    max-w-[310px]

                    font-serif
                    text-[30px]
                    font-normal
                    leading-[0.98]
                    text-[#2F2A21]

                    sm:max-w-[420px]
                    sm:text-[38px]

                    md:max-w-[430px]
                    md:text-[44px]

                    lg:max-w-[500px]
                    lg:text-[53px]

                    xl:text-[59px]
                  "
                >
                  {t("bar.quote")}
                </h2>
              </blockquote>

              <span
                aria-hidden="true"
                className="
                  mt-[22px]
                  block
                  h-px
                  w-[58px]
                  bg-[#A68F68]

                  sm:mt-[26px]
                  sm:w-[68px]

                  lg:mt-[32px]
                  lg:w-[78px]
                "
              />
            </div>

            {/* Testo */}
            <div
              className="
                flex
                items-center

                px-[22px]
                pb-[28px]
                pt-[8px]

                sm:px-8
                sm:pb-[38px]
                sm:pt-[10px]

                md:px-10
                md:py-[44px]

                lg:px-12
                lg:py-[52px]

                xl:px-[58px]
                xl:py-[58px]
              "
            >
              <p
                className="
                  max-w-[340px]

                  font-sans
                  text-[16px]
                  font-normal
                  leading-[1.38]
                  text-[#4D463D]

                  sm:max-w-[500px]
                  sm:text-[17px]
                  sm:leading-[1.48]

                  md:max-w-[470px]
                  md:text-[18px]
                  md:leading-[1.52]

                  lg:max-w-[540px]
                  lg:text-[20px]
                  lg:leading-[1.5]

                  xl:text-[21px]
                "
              >
                {t("bar.description")}
              </p>
            </div>

            {/* Immagini */}
            <div
              className="
                relative
                overflow-hidden

                aspect-[4/3]
                w-full

                border-t
                border-[#9E9078]/55

                sm:aspect-[3/2]

                md:aspect-auto
                md:h-full
                md:border-l
                md:border-t-0
              "
            >
              {BAR_IMAGES.map(
                (source, index) => (
                  <img
                    key={source}
                    src={source}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className={`
                      absolute
                      inset-0

                      h-full
                      w-full

                      object-cover
                      object-center

                      brightness-[0.91]
                      saturate-[0.92]
                      contrast-[1.03]

                      transition-[opacity,transform]
                      duration-[1200ms]

                      [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                      motion-reduce:transition-none

                      ${
                        index === activeImage
                          ? "scale-100 opacity-100"
                          : "scale-[1.035] opacity-0"
                      }
                    `}
                  />
                )
              )}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-[#2F2A21]/[0.025]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}