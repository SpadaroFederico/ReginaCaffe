import { motion } from "framer-motion";

import { getLocalizedValue } from "../../i18n/localize";
import {
  getContainerVariants,
  getItemVariants,
  getRevealVariants,
} from "./menuMotion";

/*
 * =======================================================
 * RIQUADRO DI UNA SEZIONE DEL MENU
 * =======================================================
 *
 * Stesso linguaggio visivo della pagina menu
 * originale: riquadro con bordo sottile,
 * occhiello "Regina Caffè", titolo in serif
 * e voci nome · puntini · prezzo.
 *
 * Le sezioni con columns (birre, gin) usano
 * la riga compatta su due colonne, identica
 * a prima.
 *
 * In più rispetto all'originale:
 * - gruppi interni con titolo (es. Scotch Whisky)
 * - voci con più formati (calice / bottiglia)
 * - nota accanto al prezzo (es. "a persona")
 */

/*
 * Altezza del nastro sticky delle carte:
 * le ancore devono fermarsi sotto header
 * e nastro, non dietro.
 */
const SCROLL_MARGIN = "calc(var(--site-header-height) + 64px)";

function Leader() {
  return (
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
  );
}

function ItemDescription({ children }) {
  return (
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
      {children}
    </p>
  );
}

function MenuItem({
  item,
  language,
  dense = false,
  itemVariants,
}) {
  const name = getLocalizedValue(item.name, language);

  const description = getLocalizedValue(
    item.description,
    language
  );

  const priceNote = getLocalizedValue(
    item.priceNote,
    language
  );

  const prices = item.prices ?? [];

  return (
    <motion.article
      variants={itemVariants}
      className={`
        group/item

        ${
          dense
            ? "border-b border-[#CDBF9F]/45 py-[10px] sm:py-[11px]"
            : "py-[13px] sm:py-[15px]"
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
          className={`
            min-w-0

            font-serif
            font-normal
            text-[#2F2A21]

            ${
              dense
                ? "leading-[1.12] text-[17px] sm:text-[18px] lg:text-[19px]"
                : "leading-[1.05] text-[21px] sm:text-[22px] lg:text-[23px]"
            }
          `}
        >
          {name}
        </h3>

        {item.price && (
          <>
            <Leader />

            <p
              className={`
                shrink-0

                text-right
                font-serif
                font-normal
                leading-none
                text-[#635B4E]

                ${
                  dense
                    ? "text-[17px] sm:text-[18px] lg:text-[19px]"
                    : "text-[20px] sm:text-[21px] lg:text-[22px]"
                }
              `}
            >
              {item.price}

              {priceNote && (
                <span
                  className="
                    mt-[4px]
                    block

                    font-sans
                    text-[11px]
                    tracking-[0.04em]
                    text-[#8A7558]

                    sm:text-[12px]
                  "
                >
                  {priceNote}
                </span>
              )}
            </p>
          </>
        )}
      </div>

      {prices.length > 0 && (
        <dl
          className="
            mt-[8px]
            grid
            gap-[7px]

            sm:mt-[9px]
          "
        >
          {prices.map((entry, index) => (
            <div
              key={index}
              className="
                flex
                items-baseline
                gap-[9px]

                pl-[2px]
              "
            >
              <dt
                className="
                  shrink-0

                  font-sans
                  text-[12px]
                  tracking-[0.04em]
                  text-[#70675A]

                  sm:text-[13px]
                "
              >
                {getLocalizedValue(entry.label, language)}
              </dt>

              <Leader />

              <dd
                className="
                  m-0
                  shrink-0

                  font-serif
                  text-[18px]
                  leading-none
                  text-[#635B4E]

                  sm:text-[19px]
                "
              >
                {entry.price}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {description && (
        <ItemDescription>{description}</ItemDescription>
      )}
    </motion.article>
  );
}

function MenuGroup({
  group,
  language,
  reduceMotion,
  isFirst,
}) {
  const title = getLocalizedValue(group.title, language);
  const intro = getLocalizedValue(group.intro, language);
  const columns = Boolean(group.columns);

  const itemVariants = getItemVariants(reduceMotion);

  return (
    <div
      className={
        isFirst
          ? ""
          : "mt-[22px] sm:mt-[26px]"
      }
    >
      {(title || intro) && (
        <motion.div
          variants={itemVariants}
          className={
            isFirst && !title
              ? "pt-[14px]"
              : "pt-[14px] sm:pt-[16px]"
          }
        >
          {title && (
            <h3
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
              {title}
            </h3>
          )}

          {intro && (
            <p
              className={`
                ${title ? "mt-[7px]" : ""}

                max-w-[660px]

                font-sans
                text-[11px]
                leading-[17px]
                text-[#635B4E]

                sm:text-[12px]
                sm:leading-[19px]
              `}
            >
              {intro}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        variants={getContainerVariants(reduceMotion)}
        className={
          columns
            ? `
              grid
              grid-cols-1
              gap-x-[24px]

              sm:grid-cols-2

              xl:gap-x-[32px]
            `
            : `
              divide-y
              divide-[#CDBF9F]/45
            `
        }
      >
        {group.items.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            language={language}
            dense={columns}
            itemVariants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function MenuSectionCard({
  section,
  language,
  tone = "light",
  reduceMotion,
}) {
  const title = getLocalizedValue(section.title, language);
  const intro = getLocalizedValue(section.intro, language);

  const background =
    tone === "sand"
      ? "bg-[#E8DFC8]"
      : "bg-[#F5F2EA]";

  return (
    <motion.section
      id={section.id}
      style={{
        scrollMarginTop: SCROLL_MARGIN,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      variants={getRevealVariants(reduceMotion)}
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
        variants={getItemVariants(reduceMotion)}
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
        variants={getContainerVariants(reduceMotion)}
      >
        {section.groups.map((group, index) => (
          <MenuGroup
            key={index}
            group={group}
            language={language}
            reduceMotion={reduceMotion}
            isFirst={index === 0}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
