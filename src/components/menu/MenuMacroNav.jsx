import { menuMacros } from "../../data/menuData";
import { pagePath } from "../../lib/navigation";
import { getMacroPlainTitle } from "./menuText";

/*
 * =======================================================
 * NASTRO DELLE CARTE
 * =======================================================
 *
 * Stesso nastro della home (NavTabs): fondo
 * #E6DEC7, serif, voci separate da "·" e
 * scorrimento continuo con l'animazione
 * "marquee" già definita in index.css.
 *
 * Resta fermo sotto l'header mentre si
 * scorre la pagina. Le voci sono le sei
 * carte: ognuna porta alla sua pagina.
 *
 * - Il gruppo di voci è ripetuto 8 volte:
 *   l'animazione sposta del 12,5% (un
 *   gruppo), così il giro è senza stacchi.
 * - Solo il primo gruppo è leggibile dagli
 *   screen reader e raggiungibile da
 *   tastiera; le copie sono decorative.
 * - Si ferma al passaggio del mouse, al
 *   tocco prolungato e al focus.
 * - Con "riduci movimento" il nastro è
 *   fermo e si scorre a mano.
 * - La carta aperta è più scura e
 *   sottolineata; tutte le voci hanno lo
 *   stesso carattere.
 */

const COPIES = 8;

function MacroGroup({
  currentSlug,
  language,
  hidden = false,
}) {
  return (
    <ul
      aria-hidden={hidden ? "true" : undefined}
      className={`
        flex
        shrink-0
        items-center
        gap-[20px]
        pr-[20px]

        sm:gap-[26px]
        sm:pr-[26px]

        lg:gap-[30px]
        lg:pr-[30px]

        ${hidden ? "motion-reduce:hidden" : ""}
      `}
    >
      {menuMacros.map((macro) => {
        const isCurrent = macro.slug === currentSlug;

        return (
          <li
            key={macro.slug}
            className="
              flex
              shrink-0
              items-center
              gap-[20px]

              sm:gap-[26px]

              lg:gap-[30px]
            "
          >
            <a
              href={pagePath(`/menu/${macro.slug}`)}
              tabIndex={hidden ? -1 : undefined}
              aria-current={
                isCurrent && !hidden ? "page" : undefined
              }
              className={`
                block
                whitespace-nowrap
                py-[14px]

                transition-colors
                duration-300

                hover:text-[#2F2A21]

                focus-visible:text-[#2F2A21]
                focus-visible:outline-none

                ${
                  isCurrent
                    ? "text-[#2F2A21] underline decoration-[#7C644A] decoration-1 underline-offset-[6px]"
                    : "text-[#635B4E] no-underline focus-visible:underline"
                }
              `}
            >
              {getMacroPlainTitle(macro, language)}
            </a>

            <span
              aria-hidden="true"
              className="
                shrink-0

                text-[14px]
                text-[#635B4E]

                opacity-70

                sm:text-[15px]
                lg:text-[16px]
              "
            >
              ·
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function MenuMacroNav({
  currentSlug,
  language,
  label,
}) {
  return (
    <nav
      aria-label={label}
      className="
        group/ticker

        sticky
        top-[var(--site-header-height)]
        z-40

        flex
        h-[52px]
        w-full
        items-center
        overflow-hidden

        border-y
        border-[#BEB29A]

        bg-[#E6DEC7]

        font-serif
        text-[19px]
        font-normal
        leading-none
        text-[#635B4E]

        motion-reduce:overflow-x-auto
        motion-reduce:[scrollbar-width:none]

        sm:h-[56px]
        sm:text-[21px]

        lg:text-[22px]
      "
    >
      <div
        className="
          flex
          w-max
          will-change-transform

          animate-[marquee_30s_linear_infinite]

          group-hover/ticker:[animation-play-state:paused]
          group-active/ticker:[animation-play-state:paused]
          focus-within:[animation-play-state:paused]

          sm:animate-[marquee_34s_linear_infinite]

          lg:animate-[marquee_38s_linear_infinite]

          motion-reduce:animate-none
        "
      >
        {Array.from({ length: COPIES }).map(
          (_, index) => (
            <MacroGroup
              key={index}
              currentSlug={currentSlug}
              language={language}
              hidden={index !== 0}
            />
          )
        )}
      </div>
    </nav>
  );
}
