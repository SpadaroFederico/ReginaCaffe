import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-bg
      "
    >
      <div
        className="
          relative
          mx-auto
          h-[305px]
          w-full
          max-w-[1280px]

          px-[14px]
          pt-[40px]

          sm:h-[360px]
          sm:px-6
          sm:pt-[52px]

          md:h-[405px]
          md:px-8
          md:pt-[60px]

          lg:h-[455px]
          lg:px-10
          lg:pt-[68px]

          xl:h-[475px]
          xl:px-12
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-0

            hidden
            w-[54%]

            lg:block
            xl:w-[56%]
          "
        >
          <img
            src="/bancon.webp"
            alt=""
            aria-hidden="true"
            className="
              h-full
              w-full

              object-cover
              object-center

              brightness-[0.91]
              saturate-[0.92]
              contrast-[1.03]
            "
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.82) 6%, black 15%, black 100%)",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.82) 6%, black 15%, black 100%)",
            }}
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[#2F2A21]/[0.025]
            "
          />
        </div>

        <img
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            z-[1]
            max-w-none
            object-contain
            opacity-[0.17]

            right-[8px]
            top-[2px]
            w-[205px]

            sm:right-[28px]
            sm:top-[-3px]
            sm:w-[250px]

            md:right-[10%]
            md:top-[-0px]
            md:w-[280px]
          "
        />

        <div
          className="
            relative
            z-10
            max-w-[245px]

            sm:max-w-[350px]
            md:max-w-[430px]

            lg:max-w-[455px]

            xl:max-w-[480px]
          "
        >
          <h1
            className="
              font-serif
              text-[44px]
              font-normal
              leading-[0.92]

              sm:text-[56px]
              md:text-[66px]
              lg:text-[78px]
              xl:text-[82px]
            "
          >
            <span className="block text-[#2F2A21]">
              Regina
            </span>

            <span
              className="
                ml-[23px]
                block
                italic
                text-[#635B4E]

                sm:ml-[30px]
                md:ml-[34px]
                lg:ml-[40px]
              "
            >
              Caffè
            </span>
          </h1>

          <p
            className="
              mt-[20px]
              max-w-[245px]

              font-sans
              text-[14px]
              font-normal
              leading-[22px]
              text-[#2F2A21]

              sm:mt-[25px]
              sm:max-w-[340px]
              sm:text-[16px]
              sm:leading-[25px]

              md:max-w-[390px]
              md:text-[17px]
              md:leading-[27px]

              lg:mt-[28px]
              lg:max-w-[420px]
              lg:text-[18px]
              lg:leading-[29px]
            "
          >
            {t("hero.description")}
          </p>

          <a
            href="#menu"
            className="
              mt-[20px]
              inline-flex
              w-[144px]
              items-center
              justify-between

              border-b
              border-[#A9A6A0]
              pb-[7px]

              font-serif
              text-[20px]
              font-normal
              leading-[24px]
              text-[#2F2A21]
              no-underline

              transition-opacity
              duration-200

              hover:opacity-60

              sm:mt-[25px]
              sm:w-[165px]
              sm:text-[22px]

              lg:w-[180px]
              lg:text-[23px]
            "
          >
            <span>{t("hero.menu")}</span>

            <ArrowUpRight
              strokeWidth={1.4}
              className="
                h-[16px]
                w-[16px]
                shrink-0

                sm:h-[18px]
                sm:w-[18px]
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}