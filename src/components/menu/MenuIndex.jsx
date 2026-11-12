import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { menuMacros } from "../../data/menuData";
import { getLocalizedValue } from "../../i18n/localize";
import {
  pagePath,
  sectionHref,
} from "../../lib/navigation";
import AllergensNotice from "./AllergensNotice";
import MenuTitle from "./MenuTitle";
import {
  getEnterProps,
  MENU_EASE,
} from "./menuMotion";

const LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`;

/*
 * =======================================================
 * INDICE DEL MENU (/menu)
 * =======================================================
 *
 * È la pagina su cui arriva chi scansiona
 * il QR al tavolo: le carte devono essere
 * visibili subito, anche a 375px.
 *
 * Ogni riga riprende la lista "Le notti in
 * piazza": numero grande in serif al posto
 * della data, titolo con una parola in
 * italic, una riga di contenuto e freccia.
 */

function StaffNote({ t, className = "" }) {
  return (
    <aside
      className={`
        border-l
        border-[#B9A37A]

        pl-[18px]

        sm:pl-[22px]

        lg:pl-[26px]

        ${className}
      `}
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
        {t("menu.staffTitle")}
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
        {t("menu.staffText")}
      </p>
    </aside>
  );
}

function IndexRow({
  macro,
  index,
  language,
  reduceMotion,
}) {
  const number = String(index + 1).padStart(2, "0");

  const summary = getLocalizedValue(
    macro.summary,
    language
  );

  return (
    <motion.li
      initial={{
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : (index % 2) * 0.06,
        ease: MENU_EASE,
      }}
      className="
        border-b
        border-[#D8D2C6]

        md:odd:border-r
      "
    >
      <a
        href={pagePath(`/menu/${macro.slug}`)}
        className="
          group/macro

          grid
          grid-cols-[50px_minmax(0,1fr)_30px]
          items-start
          gap-x-[16px]

          px-[18px]
          py-[22px]

          text-[#2F2A21]
          no-underline

          transition-colors
          duration-500

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          hover:bg-[#ECEAE3]/65

          focus-visible:bg-[#ECEAE3]/65
          focus-visible:outline-none

          sm:grid-cols-[60px_minmax(0,1fr)_30px]
          sm:gap-x-[20px]
          sm:px-[24px]
          sm:py-[26px]

          lg:px-[32px]
          lg:py-[32px]

          xl:px-[36px]
          xl:py-[34px]
        "
      >
        <span
          aria-hidden="true"
          className="
            font-serif
            text-[42px]
            font-normal
            leading-[0.88]
            text-[#635B4E]

            transition-[transform,color]
            duration-500

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/macro:-translate-y-[2px]
            group-hover/macro:text-[#2F2A21]

            group-focus-visible/macro:-translate-y-[2px]
            group-focus-visible/macro:text-[#2F2A21]

            md:text-[46px]

            lg:text-[50px]
          "
        >
          {number}
        </span>

        <span
          className="
            min-w-0

            transition-transform
            duration-500

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/macro:translate-x-[2px]
            group-focus-visible/macro:translate-x-[2px]
          "
        >
          <span
            className="
              block

              font-serif
              text-[27px]
              font-normal
              leading-[1]
              text-[#2F2A21]

              md:text-[29px]

              lg:text-[31px]

              xl:text-[32px]
            "
          >
            <MenuTitle
              macro={macro}
              language={language}
            />
          </span>

          <span
            className="
              mt-[9px]
              block

              font-sans
              text-[14px]
              font-normal
              leading-[20px]
              text-[#635B4E]

              md:text-[15px]
              md:leading-[22px]
            "
          >
            {summary}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="
            mt-[2px]

            flex
            h-[30px]
            w-[30px]
            items-center
            justify-center

            rounded-full

            text-[#635B4E]

            transition-[transform,background-color,color]
            duration-400

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/macro:bg-[#DED4C2]/70
            group-hover/macro:text-[#2F2A21]

            group-focus-visible/macro:bg-[#DED4C2]/70
            group-focus-visible/macro:text-[#2F2A21]
          "
        >
          <ArrowUpRight
            strokeWidth={1.2}
            className="
              h-[18px]
              w-[18px]

              transition-transform
              duration-400

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              group-hover/macro:-translate-y-[2px]
              group-hover/macro:translate-x-[2px]

              group-focus-visible/macro:-translate-y-[2px]
              group-focus-visible/macro:translate-x-[2px]

              md:h-[20px]
              md:w-[20px]
            "
          />
        </span>
      </a>
    </motion.li>
  );
}

export default function MenuIndex({
  language,
  t,
  reduceMotion,
}) {
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
            pb-[26px]
            pt-[20px]

            sm:px-6
            sm:pb-[36px]
            sm:pt-[28px]

            lg:px-10
            lg:pb-[48px]
            lg:pt-[38px]

            xl:px-12
          "
        >
          <motion.a
            href={pagePath("/")}
            {...getEnterProps(reduceMotion, {
              x: -10,
              y: 0,
              delay: 0.05,
              duration: 0.55,
            })}
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

            {t("menu.backHome")}
          </motion.a>

          <div
            className="
              mt-[22px]

              grid
              gap-[26px]

              sm:mt-[28px]

              lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]
              lg:items-end
              lg:gap-[64px]

              xl:gap-[90px]
            "
          >
            <div>
              <motion.p
                {...getEnterProps(reduceMotion, {
                  y: 10,
                  delay: 0.12,
                  duration: 0.6,
                })}
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
                {t("menu.eyebrow")}
              </motion.p>

              <motion.h1
                {...getEnterProps(reduceMotion, {
                  y: 28,
                  delay: 0.17,
                  duration: 0.9,
                })}
                className="
                  mt-[9px]

                  font-serif
                  text-[54px]
                  font-normal
                  leading-[0.84]
                  tracking-[-0.025em]
                  text-[#2F2A21]

                  sm:text-[76px]

                  lg:text-[92px]

                  xl:text-[108px]
                "
              >
                {t("menu.title")}
              </motion.h1>

              <motion.p
                {...getEnterProps(reduceMotion, {
                  delay: 0.3,
                })}
                className="
                  mt-[16px]
                  max-w-[680px]

                  font-sans
                  text-[13px]
                  leading-[20px]
                  text-[#635B4E]

                  sm:mt-[18px]
                  sm:text-[14px]
                  sm:leading-[22px]

                  lg:text-[15px]
                  lg:leading-[23px]
                "
              >
                {t("menu.intro")}
              </motion.p>
            </div>

            {/* Su mobile la nota sta sotto l'indice:
                le carte devono comparire subito. */}
            <motion.div
              {...getEnterProps(reduceMotion, {
                x: 18,
                y: 0,
                delay: 0.36,
                duration: 0.76,
              })}
              className="
                hidden

                lg:mb-[4px]
                lg:block
              "
            >
              <StaffNote t={t} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================
          INDICE DELLE CARTE
          =================================================== */}

      <section
        aria-labelledby="menu-index-title"
        className="
          relative
          overflow-hidden
        "
      >
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-90px]
            top-[40px]

            w-[300px]
            max-w-none

            opacity-[0.045]

            sm:right-[-60px]
            sm:w-[380px]

            lg:right-[-30px]
            lg:top-[50px]
            lg:w-[360px]
          "
        />

        <div
          className="
            relative

            mx-auto
            w-full
            max-w-[1320px]

            px-0
            pb-[8px]
            pt-[22px]

            sm:px-6
            sm:pt-[30px]

            lg:px-10
            lg:pt-[40px]

            xl:px-12
          "
        >
          <h2
            id="menu-index-title"
            className="
              px-[18px]

              font-sans
              text-[10px]
              font-medium
              uppercase
              tracking-[0.34em]
              text-[#635B4E]

              sm:px-0
              sm:text-[11px]
            "
          >
            {t("menu.indexEyebrow")}
          </h2>

          <ol
            className="
              mt-[16px]

              grid
              grid-cols-1

              border-t
              border-[#D8D2C6]

              sm:mt-[20px]

              md:grid-cols-2
            "
          >
            {menuMacros.map((macro, index) => (
              <IndexRow
                key={macro.slug}
                macro={macro}
                index={index}
                language={language}
                reduceMotion={reduceMotion}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* ===================================================
          NOTE E CHIUSURA
          =================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1320px]

          px-[12px]
          pb-[12px]
          pt-[26px]

          sm:px-5
          sm:pt-[34px]

          lg:px-10
          lg:pt-[44px]

          xl:px-12
        "
      >
        <StaffNote
          t={t}
          className="
            mx-[6px]
            mb-[26px]

            sm:mx-[12px]

            lg:hidden
          "
        />

        <AllergensNotice
          reduceMotion={reduceMotion}
          t={t}
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
            href={sectionHref("consigliati")}
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
              {t("menu.backToSuggestions")}
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
        </div>
      </section>
    </main>
  );
}
