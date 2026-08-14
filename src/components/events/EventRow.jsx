import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

function getLocale(language) {
  return language === "en" ? "en-GB" : "it-IT";
}

function formatDay(dateString, language) {
  return new Intl.DateTimeFormat(getLocale(language), {
    day: "2-digit",
    timeZone: "Europe/Rome",
  }).format(new Date(dateString));
}

function formatMonth(dateString, language) {
  return new Intl.DateTimeFormat(getLocale(language), {
    month: "short",
    timeZone: "Europe/Rome",
  })
    .format(new Date(dateString))
    .replace(".", "")
    .toUpperCase();
}

function formatTime(dateString, language) {
  return new Intl.DateTimeFormat(getLocale(language), {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Rome",
  }).format(new Date(dateString));
}

function getLocalizedValue(value, language) {
  if (typeof value === "string") {
    return value;
  }

  return value?.[language] ?? value?.it ?? "";
}

export default function EventRow({ event }) {
  const { language, t } = useLanguage();

  const day = formatDay(event.startsAt, language);
  const month = formatMonth(event.startsAt, language);

  const startTime = formatTime(event.startsAt, language);
  const endTime = formatTime(event.endsAt, language);

  const title = getLocalizedValue(event.title, language);
  const description = getLocalizedValue(
    event.description,
    language
  );

  return (
    <article
      className="
        group
        relative

        grid
        min-h-[144px]
        grid-cols-[74px_1fr_26px]
        gap-x-[20px]

        border-b
        border-[#D8D2C6]

        px-[22px]
        py-[27px]

        transition-colors
        duration-300

        md:block
        md:min-h-[225px]
        md:px-[28px]
        md:py-[28px]

        md:odd:border-r

        md:hover:bg-[#ECEAE3]

        lg:min-h-[235px]
        lg:px-[32px]
        lg:py-[32px]

        xl:min-h-[245px]
        xl:px-[36px]
        xl:py-[34px]
      "
    >
      <time
        dateTime={event.startsAt}
        className="
          flex
          items-start
          gap-[7px]
          whitespace-nowrap

          text-[#635B4E]
        "
      >
        <span
          className="
            font-serif
            text-[42px]
            font-normal
            leading-[0.88]

            md:text-[46px]

            lg:text-[50px]
          "
        >
          {day}
        </span>

        <span
          className="
            mt-[13px]

            font-sans
            text-[10px]
            font-medium
            uppercase
            tracking-[0.20em]

            md:mt-[14px]
            md:text-[10px]

            lg:mt-[15px]
            lg:text-[11px]
          "
        >
          {month}
        </span>
      </time>

      <div
        className="
          min-w-0

          md:mt-[28px]
          md:pr-[34px]

          lg:mt-[32px]
        "
      >
        <h3
          className="
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
          {title}
        </h3>

        <div
          className="
            mt-[10px]

            font-sans
            text-[15px]
            font-normal
            leading-[21px]
            text-[#635B4E]

            md:mt-[12px]
            md:text-[15px]
            md:leading-[22px]

            lg:text-[16px]
            lg:leading-[23px]
          "
        >
          <p className="m-0">
            {description}
          </p>

          <p
            className="
              m-0
              mt-[2px]
            "
          >
            {startTime} / {endTime}
          </p>
        </div>
      </div>

      <a
        href={`/eventi/${event.slug}`}
        aria-label={`${t("events.discover")} ${title}`}
        className="
          mt-[2px]

          flex
          h-[26px]
          w-[26px]
          items-start
          justify-end

          text-[#635B4E]

          transition-transform
          duration-300

          group-hover:-translate-y-[2px]
          group-hover:translate-x-[2px]

          md:absolute
          md:right-[28px]
          md:top-[28px]

          lg:right-[32px]
          lg:top-[32px]
        "
      >
        <ArrowUpRight
          strokeWidth={1.2}
          className="
            h-[18px]
            w-[18px]

            md:h-[20px]
            md:w-[20px]
          "
        />
      </a>
    </article>
  );
}