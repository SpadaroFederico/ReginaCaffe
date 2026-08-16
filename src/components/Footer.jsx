import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";

import { useLanguage } from "../i18n/LanguageContext";
import { useLegal } from "../legal/LegalContext";

const HOME_URL = import.meta.env.BASE_URL;
const LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`;

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Regina+Caff%C3%A8%2C+Piazza+Regina+Margherita+21%2C+74023+Grottaglie+TA";

const PHONE_NUMBER = "+393456836439";
const WHATSAPP_NUMBER = "393456836439";

const INSTAGRAM_URL =
  "https://www.instagram.com/reginacaffe_grottaglie/";

const FACEBOOK_URL =
  "https://www.facebook.com/reginacaffegrottaglie/";

const TIKTOK_URL =
  "https://www.tiktok.com/@reginacaff_grotta";

const SEMPLIVO_URL =
  "https://semplivo.fspadaro.it/";

function FooterTitle({ children }) {
  return (
    <h3
      className="
        font-sans
        text-[9px]
        font-medium
        uppercase
        tracking-[0.28em]
        text-footer-text-sm

        sm:text-[10px]
      "
    >
      {children}
    </h3>
  );
}

function FooterNavLink({
  href,
  children,
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="
        group/footer-nav
        relative

        inline-flex
        w-fit
        items-center
        gap-[8px]

        font-serif
        text-[19px]
        font-normal
        leading-none
        text-footer-text-lg
        no-underline

        transition-[color,transform]
        duration-300

        [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

        hover:translate-x-[3px]
        hover:text-icon

        focus-visible:translate-x-[3px]
        focus-visible:text-icon
        focus-visible:outline-none

        sm:text-[20px]

        lg:text-[21px]
      "
    >
      <span>{children}</span>

      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.15}
        className="
          h-[14px]
          w-[14px]

          text-icon

          opacity-0

          transition-[opacity,transform]
          duration-300

          group-hover/footer-nav:-translate-y-[2px]
          group-hover/footer-nav:translate-x-[2px]
          group-hover/footer-nav:opacity-100

          group-focus-visible/footer-nav:-translate-y-[2px]
          group-focus-visible/footer-nav:translate-x-[2px]
          group-focus-visible/footer-nav:opacity-100
        "
      />

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

          bg-icon

          transition-transform
          duration-400

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/footer-nav:scale-x-100
          group-focus-visible/footer-nav:scale-x-100
        "
      />
    </a>
  );
}

function ContactLink({
  href,
  Icon,
  children,
  ariaLabel,
  external = false,
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      aria-label={ariaLabel}
      className="
        group/contact

        flex
        w-fit
        max-w-full
        items-start
        gap-[11px]

        text-footer-text-lg
        no-underline

        transition-[color,transform]
        duration-300

        hover:translate-x-[2px]
        hover:text-icon

        focus-visible:translate-x-[2px]
        focus-visible:text-icon
        focus-visible:outline-none
      "
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.45}
        className="
          mt-[2px]
          h-[18px]
          w-[18px]
          shrink-0

          text-icon

          transition-transform
          duration-400

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/contact:-translate-y-[2px]
          group-hover/contact:scale-[1.07]

          group-focus-visible/contact:-translate-y-[2px]
          group-focus-visible/contact:scale-[1.07]
        "
      />

      <span
        className="
          font-sans
          text-[12px]
          font-normal
          leading-[1.55]

          sm:text-[13px]

          lg:text-[14px]
        "
      >
        {children}
      </span>
    </a>
  );
}

function SocialLink({
  href,
  Icon,
  children,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group/social

        flex
        w-fit
        items-center
        gap-[10px]

        text-footer-text-lg
        no-underline

        transition-[color,transform]
        duration-300

        hover:translate-x-[3px]
        hover:text-icon

        focus-visible:translate-x-[3px]
        focus-visible:text-icon
        focus-visible:outline-none
      "
    >
      <span
        className="
          flex
          h-[30px]
          w-[30px]
          items-center
          justify-center

          rounded-full
          border
          border-icon/35

          text-icon

          transition-[background-color,border-color,transform]
          duration-400

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/social:rotate-[3deg]
          group-hover/social:scale-[1.06]
          group-hover/social:border-icon/75
          group-hover/social:bg-icon/10

          group-focus-visible/social:scale-[1.06]
          group-focus-visible/social:border-icon/75
          group-focus-visible/social:bg-icon/10
        "
      >
        <Icon
          aria-hidden="true"
          className="h-[14px] w-[14px]"
        />
      </span>

      <span
        className="
          font-serif
          text-[18px]

          sm:text-[19px]

          lg:text-[20px]
        "
      >
        {children}
      </span>
    </a>
  );
}

function LegalLink({
  href,
  children,
  external = false,
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={
        external
          ? "noopener noreferrer"
          : undefined
      }
      className="
        group/legal
        relative

        text-footer-text-sm
        no-underline

        transition-colors
        duration-300

        hover:text-icon

        focus-visible:text-icon
        focus-visible:outline-none
      "
    >
      {children}

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-[3px]
          left-0

          h-px
          w-full

          origin-left
          scale-x-0

          bg-icon

          transition-transform
          duration-300

          group-hover/legal:scale-x-100
          group-focus-visible/legal:scale-x-100
        "
      />
    </a>
  );
}

function LegalAction({
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group/legal
        relative

        cursor-pointer
        border-0
        bg-transparent
        p-0

        font-sans
        text-[9px]
        text-footer-text-sm

        transition-colors
        duration-300

        hover:text-icon

        focus-visible:text-icon
        focus-visible:outline-none

        sm:text-[10px]
      "
    >
      {children}

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-[3px]
          left-0

          h-px
          w-full

          origin-left
          scale-x-0

          bg-icon

          transition-transform
          duration-300

          group-hover/legal:scale-x-100
          group-focus-visible/legal:scale-x-100
        "
      />
    </button>
  );
}

export default function Footer() {
  const {
    language,
    t,
  } = useLanguage();

  const {
    openPrivacy,
    openCookiePolicy,
    openPreferences,
  } = useLegal();

  const currentYear =
    new Date().getFullYear();

  const whatsappMessage =
    language === "en"
      ? "Hi Regina Caffè, I would like some more information."
      : "Ciao Regina Caffè, vorrei ricevere maggiori informazioni.";

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  const navigation = [
    {
      href: "#eventi",
      label: t("header.events"),
    },
    {
      href: "#consigliati",
      label: t("header.recommended"),
    },
    {
      href: "#orari",
      label: t("header.hours"),
    },
    {
      href: "#social",
      label: t("header.social"),
    },
    {
      href: "#menu",
      label: t("header.menu"),
    },
  ];

  const navigateToSection = (
    event,
    href
  ) => {
    const target =
      document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    const prefersReducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

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

  return (
    <footer
      className="
        border-t
        border-[#4B4237]

        bg-footer-bg
        text-footer-text-lg
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]

          px-[18px]
          pb-[20px]
          pt-[30px]

          sm:px-8
          sm:pb-[24px]
          sm:pt-[38px]

          lg:px-10
          lg:pb-[28px]
          lg:pt-[46px]

          xl:px-12
        "
      >
        {/* Contenuto principale */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-[34px]
            gap-y-[34px]

            border-b
            border-[#51483B]

            pb-[30px]

            sm:grid-cols-2
            sm:gap-y-[38px]
            sm:pb-[36px]

            lg:grid-cols-[1.15fr_1.05fr_0.8fr_0.8fr]
            lg:gap-x-[44px]
            lg:gap-y-0
            lg:pb-[42px]
          "
        >
          {/* Brand */}
          <div>
            <a
              href={HOME_URL}
              aria-label={t(
                "header.homeAria"
              )}
              className="
                group/brand

                inline-flex
                items-center
                gap-[15px]

                text-footer-text-lg
                no-underline

                focus-visible:outline-none
              "
            >
              <span
                aria-hidden="true"
                className="
                  block
                  h-[66px]
                  w-[50px]
                  shrink-0

                  bg-icon

                  transition-[transform,filter]
                  duration-500

                  [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

                  group-hover/brand:-translate-y-[2px]
                  group-hover/brand:scale-[1.035]
                  group-hover/brand:drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]

                  group-focus-visible/brand:-translate-y-[2px]
                  group-focus-visible/brand:scale-[1.035]

                  sm:h-[74px]
                  sm:w-[56px]

                  lg:h-[80px]
                  lg:w-[62px]
                "
                style={{
                  WebkitMaskImage: `url("${LOGO_URL}")`,
                  maskImage: `url("${LOGO_URL}")`,
                  WebkitMaskRepeat:
                    "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition:
                    "center",
                  maskPosition: "center",
                  WebkitMaskSize:
                    "contain",
                  maskSize: "contain",
                }}
              />

              <div>
                <span
                  className="
                    block

                    font-serif
                    text-[26px]
                    font-normal
                    leading-none

                    transition-colors
                    duration-300

                    group-hover/brand:text-icon
                    group-focus-visible/brand:text-icon

                    sm:text-[29px]

                    lg:text-[31px]
                  "
                >
                  Regina Caffè
                </span>

                <span
                  className="
                    mt-[7px]
                    block

                    font-sans
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.34em]
                    text-footer-text-sm

                    sm:text-[9px]
                  "
                >
                  Grottaglie
                </span>
              </div>
            </a>

            <p
              className="
                mt-[18px]
                max-w-[300px]

                font-sans
                text-[12px]
                font-normal
                leading-[1.65]
                text-footer-text-sm

                sm:text-[13px]

                lg:max-w-[270px]
              "
            >
              {t("footer.tagline")}
            </p>

            <div
              className="
                mt-[18px]

                inline-flex
                items-center
                gap-[8px]

                rounded-full
                border
                border-icon/30

                px-[12px]
                py-[7px]

                font-sans
                text-[8px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-icon

                sm:text-[9px]
              "
            >
              <Clock3
                aria-hidden="true"
                strokeWidth={1.45}
                className="
                  h-[14px]
                  w-[14px]
                "
              />

              {t("footer.openEveryDay")}
            </div>
          </div>

          {/* Contatti */}
          <div>
            <FooterTitle>
              {t("footer.contactsTitle")}
            </FooterTitle>

            <div
              className="
                mt-[18px]

                flex
                flex-col
                gap-[16px]

                sm:mt-[20px]
              "
            >
              <ContactLink
                href={MAPS_URL}
                Icon={MapPin}
                ariaLabel={t(
                  "footer.addressAria"
                )}
                external
              >
                Piazza Regina Margherita, 21
                <br />
                74023 Grottaglie (TA)
              </ContactLink>

              <ContactLink
                href={`tel:${PHONE_NUMBER}`}
                Icon={Phone}
                ariaLabel={t(
                  "footer.phoneAria"
                )}
              >
                +39 345 683 6439
              </ContactLink>

              <ContactLink
                href={whatsappUrl}
                Icon={MessageCircle}
                ariaLabel={t(
                  "footer.whatsappAria"
                )}
                external
              >
                {t("footer.whatsapp")}
              </ContactLink>
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <FooterTitle>
              {t("footer.exploreTitle")}
            </FooterTitle>

            <nav
              aria-label={t(
                "footer.navigationAria"
              )}
              className="
                mt-[18px]

                flex
                flex-col
                items-start
                gap-[14px]

                sm:mt-[20px]
              "
            >
              {navigation.map((item) => (
                <FooterNavLink
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    navigateToSection(
                      event,
                      item.href
                    )
                  }
                >
                  {item.label}
                </FooterNavLink>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <FooterTitle>
              {t("footer.followTitle")}
            </FooterTitle>

            <div
              className="
                mt-[18px]

                flex
                flex-col
                items-start
                gap-[14px]

                sm:mt-[20px]
              "
            >
              <SocialLink
                href={INSTAGRAM_URL}
                Icon={FaInstagram}
              >
                Instagram
              </SocialLink>

              <SocialLink
                href={FACEBOOK_URL}
                Icon={FaFacebookF}
              >
                Facebook
              </SocialLink>

              <SocialLink
                href={TIKTOK_URL}
                Icon={SiTiktok}
              >
                TikTok
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Fascia legale */}
        <div
          className="
            grid
            gap-[14px]

            pt-[20px]

            font-sans
            text-[9px]
            font-normal
            leading-[1.6]
            text-footer-text-sm

            sm:pt-[22px]
            sm:text-[10px]

            md:grid-cols-[1fr_auto]
            md:items-center
            md:gap-x-[28px]

            lg:pt-[24px]
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-[10px]
              gap-y-[6px]
            "
          >
            <span>
              © {currentYear} Regina Caffè
            </span>

            <span
              aria-hidden="true"
              className="text-icon/50"
            >
              ·
            </span>

            <span>
              {t("footer.vatLabel")}{" "}
              02864180738
            </span>

            <span
              aria-hidden="true"
              className="text-icon/50"
            >
              ·
            </span>

            <span>
              {t(
                "footer.rightsReserved"
              )}
            </span>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-[10px]
              gap-y-[6px]

              md:justify-end
            "
          >
            <LegalAction
              onClick={openPrivacy}
            >
              {t("footer.privacy")}
            </LegalAction>

            <span
              aria-hidden="true"
              className="text-icon/50"
            >
              ·
            </span>

            <LegalAction
              onClick={openCookiePolicy}
            >
              {t("footer.cookies")}
            </LegalAction>

            <span
              aria-hidden="true"
              className="text-icon/50"
            >
              ·
            </span>

            <LegalAction
              onClick={openPreferences}
            >
              {t(
                "footer.cookiePreferences"
              )}
            </LegalAction>

            <span
              aria-hidden="true"
              className="text-icon/50"
            >
              ·
            </span>

            <span>
              {t(
                "footer.digitalProject"
              )}
              :{" "}

              <LegalLink
                href={SEMPLIVO_URL}
                external
              >
                Semplivo
              </LegalLink>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}