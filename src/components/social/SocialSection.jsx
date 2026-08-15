import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { useLanguage } from "../../i18n/LanguageContext";
import Reveal from "../ui/Reveal";

const INSTAGRAM_URL =
  "https://www.instagram.com/reginacaffe_grottaglie/";

const FACEBOOK_URL =
  "https://www.facebook.com/reginacaffegrottaglie/";

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Regina+Caff%C3%A8%2C+Piazza+Regina+Margherita+21%2C+74023+Grottaglie+TA";

const WHATSAPP_NUMBER =
  "393456836439";

function SocialCard({
  href,
  title,
  subtitle,
  Icon,
}) {
  const isMapIcon =
    Icon === MapPin;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title}: ${subtitle}`}
      className="
        group/social-card
        relative

        flex
        h-full
        min-h-[88px]
        w-full
        items-center
        gap-[15px]

        overflow-hidden

        rounded-[14px]
        border
        border-[#CDBF9F]/75

        bg-[#F7F2E8]/40

        px-[16px]
        py-[14px]

        text-[#2F2A21]
        no-underline

        transition-[transform,border-color,background-color,box-shadow]
        duration-500

        [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-[3px]
        hover:border-[#AD9060]/80
        hover:bg-[#F7F2E8]/85
        hover:shadow-[0_16px_38px_rgba(70,57,42,0.075)]

        focus-visible:-translate-y-[3px]
        focus-visible:border-[#AD9060]/80
        focus-visible:bg-[#F7F2E8]/85
        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-[#AD9060]
        focus-visible:ring-offset-3
        focus-visible:ring-offset-[#F3EDDE]

        sm:min-h-[98px]
        sm:gap-[18px]
        sm:px-[19px]
        sm:py-[17px]

        lg:min-h-[110px]
        lg:px-[21px]
        lg:py-[19px]
      "
    >
      <div
        className="
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center

          text-[#AD9060]

          sm:h-[46px]
          sm:w-[46px]

          lg:h-[50px]
          lg:w-[50px]
        "
      >
        <Icon
          aria-hidden="true"
          className={`
            h-[29px]
            w-[29px]

            will-change-transform

            transition-[transform,color]
            duration-500

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/social-card:text-[#9C7F51]
            group-focus-visible/social-card:text-[#9C7F51]

            ${
              isMapIcon
                ? "group-hover/social-card:-translate-y-[2px] group-hover/social-card:scale-[1.06] group-focus-visible/social-card:-translate-y-[2px] group-focus-visible/social-card:scale-[1.06]"
                : "group-hover/social-card:-rotate-[3deg] group-hover/social-card:scale-[1.08] group-focus-visible/social-card:-rotate-[3deg] group-focus-visible/social-card:scale-[1.08]"
            }

            sm:h-[31px]
            sm:w-[31px]

            lg:h-[33px]
            lg:w-[33px]
          `}
          {...(isMapIcon
            ? { strokeWidth: 1.55 }
            : {})}
        />
      </div>

      <div
        className="
          min-w-0
          flex-1

          transition-transform
          duration-500

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/social-card:translate-x-[2px]
          group-focus-visible/social-card:translate-x-[2px]
        "
      >
        <h3
          className="
            font-serif
            text-[21px]
            font-normal
            leading-[1.02]
            text-[#2F2A21]

            transition-colors
            duration-400

            group-hover/social-card:text-[#635B4E]
            group-focus-visible/social-card:text-[#635B4E]

            sm:text-[23px]

            lg:text-[24px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-[5px]

            overflow-hidden
            text-ellipsis
            whitespace-nowrap

            font-sans
            text-[10px]
            font-normal
            leading-[1.4]
            text-[#635B4E]

            transition-colors
            duration-400

            group-hover/social-card:text-[#4D463D]
            group-focus-visible/social-card:text-[#4D463D]

            sm:mt-[6px]
            sm:text-[11px]

            lg:text-[12px]
          "
        >
          {subtitle}
        </p>
      </div>

      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.15}
        className="
          h-[18px]
          w-[18px]
          shrink-0

          text-[#AD9060]

          transition-[transform,color]
          duration-500

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/social-card:-translate-y-[3px]
          group-hover/social-card:translate-x-[3px]
          group-hover/social-card:text-[#9C7F51]

          group-focus-visible/social-card:-translate-y-[3px]
          group-focus-visible/social-card:translate-x-[3px]
          group-focus-visible/social-card:text-[#9C7F51]

          sm:h-[19px]
          sm:w-[19px]

          lg:h-[20px]
          lg:w-[20px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-[-35%]

          w-[25%]

          -skew-x-12

          bg-white/25

          opacity-0

          transition-[left,opacity]
          duration-[850ms]

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/social-card:left-[115%]
          group-hover/social-card:opacity-100

          group-focus-visible/social-card:left-[115%]
          group-focus-visible/social-card:opacity-100
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-[16px]
          bottom-0

          h-px

          origin-left
          scale-x-0

          bg-[#AD9060]/60

          transition-transform
          duration-600

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/social-card:scale-x-100
          group-focus-visible/social-card:scale-x-100
        "
      />
    </a>
  );
}

export default function SocialSection() {
  const {
    language,
    t,
  } = useLanguage();

  const whatsappMessage =
    language === "en"
      ? "Hi Regina Caffè, I would like some more information."
      : "Ciao Regina Caffè, vorrei ricevere maggiori informazioni.";

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  const socialLinks = [
    {
      id: "instagram",
      href: INSTAGRAM_URL,
      title: t(
        "social.instagramTitle"
      ),
      subtitle:
        "@reginacaffe_grottaglie",
      Icon: FaInstagram,
    },
    {
      id: "facebook",
      href: FACEBOOK_URL,
      title: t(
        "social.facebookTitle"
      ),
      subtitle:
        "Regina Caffè Grottaglie",
      Icon: FaFacebookF,
    },
    {
      id: "whatsapp",
      href: whatsappUrl,
      title: t(
        "social.whatsappTitle"
      ),
      subtitle:
        "+39 345 683 6439",
      Icon: FaWhatsapp,
    },
    {
      id: "maps",
      href: MAPS_URL,
      title: t(
        "social.mapsTitle"
      ),
      subtitle:
        "Piazza Regina Margherita, 21",
      Icon: MapPin,
    },
  ];

  return (
    <section
      id="social"
      aria-labelledby="social-section-title"
      className="
        relative
        overflow-hidden

        border-y
        border-[#D2C6AE]/75

        bg-[#F3EDDE]
        text-[#2F2A21]
      "
    >
      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1280px]

          px-[19px]
          py-[34px]

          sm:px-8
          sm:py-[46px]

          lg:px-10
          lg:py-[62px]

          xl:px-12
          xl:py-[70px]
        "
      >
        <Reveal
          distance={16}
          className="
            max-w-[520px]

            md:max-w-[590px]

            lg:max-w-[660px]
          "
        >
          <h2
            id="social-section-title"
            className="
              font-serif
              text-[43px]
              font-normal
              leading-[0.86]
              text-[#2F2A21]

              sm:text-[51px]

              md:text-[57px]

              lg:text-[64px]
            "
          >
            <span className="block">
              {t(
                "social.titleLine1"
              )}
            </span>

            <span
              className="
                block
                italic
                text-[#635B4E]
              "
            >
              {t(
                "social.titleLine2"
              )}
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mt-[19px]
              h-px
              w-[245px]

              origin-left

              bg-[#B9A37A]

              sm:mt-[23px]
              sm:w-[285px]

              lg:mt-[28px]
              lg:w-[325px]
            "
          />

          <p
            className="
              mt-[18px]
              max-w-[340px]

              font-sans
              text-[12px]
              font-normal
              leading-[18px]
              text-[#635B4E]

              sm:mt-[21px]
              sm:max-w-[440px]
              sm:text-[14px]
              sm:leading-[21px]

              lg:mt-[24px]
              lg:max-w-[520px]
              lg:text-[15px]
              lg:leading-[23px]
            "
          >
            {t(
              "social.description"
            )}
          </p>
        </Reveal>

        <div
          className="
            mt-[28px]

            grid
            grid-cols-1
            gap-[9px]

            sm:mt-[34px]
            sm:grid-cols-2
            sm:gap-[12px]

            lg:mt-[44px]
            lg:grid-cols-4
            lg:gap-[14px]
          "
        >
          {socialLinks.map(
            (item, index) => (
              <Reveal
                key={item.id}
                delay={
                  80 + index * 65
                }
                distance={16}
                className="h-full"
              >
                <SocialCard
                  href={item.href}
                  title={item.title}
                  subtitle={
                    item.subtitle
                  }
                  Icon={item.Icon}
                />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}