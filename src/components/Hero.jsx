import {
  useEffect,
  useState,
} from "react";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useImageRotation } from "../lib/useImageRotation";
import { pagePath } from "../lib/navigation";

/*
 * =======================================================
 * IMMAGINI DELL'HERO
 * =======================================================
 *
 * Si alternano nello stesso riquadro a
 * destra, in dissolvenza incrociata.
 *
 * La transizione riusa esattamente la stessa
 * animazione con cui l'immagine entra al
 * primo caricamento: stessa durata, stessa
 * curva e stessa combinazione scala+opacità
 * già impiegata nel resto della pagina.
 */
const HERO_IMAGES = [
  "/heroimg1.webp",
  "/heroimg2.webp",
  "/heroimg3.webp",
];

const HERO_ROTATION_MS = 6000;

const HERO_MASK =
  "linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.82) 6%, black 15%, black 100%)";

export default function Hero() {
  const { t } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  const activeImage = useImageRotation(
    HERO_IMAGES.length,
    HERO_ROTATION_MS
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);


  return (
    <section
      className="
        group/hero
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
            overflow-hidden

            lg:block
            xl:w-[56%]
          "
        >
          {HERO_IMAGES.map(
            (source, index) => (
              <img
                key={source}
                src={source}
                alt=""
                aria-hidden="true"
                decoding="async"
                fetchPriority={
                  index === 0
                    ? "high"
                    : "low"
                }
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

                  transition-[opacity,transform,filter]
                  duration-[1200ms]

                  [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                  motion-reduce:transition-none

                  lg:group-hover/hero:scale-[1.018]
                  lg:group-hover/hero:brightness-[0.94]

                  ${
                    isReady &&
                    index === activeImage
                      ? "scale-100 opacity-100"
                      : "scale-[1.035] opacity-0"
                  }
                `}
                style={{
                  WebkitMaskImage:
                    HERO_MASK,
                  maskImage: HERO_MASK,
                }}
              />
            )
          )}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              bg-[#2F2A21]/[0.025]

              transition-colors
              duration-700

              group-hover/hero:bg-[#2F2A21]/[0.01]
            "
          />
        </div>

        <img
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            z-[1]
            max-w-none
            object-contain

            right-[8px]
            top-[2px]
            w-[205px]

            sm:right-[28px]
            sm:top-[-3px]
            sm:w-[250px]

            md:right-[10%]
            md:top-[-0px]
            md:w-[280px]

            transition-[opacity,transform]
            duration-[1000ms]

            delay-100

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            motion-reduce:transition-none

            ${
              isReady
                ? "translate-y-0 opacity-[0.17]"
                : "translate-y-[10px] opacity-0"
            }
          `}
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
            <span
              className={`
                block
                text-[#2F2A21]

                transition-[opacity,transform]
                duration-[800ms]

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                motion-reduce:transition-none

                ${
                  isReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[16px] opacity-0"
                }
              `}
            >
              Regina
            </span>

            <span
              className={`
                ml-[23px]
                block
                italic
                text-[#635B4E]

                transition-[opacity,transform]
                duration-[850ms]

                delay-[70ms]

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                motion-reduce:transition-none

                sm:ml-[30px]
                md:ml-[34px]
                lg:ml-[40px]

                ${
                  isReady
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[18px] opacity-0"
                }
              `}
            >
              Caffè
            </span>
          </h1>

          <p
            className={`
              mt-[20px]
              max-w-[245px]

              font-sans
              text-[14px]
              font-normal
              leading-[22px]
              text-[#2F2A21]

              transition-[opacity,transform]
              duration-[850ms]

              delay-[150ms]

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              motion-reduce:transition-none

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

              ${
                isReady
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[14px] opacity-0"
              }
            `}
          >
            {t("hero.description")}
          </p>

          <a
            href={pagePath("/menu")}
            className={`
              group/hero-cta
              relative

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

              transition-[opacity,transform,color,border-color]
              duration-[850ms]

              delay-[240ms]

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              hover:-translate-y-[1px]
              hover:border-[#7C644A]/45
              hover:text-[#635B4E]

              focus-visible:-translate-y-[1px]
              focus-visible:text-[#635B4E]
              focus-visible:outline-none

              motion-reduce:transition-none

              sm:mt-[25px]
              sm:w-[165px]
              sm:text-[22px]

              lg:w-[180px]
              lg:text-[23px]

              ${
                isReady
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[12px] opacity-0"
              }
            `}
          >
            <span>{t("hero.menu")}</span>

            <ArrowUpRight
              strokeWidth={1.4}
              className="
                h-[16px]
                w-[16px]
                shrink-0

                transition-transform
                duration-400

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                group-hover/hero-cta:-translate-y-[2px]
                group-hover/hero-cta:translate-x-[2px]

                group-focus-visible/hero-cta:-translate-y-[2px]
                group-focus-visible/hero-cta:translate-x-[2px]

                sm:h-[18px]
                sm:w-[18px]
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                -bottom-px
                left-0

                h-px
                w-full

                origin-left
                scale-x-0

                bg-[#7C644A]

                transition-transform
                duration-500

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                group-hover/hero-cta:scale-x-100
                group-focus-visible/hero-cta:scale-x-100
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}