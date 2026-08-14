import { Menu } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    {
      label: t("header.events"),
      href: "#eventi",
    },
    {
      label: t("header.recommended"),
      href: "#consigliati",
    },
    {
      label: t("header.hours"),
      href: "#orari",
    },
    {
      label: t("header.social"),
      href: "#social",
    },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#D8CFBA]/60
        bg-[#F3EDDE]
      "
    >
      <div
        className="
          mx-auto
          grid
          h-[48px]
          w-full
          max-w-[1280px]
          grid-cols-[1fr_auto]
          items-center
          px-[16px]

          sm:h-[56px]
          sm:px-6

          lg:h-[68px]
          lg:grid-cols-[1fr_auto_1fr]
          lg:px-10

          xl:px-12
        "
      >
        <a
          href="/"
          aria-label={t("header.homeAria")}
          className="
            flex
            items-center
            justify-self-start
          "
        >
          <img
            src="/logo.svg"
            alt="Regina Caffè"
            className="
              h-[26px]
              w-auto
              object-contain

              sm:h-[29px]
              lg:h-[60px]
            "
          />
        </a>

        <nav
          aria-label="Navigazione principale"
          className="
            hidden
            items-center
            justify-center
            gap-[30px]

            lg:flex
            xl:gap-[38px]
          "
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                group
                relative
                flex
                flex-col
                items-center

                font-serif
                text-[19px]
                font-normal
                leading-none
                text-[#2F2A21]
                no-underline

                transition-all
                duration-300

                hover:-translate-y-[1px]
                hover:text-[#635B4E]

                xl:text-[20px]
              "
            >
              {item.label}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-[9px]

                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[#7C644A]

                  opacity-0

                  transition-all
                  duration-300

                  group-hover:opacity-100
                "
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={t("header.openMenuAria")}
          className="
            flex
            h-[32px]
            w-[32px]
            items-center
            justify-center
            justify-self-end

            border-0
            bg-transparent
            p-0

            text-[#635B4E]

            transition-opacity
            duration-200

            hover:opacity-60

            lg:hidden
          "
        >
          <Menu
            size={20}
            strokeWidth={1.5}
          />
        </button>

        <div
          className="
            hidden
            items-center
            justify-self-end

            lg:flex
          "
        >
          <a
            href="#menu"
            className="
              font-serif
              text-[20px]
              font-normal
              text-[#2F2A21]
              no-underline

              transition-colors
              duration-200

              hover:text-[#635B4E]

              xl:text-[21px]
            "
          >
            {t("header.menu")}
          </a>

          <span
            aria-hidden="true"
            className="
              mx-[18px]
              h-[20px]
              w-px
              bg-[#BEB29A]

              xl:mx-[22px]
            "
          />

          <div
            className="
              flex
              items-center
              gap-[9px]

              font-sans
              text-[10px]
              font-medium
              tracking-[0.20em]

              xl:text-[11px]
            "
            aria-label={t("header.languageAria")}
          >
            <button
              type="button"
              onClick={() => setLanguage("it")}
              aria-pressed={language === "it"}
              className={`
                cursor-pointer
                border-0
                bg-transparent
                p-0

                transition-opacity
                duration-200

                ${
                  language === "it"
                    ? "text-[#2F2A21]"
                    : "text-[#8E8371] opacity-60"
                }
              `}
            >
              IT
            </button>

            <span
              aria-hidden="true"
              className="text-[#9E927D]"
            >
              /
            </span>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`
                cursor-pointer
                border-0
                bg-transparent
                p-0

                transition-opacity
                duration-200

                ${
                  language === "en"
                    ? "text-[#2F2A21]"
                    : "text-[#8E8371] opacity-60"
                }
              `}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}