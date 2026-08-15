import { useLanguage } from "../../i18n/LanguageContext";

export default function BarSection() {
  const { t } = useLanguage();

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

              md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]

              lg:min-h-[330px]

              xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
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
          </div>
        </div>
      </div>
    </section>
  );
}