import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { menuPageData } from "../data/menuData";
import { useLanguage } from "../i18n/LanguageContext";

function getLocalizedValue(
  value,
  language
) {
  if (
    typeof value === "string"
  ) {
    return value;
  }

  return (
    value?.[language] ??
    value?.it ??
    ""
  );
}

function getRevealVariants(
  reduceMotion
) {
  return {
    hidden: {
      opacity: reduceMotion
        ? 1
        : 0,

      y: reduceMotion
        ? 0
        : 22,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration:
          reduceMotion
            ? 0
            : 0.72,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      },
    },
  };
}

function getContainerVariants(
  reduceMotion
) {
  return {
    hidden: {},

    visible: {
      transition: {
        staggerChildren:
          reduceMotion
            ? 0
            : 0.055,

        delayChildren:
          reduceMotion
            ? 0
            : 0.05,
      },
    },
  };
}

function getItemVariants(
  reduceMotion
) {
  return {
    hidden: {
      opacity: reduceMotion
        ? 1
        : 0,

      y: reduceMotion
        ? 0
        : 10,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration:
          reduceMotion
            ? 0
            : 0.52,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      },
    },
  };
}

function MenuItem({
  item,
  language,
  compact = false,
  itemVariants,
}) {
  const name =
    getLocalizedValue(
      item.name,
      language
    );

  const description =
    getLocalizedValue(
      item.description,
      language
    );

  return (
    <motion.article
      variants={
        itemVariants
      }
      className={`
        group/item

        py-[13px]

        ${
          compact
            ? "sm:py-[12px]"
            : "sm:py-[15px]"
        }
      `}
    >
      <div
        className="
          flex
          items-baseline
          gap-[9px]
        "
      >
        <h3
          className="
            shrink-0

            font-serif
            text-[21px]
            font-normal
            leading-none
            text-[#2F2A21]

            sm:text-[22px]

            lg:text-[23px]
          "
        >
          {name}
        </h3>

        <span
          aria-hidden="true"
          className="
            relative
            top-[-3px]

            min-w-[16px]
            flex-1

            border-b
            border-dotted
            border-[#B9A37A]/55
          "
        />

        <p
          className="
            shrink-0

            font-serif
            text-[20px]
            font-normal
            leading-none
            text-[#635B4E]

            sm:text-[21px]

            lg:text-[22px]
          "
        >
          {item.price}
        </p>
      </div>

      {description && (
        <p
          className="
            mt-[6px]
            max-w-[620px]

            font-sans
            text-[11px]
            leading-[17px]
            text-[#70675A]

            sm:text-[12px]
            sm:leading-[18px]

            lg:text-[12px]
            lg:leading-[19px]
          "
        >
          {description}
        </p>
      )}
    </motion.article>
  );
}

function MenuSection({
  section,
  language,
  tone = "light",
  compact = false,
  reduceMotion,
}) {
  const title =
    getLocalizedValue(
      section.title,
      language
    );

  const intro =
    getLocalizedValue(
      section.intro,
      language
    );

  const background =
    tone === "sand"
      ? "bg-[#E8DFC8]"
      : "bg-[#F5F2EA]";

  const revealVariants =
    getRevealVariants(
      reduceMotion
    );

  const containerVariants =
    getContainerVariants(
      reduceMotion
    );

  const itemVariants =
    getItemVariants(
      reduceMotion
    );

  return (
    <motion.section
      id={section.id}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      variants={
        revealVariants
      }
      className={`
        ${background}

        border
        border-[#CDBF9F]/70

        px-[18px]
        py-[21px]

        sm:px-[24px]
        sm:py-[25px]

        lg:px-[28px]
        lg:py-[29px]
      `}
    >
      <motion.div
        variants={
          getItemVariants(
            reduceMotion
          )
        }
        className="
          border-b
          border-[#B9A37A]/70

          pb-[17px]

          sm:pb-[19px]
        "
      >
        <p
          className="
            font-sans
            text-[8px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[#8A7558]

            sm:text-[9px]
          "
        >
          Regina Caffè
        </p>

        <h2
          className="
            mt-[7px]

            font-serif
            text-[35px]
            font-normal
            leading-[0.94]
            text-[#2F2A21]

            sm:text-[42px]

            lg:text-[46px]
          "
        >
          {title}
        </h2>

        {intro && (
          <p
            className="
              mt-[11px]
              max-w-[660px]

              font-sans
              text-[11px]
              leading-[17px]
              text-[#635B4E]

              sm:text-[12px]
              sm:leading-[19px]

              lg:text-[13px]
              lg:leading-[20px]
            "
          >
            {intro}
          </p>
        )}
      </motion.div>

      <motion.div
        variants={
          containerVariants
        }
        className="
          divide-y
          divide-[#CDBF9F]/45
        "
      >
        {section.items.map(
          (item, index) => (
            <MenuItem
              key={`${section.id}-${index}`}
              item={item}
              language={language}
              compact={compact}
              itemVariants={
                itemVariants
              }
            />
          )
        )}
      </motion.div>
    </motion.section>
  );
}

function AllergensNotice({
  reduceMotion,
  t,
  className = "",
}) {
  return (
    <motion.aside
      initial={{
        opacity:
          reduceMotion
            ? 1
            : 0,

        y:
          reduceMotion
            ? 0
            : 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration:
          reduceMotion
            ? 0
            : 0.72,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={`
        border-y
        border-[#CDBF9F]/80

        px-[6px]
        py-[28px]

        sm:px-[12px]
        sm:py-[34px]

        lg:border
        lg:border-[#CDBF9F]/70

        lg:bg-[#F5F2EA]

        lg:px-[22px]
        lg:py-[22px]

        xl:px-[26px]
        xl:py-[24px]

        ${className}
      `}
    >
      <div
        className="
          w-full

          lg:grid
          lg:grid-cols-[135px_minmax(0,1fr)]
          lg:items-start
          lg:gap-[28px]

          xl:grid-cols-[150px_minmax(0,1fr)]
          xl:gap-[36px]
        "
      >
        <motion.div
          initial={{
            opacity:
              reduceMotion
                ? 1
                : 0,

            x:
              reduceMotion
                ? 0
                : -10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.6,

            delay:
              reduceMotion
                ? 0
                : 0.05,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <p
            className="
              font-sans
              text-[8px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#8A7558]

              sm:text-[9px]
            "
          >
            {t(
              "menu.allergensEyebrow"
            )}
          </p>

          <h2
            className="
              mt-[7px]

              font-serif
              text-[32px]
              font-normal
              leading-[0.95]
              text-[#2F2A21]

              sm:text-[38px]

              lg:text-[31px]

              xl:text-[34px]
            "
          >
            {t(
              "menu.allergensTitle"
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{
            opacity:
              reduceMotion
                ? 1
                : 0,

            y:
              reduceMotion
                ? 0
                : 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.66,

            delay:
              reduceMotion
                ? 0
                : 0.11,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-[18px]

            lg:mt-0
          "
        >
          <p
            className="
              font-serif
              text-[22px]
              font-normal
              leading-[1.08]
              text-[#2F2A21]

              sm:text-[25px]

              lg:text-[21px]

              xl:text-[23px]
            "
          >
            {t(
              "menu.allergensQuestion"
            )}
          </p>

          <p
            className="
              mt-[10px]

              max-w-[680px]

              font-sans
              text-[12px]
              leading-[19px]
              text-[#635B4E]

              sm:text-[13px]
              sm:leading-[21px]

              lg:text-[11px]
              lg:leading-[18px]

              xl:text-[12px]
              xl:leading-[19px]
            "
          >
            {t(
              "menu.allergensText"
            )}
          </p>

          <p
            className="
              mt-[8px]

              max-w-[680px]

              font-sans
              text-[10px]
              leading-[17px]
              text-[#8A8174]

              sm:text-[11px]
              sm:leading-[18px]

              lg:text-[10px]
              lg:leading-[16px]

              xl:text-[11px]
              xl:leading-[17px]
            "
          >
            {t(
              "menu.allergensNote"
            )}
          </p>
        </motion.div>
      </div>
    </motion.aside>
  );
}

export default function MenuPage() {
  const {
    language,
    t,
  } = useLanguage();

  const reduceMotion =
    useReducedMotion();

  const starters =
    menuPageData.sections.find(
      (section) =>
        section.id ===
        "starters"
    );

  const fried =
    menuPageData.sections.find(
      (section) =>
        section.id ===
        "fried"
    );

  const baguettes =
    menuPageData.sections.find(
      (section) =>
        section.id ===
        "baguettes"
    );

  const desserts =
    menuPageData.sections.find(
      (section) =>
        section.id ===
        "desserts"
    );

  const headerEase = [
    0.22,
    1,
    0.36,
    1,
  ];

  return (
    <main
      className="
        min-h-screen
        bg-[#F2F1EC]
        text-[#2F2A21]
      "
    >
      {/* ===================================================
          TESTATA
          =================================================== */}

      <section
        className="
          overflow-hidden

          border-b
          border-[#CDBF9F]/80
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1320px]

            px-[16px]
            pb-[32px]
            pt-[24px]

            sm:px-6
            sm:pb-[40px]
            sm:pt-[30px]

            lg:px-10
            lg:pb-[52px]
            lg:pt-[38px]

            xl:px-12
          "
        >
          <motion.a
            href="/"
            initial={{
              opacity:
                reduceMotion
                  ? 1
                  : 0,

              x:
                reduceMotion
                  ? 0
                  : -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.55,

              delay:
                reduceMotion
                  ? 0
                  : 0.05,

              ease:
                headerEase,
            }}
            className="
              group/back

              inline-flex
              items-center
              gap-[8px]

              font-sans
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#635B4E]
              no-underline

              transition-colors
              duration-300

              hover:text-[#2F2A21]

              focus-visible:text-[#2F2A21]
              focus-visible:outline-none
            "
          >
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={1.3}
              className="
                h-[14px]
                w-[14px]

                transition-transform
                duration-300

                group-hover/back:-translate-x-[3px]
                group-focus-visible/back:-translate-x-[3px]
              "
            />

            {t(
              "menu.backHome"
            )}
          </motion.a>

          <div
            className="
              mt-[28px]

              grid
              gap-[26px]

              lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]
              lg:items-end
              lg:gap-[64px]

              xl:gap-[90px]
            "
          >
            <div>
              <motion.p
                initial={{
                  opacity:
                    reduceMotion
                      ? 1
                      : 0,

                  y:
                    reduceMotion
                      ? 0
                      : 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.6,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.12,

                  ease:
                    headerEase,
                }}
                className="
                  font-sans
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.38em]
                  text-[#8A7558]

                  sm:text-[9px]
                "
              >
                {t(
                  "menu.eyebrow"
                )}
              </motion.p>

              <motion.h1
                initial={{
                  opacity:
                    reduceMotion
                      ? 1
                      : 0,

                  y:
                    reduceMotion
                      ? 0
                      : 28,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.9,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.17,

                  ease:
                    headerEase,
                }}
                className="
                  mt-[9px]

                  font-serif
                  text-[58px]
                  font-normal
                  leading-[0.84]
                  tracking-[-0.025em]
                  text-[#2F2A21]

                  sm:text-[76px]

                  lg:text-[92px]

                  xl:text-[108px]
                "
              >
                {t(
                  "menu.title"
                )}
              </motion.h1>

              <motion.p
                initial={{
                  opacity:
                    reduceMotion
                      ? 1
                      : 0,

                  y:
                    reduceMotion
                      ? 0
                      : 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.72,

                  delay:
                    reduceMotion
                      ? 0
                      : 0.3,

                  ease:
                    headerEase,
                }}
                className="
                  mt-[18px]
                  max-w-[680px]

                  font-sans
                  text-[13px]
                  leading-[20px]
                  text-[#635B4E]

                  sm:text-[14px]
                  sm:leading-[22px]

                  lg:text-[15px]
                  lg:leading-[23px]
                "
              >
                {t(
                  "menu.intro"
                )}
              </motion.p>
            </div>

            <motion.aside
              initial={{
                opacity:
                  reduceMotion
                    ? 1
                    : 0,

                x:
                  reduceMotion
                    ? 0
                    : 18,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration:
                  reduceMotion
                    ? 0
                    : 0.76,

                delay:
                  reduceMotion
                    ? 0
                    : 0.36,

                ease:
                  headerEase,
              }}
              className="
                border-l
                border-[#B9A37A]

                pl-[18px]

                sm:pl-[22px]

                lg:mb-[4px]
                lg:pl-[26px]
              "
            >
              <p
                className="
                  font-serif
                  text-[24px]
                  leading-[1]
                  text-[#2F2A21]

                  sm:text-[28px]
                "
              >
                {t(
                  "menu.staffTitle"
                )}
              </p>

              <p
                className="
                  mt-[9px]

                  font-sans
                  text-[11px]
                  leading-[18px]
                  text-[#635B4E]

                  sm:text-[12px]
                  sm:leading-[19px]
                "
              >
                {t(
                  "menu.staffText"
                )}
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ===================================================
          CORPO MENU
          =================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1320px]

          px-[12px]
          pb-[12px]
          pt-[18px]

          sm:px-5
          sm:pb-[20px]
          sm:pt-[26px]

          lg:px-10
          lg:pb-[34px]
          lg:pt-[38px]

          xl:px-12
          xl:pt-[42px]
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-[12px]

            sm:gap-[16px]

            lg:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.45fr)]
            lg:items-stretch
            lg:gap-[18px]

            xl:grid-cols-[minmax(340px,0.74fr)_minmax(0,1.5fr)]
            xl:gap-[22px]
          "
        >
          {/* ===============================================
              COLONNA SINISTRA
              =============================================== */}

          <div
            className="
              grid
              gap-[12px]

              sm:gap-[16px]

              lg:gap-[18px]

              xl:gap-[22px]
            "
          >
            <MenuSection
              section={
                starters
              }
              language={
                language
              }
              compact
              reduceMotion={
                reduceMotion
              }
            />

            <MenuSection
              section={
                fried
              }
              language={
                language
              }
              tone="sand"
              compact
              reduceMotion={
                reduceMotion
              }
            />

            <MenuSection
              section={
                desserts
              }
              language={
                language
              }
              compact
              reduceMotion={
                reduceMotion
              }
            />
          </div>

          {/* ===============================================
              COLONNA DESTRA

              Desktop:
              baguette in alto,
              allergeni compatti in fondo.

              Mobile/tablet:
              normale flusso verticale.
              =============================================== */}

          <div
            className="
              grid
              gap-[12px]

              sm:gap-[16px]

              lg:flex
              lg:h-full
              lg:flex-col
              lg:gap-[18px]

              xl:gap-[22px]
            "
          >
            <MenuSection
              section={
                baguettes
              }
              language={
                language
              }
              tone="sand"
              reduceMotion={
                reduceMotion
              }
            />

            <AllergensNotice
              reduceMotion={
                reduceMotion
              }
              t={t}
              className="
                lg:mt-auto
              "
            />
          </div>
        </div>

        {/* =================================================
            CHIUSURA
            ================================================= */}

        <motion.div
          initial={{
            opacity:
              reduceMotion
                ? 1
                : 0,

            y:
              reduceMotion
                ? 0
                : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.65,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            flex
            justify-center

            pb-[18px]
            pt-[32px]

            sm:pb-[28px]
            sm:pt-[40px]

            lg:pb-[38px]
            lg:pt-[46px]
          "
        >
          <a
            href="/#consigliati"
            className="
              group/end

              inline-flex
              items-center
              gap-[10px]

              border-b
              border-[#A9A6A0]

              pb-[6px]

              font-serif
              text-[20px]
              text-[#2F2A21]
              no-underline

              transition-[color,border-color]
              duration-300

              hover:border-[#7C644A]
              hover:text-[#635B4E]

              focus-visible:border-[#7C644A]
              focus-visible:text-[#635B4E]
              focus-visible:outline-none

              sm:text-[22px]
            "
          >
            <span>
              {t(
                "menu.backToSuggestions"
              )}
            </span>

            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.3}
              className="
                h-[16px]
                w-[16px]

                transition-transform
                duration-300

                group-hover/end:-translate-y-[2px]
                group-hover/end:translate-x-[2px]

                group-focus-visible/end:-translate-y-[2px]
                group-focus-visible/end:translate-x-[2px]
              "
            />
          </a>
        </motion.div>
      </section>
    </main>
  );
}