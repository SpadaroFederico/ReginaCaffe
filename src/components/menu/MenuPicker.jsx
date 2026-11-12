import { menuMacros } from "../../data/menuData";
import { pagePath } from "../../lib/navigation";
import MenuTitle from "./MenuTitle";

/*
 * =======================================================
 * SCELTA RAPIDA DI UN'ALTRA CARTA
 * =======================================================
 *
 * In fondo a ogni carta: le sei carte in
 * una griglia di riquadri grandi da
 * toccare (due colonne su mobile, tre da
 * tablet, sei in fila su desktop), con
 * numero in serif e titolo in italic come
 * nell'indice. La carta aperta è segnata.
 */

export default function MenuPicker({
  currentSlug,
  language,
  title,
  className = "",
}) {
  return (
    <nav
      aria-label={title}
      className={className}
    >
      <p
        className="
          px-[6px]

          font-sans
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-[#8A7558]

          sm:px-[12px]
          sm:text-[10px]

          lg:px-0
        "
      >
        {title}
      </p>

      <ul
        className="
          mt-[12px]

          grid
          grid-cols-2

          border-l
          border-t
          border-[#D8D2C6]

          sm:grid-cols-3

          lg:grid-cols-6
        "
      >
        {menuMacros.map((macro, index) => {
          const isCurrent = macro.slug === currentSlug;

          return (
            <li
              key={macro.slug}
              className="
                border-b
                border-r
                border-[#D8D2C6]
              "
            >
              <a
                href={pagePath(`/menu/${macro.slug}`)}
                aria-current={
                  isCurrent ? "page" : undefined
                }
                className={`
                  group/pick

                  flex
                  h-full
                  min-h-[84px]
                  flex-col
                  justify-between
                  gap-[10px]

                  px-[14px]
                  py-[14px]

                  no-underline

                  transition-colors
                  duration-300

                  hover:bg-[#ECEAE3]

                  focus-visible:bg-[#ECEAE3]
                  focus-visible:outline-none

                  sm:px-[18px]
                  sm:py-[16px]

                  ${
                    isCurrent
                      ? "bg-[#E6DEC7]"
                      : ""
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    font-serif
                    text-[22px]
                    leading-none
                    text-[#635B4E]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="
                    font-serif
                    text-[19px]
                    leading-[1.05]
                    text-[#2F2A21]

                    sm:text-[20px]
                  "
                >
                  <MenuTitle
                    macro={macro}
                    language={language}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
