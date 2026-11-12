import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { menuMacros } from "../../data/menuData";
import { getLocalizedValue } from "../../i18n/localize";
import { pagePath } from "../../lib/navigation";
import AllergensNotice from "./AllergensNotice";
import MenuMacroNav from "./MenuMacroNav";
import MenuPicker from "./MenuPicker";
import MenuSectionCard from "./MenuSectionCard";
import MenuTitle from "./MenuTitle";
import { getEnterProps } from "./menuMotion";

/*
 * =======================================================
 * SINGOLA CARTA (/menu/<slug>)
 * =======================================================
 *
 * Dall'alto:
 * - ritorno all'indice, numero e titolo;
 * - salti alle sezioni interne (es. Gin, Rum);
 * - nastro sticky con tutte le carte;
 * - i riquadri della carta;
 * - in fondo la scelta rapida di un'altra
 *   carta e gli allergeni.
 *
 * Su desktop i riquadri si dispongono su
 * due colonne (CSS columns), così le
 * sezioni corte non lasciano buchi.
 */

export default function MenuMacroView({
  macro,
  language,
  t,
  reduceMotion,
}) {
  const index = menuMacros.indexOf(macro);
  const number = String(index + 1).padStart(2, "0");

  const summary = getLocalizedValue(
    macro.summary,
    language
  );

  /*
   * Link diretto a una sezione, es.
   * /menu/distillati#rum: la pagina menu è
   * caricata dopo il documento, quindi il
   * browser non trova l'ancora da solo.
   */
  useEffect(() => {
    const id = decodeURIComponent(
      window.location.hash.slice(1)
    );

    if (!id) {
      return;
    }

    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ block: "start" });
    }
  }, []);

  const hasSeveralSections = macro.sections.length > 1;

  /*
   * Una sola sezione: un'unica colonna,
   * altrimenti metà pagina resterebbe vuota.
   */
  const layout = hasSeveralSections
    ? "lg:columns-2 lg:gap-[18px] xl:gap-[22px]"
    : "mx-auto max-w-[860px]";

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
            pb-[22px]
            pt-[20px]

            sm:px-6
            sm:pb-[30px]
            sm:pt-[28px]

            lg:px-10
            lg:pb-[40px]
            lg:pt-[38px]

            xl:px-12
          "
        >
          <motion.a
            href={pagePath("/menu")}
            {...getEnterProps(reduceMotion, {
              x: -10,
              y: 0,
              delay: 0.05,
              duration: 0.55,
            })}
            className="
              group/back

              -my-[10px]
              inline-flex
              items-center
              gap-[8px]

              py-[10px]

              font-sans
              text-[10px]
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

            {t("menu.backToIndex")}
          </motion.a>

          <div
            className="
              mt-[20px]

              flex
              items-start
              gap-[16px]

              sm:mt-[26px]
              sm:gap-[22px]

              lg:gap-[30px]
            "
          >
            <motion.span
              aria-hidden="true"
              {...getEnterProps(reduceMotion, {
                y: 18,
                delay: 0.12,
                duration: 0.8,
              })}
              className="
                pt-[4px]

                font-serif
                text-[42px]
                font-normal
                leading-[0.88]
                text-[#635B4E]

                sm:text-[54px]

                lg:text-[66px]
              "
            >
              {number}
            </motion.span>

            <div className="min-w-0">
              <motion.h1
                {...getEnterProps(reduceMotion, {
                  y: 24,
                  delay: 0.17,
                  duration: 0.9,
                })}
                className="
                  font-serif
                  text-[46px]
                  font-normal
                  leading-[0.9]
                  tracking-[-0.02em]
                  text-[#2F2A21]

                  sm:text-[64px]

                  lg:text-[80px]

                  xl:text-[92px]
                "
              >
                <MenuTitle
                  macro={macro}
                  language={language}
                />
              </motion.h1>

              <motion.p
                {...getEnterProps(reduceMotion, {
                  delay: 0.28,
                })}
                className="
                  mt-[12px]
                  max-w-[620px]

                  font-sans
                  text-[13px]
                  leading-[20px]
                  text-[#635B4E]

                  sm:mt-[16px]
                  sm:text-[14px]
                  sm:leading-[22px]

                  lg:text-[15px]
                  lg:leading-[23px]
                "
              >
                {summary}
              </motion.p>

              {/* Salti alle sezioni interne */}
              {hasSeveralSections && (
                <motion.nav
                  aria-label={t("menu.sectionsLabel")}
                  {...getEnterProps(reduceMotion, {
                    delay: 0.36,
                  })}
                  className="
                    mt-[14px]

                    sm:mt-[18px]
                  "
                >
                  <p
                    className="
                      font-sans
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.26em]
                      text-[#8A7558]

                      sm:text-[10px]
                    "
                  >
                    {t("menu.inThisMenu")}
                  </p>

                  <ul
                    className="
                      mt-[4px]

                      flex
                      flex-wrap
                      items-center
                      gap-x-[18px]

                      font-serif
                      text-[19px]
                      leading-none
                      text-[#2F2A21]

                      sm:text-[20px]
                    "
                  >
                    {macro.sections.map(
                      (section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="
                              block
                              py-[8px]

                              text-[#2F2A21]
                              underline
                              decoration-[#B9A37A]/60
                              decoration-1
                              underline-offset-[5px]

                              transition-colors
                              duration-300

                              hover:text-[#635B4E]
                              hover:decoration-[#7C644A]

                              focus-visible:text-[#635B4E]
                              focus-visible:outline-none
                            "
                          >
                            {getLocalizedValue(
                              section.title,
                              language
                            )}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </motion.nav>
              )}
            </div>
          </div>
        </div>
      </section>

      <MenuMacroNav
        currentSlug={macro.slug}
        language={language}
        label={t("menu.menusLabel")}
      />

      {/* ===================================================
          SEZIONI
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
        <div className={layout}>
          {macro.sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="
                mb-[12px]
                break-inside-avoid

                sm:mb-[16px]

                lg:mb-[18px]

                xl:mb-[22px]
              "
            >
              <MenuSectionCard
                section={section}
                language={language}
                tone={
                  sectionIndex % 2 === 1
                    ? "sand"
                    : "light"
                }
                reduceMotion={reduceMotion}
              />
            </div>
          ))}
        </div>

        <MenuPicker
          currentSlug={macro.slug}
          language={language}
          title={t("menu.otherMenus")}
          className="mt-[14px] lg:mt-[22px]"
        />

        <AllergensNotice
          reduceMotion={reduceMotion}
          t={t}
          className="mt-[26px] lg:mt-[22px]"
        />

        <div
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
            href={pagePath("/menu")}
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
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={1.3}
              className="
                h-[16px]
                w-[16px]

                transition-transform
                duration-300

                group-hover/end:-translate-x-[3px]
                group-focus-visible/end:-translate-x-[3px]
              "
            />

            <span>
              {t("menu.backToIndex")}
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
