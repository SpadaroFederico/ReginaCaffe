import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Menu,
  X,
} from "lucide-react";

import { useLanguage } from "../i18n/LanguageContext";

export default function Header() {
  const {
    language,
    setLanguage,
    t,
  } = useLanguage();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const toggleButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 320);

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setIsMobileMenuOpen(false);

      window.setTimeout(() => {
        toggleButtonRef.current?.focus();
      }, 0);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [isMobileMenuOpen]);

  const navigateToSection = (
    event,
    href,
    fromMobileMenu = false
  ) => {
    const target = document.querySelector(href);

    if (!target) {
      if (fromMobileMenu) {
        setIsMobileMenuOpen(false);
      }

      return;
    }

    event.preventDefault();

    const prefersReducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const performScroll = () => {
      target.scrollIntoView({
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth",
        block: "start",
      });

      window.history.pushState(
        null,
        "",
        href
      );
    };

    if (fromMobileMenu) {
      setIsMobileMenuOpen(false);

      window.setTimeout(
        performScroll,
        prefersReducedMotion ? 0 : 380
      );

      return;
    }

    performScroll();
  };

  return (
    <>
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
            grid-cols-[1fr_auto_1fr]
            items-center

            px-[16px]

            sm:h-[56px]
            sm:px-6

            md:h-[64px]
            md:px-8

            lg:h-[68px]
            lg:px-10

            xl:px-12
          "
        >
          {/* Logo */}
          <a
            href="/"
            aria-label={t("header.homeAria")}
            className="
              group/logo

              flex
              items-center
              justify-self-start

              rounded-sm

              focus-visible:outline-none
              focus-visible:ring-1
              focus-visible:ring-[#AD9060]/70
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#F3EDDE]
            "
          >
            <img
              src="/logo.svg"
              alt="Regina Caffè"
              className="
                h-[26px]
                w-auto
                object-contain

                transition-[transform,filter]
                duration-500

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                group-hover/logo:-translate-y-[1px]
                group-hover/logo:scale-[1.025]
                group-hover/logo:drop-shadow-[0_5px_8px_rgba(42,36,32,0.08)]

                sm:h-[29px]

                md:h-[50px]

                lg:h-[60px]
              "
            />
          </a>

          {/* Navigazione tablet / desktop */}
          <nav
            aria-label={t(
              "header.navigationAria"
            )}
            className="
              hidden
              items-center
              justify-center

              md:flex
              md:gap-[18px]

              lg:gap-[30px]

              xl:gap-[38px]
            "
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  navigateToSection(
                    event,
                    item.href
                  )
                }
                className="
                  group/nav
                  relative

                  flex
                  flex-col
                  items-center

                  font-serif
                  font-normal
                  leading-none
                  text-[#2F2A21]
                  no-underline

                  transition-[color,transform]
                  duration-300

                  [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-[1px]
                  hover:text-[#635B4E]

                  focus-visible:-translate-y-[1px]
                  focus-visible:text-[#635B4E]
                  focus-visible:outline-none

                  md:text-[17px]

                  lg:text-[19px]

                  xl:text-[20px]
                "
              >
                {item.label}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-[9px]
                    left-1/2

                    h-px
                    w-[24px]

                    origin-center
                    -translate-x-1/2
                    scale-x-0

                    bg-[#7C644A]

                    opacity-0

                    transition-[transform,opacity]
                    duration-400

                    [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                    group-hover/nav:scale-x-100
                    group-hover/nav:opacity-100

                    group-focus-visible/nav:scale-x-100
                    group-focus-visible/nav:opacity-100
                  "
                />
              </a>
            ))}
          </nav>

          {/* Hamburger mobile al centro */}
          <button
            ref={toggleButtonRef}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMobileMenuOpen
                ? t("header.closeMenuAria")
                : t("header.openMenuAria")
            }
            onClick={() =>
              setIsMobileMenuOpen(
                (current) => !current
              )
            }
            className="
              relative

              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              justify-self-center

              rounded-full
              border-0
              bg-transparent
              p-0

              text-[#635B4E]

              transition-[background-color,color,transform]
              duration-300

              hover:bg-[#E9E0CF]/75
              hover:text-[#2F2A21]

              active:scale-[0.94]

              focus-visible:outline-none
              focus-visible:ring-1
              focus-visible:ring-[#AD9060]/70

              md:hidden
            "
          >
            <Menu
              strokeWidth={1.5}
              className={`
                absolute
                h-[20px]
                w-[20px]

                transition-all
                duration-300

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                ${
                  isMobileMenuOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }
              `}
            />

            <X
              strokeWidth={1.35}
              className={`
                absolute
                h-[21px]
                w-[21px]

                transition-all
                duration-300

                [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                ${
                  isMobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0"
                }
              `}
            />
          </button>

          {/* Lingua sempre visibile su mobile */}
          <div
            role="group"
            aria-label={t(
              "header.languageAria"
            )}
            className="
              flex
              items-center
              justify-self-end
              gap-[6px]

              font-sans
              text-[9px]
              font-medium
              tracking-[0.16em]

              sm:gap-[8px]
              sm:text-[10px]

              md:hidden
            "
          >
            <button
              type="button"
              onClick={() =>
                setLanguage("it")
              }
              aria-pressed={
                language === "it"
              }
              className={`
                relative

                cursor-pointer
                border-0
                bg-transparent
                p-0

                transition-[color,opacity,transform]
                duration-300

                hover:-translate-y-[1px]
                hover:opacity-100

                focus-visible:outline-none
                focus-visible:text-[#2F2A21]

                ${
                  language === "it"
                    ? "text-[#2F2A21]"
                    : "text-[#8E8371] opacity-55"
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
              onClick={() =>
                setLanguage("en")
              }
              aria-pressed={
                language === "en"
              }
              className={`
                relative

                cursor-pointer
                border-0
                bg-transparent
                p-0

                transition-[color,opacity,transform]
                duration-300

                hover:-translate-y-[1px]
                hover:opacity-100

                focus-visible:outline-none
                focus-visible:text-[#2F2A21]

                ${
                  language === "en"
                    ? "text-[#2F2A21]"
                    : "text-[#8E8371] opacity-55"
                }
              `}
            >
              EN
            </button>
          </div>

          {/* Controlli tablet / desktop */}
          <div
            className="
              hidden
              items-center
              justify-self-end

              md:flex
            "
          >
            <a
              href="#menu"
              onClick={(event) =>
                navigateToSection(
                  event,
                  "#menu"
                )
              }
              className="
                group/header-menu
                relative

                font-serif
                font-normal
                text-[#2F2A21]
                no-underline

                transition-[color,transform]
                duration-300

                hover:-translate-y-[1px]
                hover:text-[#635B4E]

                focus-visible:-translate-y-[1px]
                focus-visible:text-[#635B4E]
                focus-visible:outline-none

                md:text-[18px]

                lg:text-[20px]

                xl:text-[21px]
              "
            >
              {t("header.menu")}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-[6px]
                  left-0

                  h-px
                  w-full

                  origin-left
                  scale-x-0

                  bg-[#7C644A]

                  transition-transform
                  duration-400

                  [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                  group-hover/header-menu:scale-x-100
                  group-focus-visible/header-menu:scale-x-100
                "
              />
            </a>

            <span
              aria-hidden="true"
              className="
                h-[18px]
                w-px
                bg-[#BEB29A]

                md:mx-[14px]

                lg:mx-[18px]
                lg:h-[20px]

                xl:mx-[22px]
              "
            />

            <div
              role="group"
              aria-label={t(
                "header.languageAria"
              )}
              className="
                flex
                items-center

                font-sans
                font-medium
                tracking-[0.20em]

                md:gap-[7px]
                md:text-[9px]

                lg:gap-[9px]
                lg:text-[10px]

                xl:text-[11px]
              "
            >
              <button
                type="button"
                onClick={() =>
                  setLanguage("it")
                }
                aria-pressed={
                  language === "it"
                }
                className={`
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0

                  transition-[opacity,color,transform]
                  duration-300

                  hover:-translate-y-[1px]
                  hover:opacity-100

                  focus-visible:outline-none
                  focus-visible:text-[#2F2A21]

                  ${
                    language === "it"
                      ? "text-[#2F2A21]"
                      : "text-[#8E8371] opacity-55"
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
                onClick={() =>
                  setLanguage("en")
                }
                aria-pressed={
                  language === "en"
                }
                className={`
                  cursor-pointer
                  border-0
                  bg-transparent
                  p-0

                  transition-[opacity,color,transform]
                  duration-300

                  hover:-translate-y-[1px]
                  hover:opacity-100

                  focus-visible:outline-none
                  focus-visible:text-[#2F2A21]

                  ${
                    language === "en"
                      ? "text-[#2F2A21]"
                      : "text-[#8E8371] opacity-55"
                  }
                `}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={t(
          "header.navigationAria"
        )}
        aria-hidden={!isMobileMenuOpen}
        className={`
          fixed
          inset-x-0
          bottom-0
          top-[48px]
          z-40

          overflow-hidden

          border-t
          border-[#D8CFBA]/70

          bg-[#F3EDDE]

          transition-[transform,opacity]
          duration-[520ms]

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          motion-reduce:transition-none

          sm:top-[56px]

          md:hidden

          ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full pointer-events-none opacity-0"
          }
        `}
      >
        <img
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2

            w-[290px]
            max-w-none

            -translate-x-1/2
            -translate-y-1/2

            opacity-[0.045]
          "
        />

        <div
          className="
            relative
            z-10

            flex
            h-full
            flex-col
            items-center
            justify-center

            px-8
            pb-10
          "
        >
          <p
            className={`
              font-sans
              text-[9px]
              font-medium
              uppercase
              tracking-[0.34em]
              text-[#635B4E]

              transition-[opacity,transform]
              duration-500

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              }
            `}
            style={{
              transitionDelay:
                isMobileMenuOpen
                  ? "100ms"
                  : "0ms",
            }}
          >
            {t("header.mobileMenuLabel")}
          </p>

          <nav
            aria-label={t(
              "header.navigationAria"
            )}
            className="
              mt-[30px]

              flex
              flex-col
              items-center
              gap-[18px]
            "
          >
            {navLinks.map(
              (item, index) => (
                <a
                  ref={
                    index === 0
                      ? firstMobileLinkRef
                      : undefined
                  }
                  key={item.href}
                  href={item.href}
                  tabIndex={
                    isMobileMenuOpen
                      ? 0
                      : -1
                  }
                  onClick={(event) =>
                    navigateToSection(
                      event,
                      item.href,
                      true
                    )
                  }
                  className={`
                    group/mobile-link
                    relative

                    font-serif
                    text-[36px]
                    font-normal
                    leading-none
                    text-[#2F2A21]
                    no-underline

                    transition-[opacity,transform,color,letter-spacing]
                    duration-500

                    [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                    hover:text-[#635B4E]
                    hover:tracking-[0.015em]

                    focus-visible:text-[#635B4E]
                    focus-visible:outline-none

                    ${
                      isMobileMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-5 opacity-0"
                    }
                  `}
                  style={{
                    transitionDelay:
                      isMobileMenuOpen
                        ? `${
                            150 +
                            index * 65
                          }ms`
                        : "0ms",
                  }}
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -bottom-[8px]
                      left-1/2

                      h-px
                      w-[28px]

                      origin-center
                      -translate-x-1/2
                      scale-x-0

                      bg-[#7C644A]

                      opacity-0

                      transition-[transform,opacity]
                      duration-400

                      group-hover/mobile-link:scale-x-100
                      group-hover/mobile-link:opacity-100

                      group-focus-visible/mobile-link:scale-x-100
                      group-focus-visible/mobile-link:opacity-100
                    "
                  />
                </a>
              )
            )}
          </nav>

          <div
            aria-hidden="true"
            className={`
              my-[26px]
              h-px
              w-[54px]
              bg-[#BEB29A]

              transition-[opacity,transform]
              duration-500

              ${
                isMobileMenuOpen
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0"
              }
            `}
            style={{
              transitionDelay:
                isMobileMenuOpen
                  ? "420ms"
                  : "0ms",
            }}
          />

          <a
            href="#menu"
            tabIndex={
              isMobileMenuOpen ? 0 : -1
            }
            onClick={(event) =>
              navigateToSection(
                event,
                "#menu",
                true
              )
            }
            className={`
              group/mobile-menu-link
              relative

              font-serif
              text-[25px]
              text-[#2F2A21]
              no-underline

              transition-[opacity,transform,color]
              duration-500

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              hover:text-[#635B4E]

              focus-visible:text-[#635B4E]
              focus-visible:outline-none

              ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }
            `}
            style={{
              transitionDelay:
                isMobileMenuOpen
                  ? "450ms"
                  : "0ms",
            }}
          >
            {t("header.menu")}

            <span
              aria-hidden="true"
              className="
                absolute
                -bottom-[7px]
                left-0

                h-px
                w-full

                origin-left
                scale-x-0

                bg-[#7C644A]

                transition-transform
                duration-400

                group-hover/mobile-menu-link:scale-x-100
                group-focus-visible/mobile-menu-link:scale-x-100
              "
            />
          </a>
        </div>
      </div>
    </>
  );
}