import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

function getLocale(language) {
  return language === "en"
    ? "en-GB"
    : "it-IT";
}

function formatDay(
  dateString,
  language
) {
  return new Intl.DateTimeFormat(
    getLocale(language),
    {
      day: "2-digit",
      timeZone: "Europe/Rome",
    }
  ).format(new Date(dateString));
}

function formatMonth(
  dateString,
  language
) {
  return new Intl.DateTimeFormat(
    getLocale(language),
    {
      month: "short",
      timeZone: "Europe/Rome",
    }
  )
    .format(new Date(dateString))
    .replace(".", "")
    .toUpperCase();
}

function formatTime(
  dateString,
  language
) {
  return new Intl.DateTimeFormat(
    getLocale(language),
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Rome",
    }
  ).format(new Date(dateString));
}

function getLocalizedValue(
  value,
  language
) {
  if (typeof value === "string") {
    return value;
  }

  return (
    value?.[language] ??
    value?.it ??
    ""
  );
}

/*
 * Accetta esclusivamente URL esterni
 * HTTP/HTTPS.
 *
 * Il database applica già lo stesso
 * vincolo, ma manteniamo una seconda
 * verifica anche nel frontend prima
 * di utilizzare il valore in href.
 */
function getSafeExternalUrl(value) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return "";
  }

  try {
    const url = new URL(
      value.trim()
    );

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

export default function EventRow({
  event,
}) {
  const {
    language,
    t,
  } = useLanguage();

  const day = formatDay(
    event.startsAt,
    language
  );

  const month = formatMonth(
    event.startsAt,
    language
  );

  const startTime = formatTime(
    event.startsAt,
    language
  );

  const endTime = formatTime(
    event.endsAt,
    language
  );

  const title = getLocalizedValue(
    event.title,
    language
  );

  const description = getLocalizedValue(
    event.description,
    language
  );

  const externalUrl =
    getSafeExternalUrl(
      event.externalUrl
    );

  return (
    <article
      className="
        group/event
        relative
        overflow-hidden

        grid
        min-h-[144px]
        grid-cols-[74px_1fr_26px]
        gap-x-[20px]

        border-b
        border-[#D8D2C6]

        px-[22px]
        py-[27px]

        transition-[background-color,box-shadow]
        duration-500

        [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

        hover:bg-[#ECEAE3]/65
        focus-within:bg-[#ECEAE3]/65

        md:block
        md:min-h-[225px]
        md:px-[28px]
        md:py-[28px]

        md:odd:border-r

        md:hover:shadow-[inset_0_0_0_1px_rgba(173,144,96,0.18)]

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

            transition-[transform,color]
            duration-500

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/event:-translate-y-[2px]
            group-hover/event:text-[#2F2A21]

            group-focus-within/event:-translate-y-[2px]
            group-focus-within/event:text-[#2F2A21]

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

            transition-colors
            duration-400

            group-hover/event:text-[#7C644A]
            group-focus-within/event:text-[#7C644A]

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

          transition-transform
          duration-500

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/event:translate-x-[2px]
          group-focus-within/event:translate-x-[2px]

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

            transition-colors
            duration-400

            group-hover/event:text-[#635B4E]
            group-focus-within/event:text-[#635B4E]

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

      {externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t(
            "events.discover"
          )} ${title}`}
          className="
            group/event-arrow

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

            hover:bg-[#DED4C2]/70
            hover:text-[#2F2A21]

            focus-visible:bg-[#DED4C2]/70
            focus-visible:text-[#2F2A21]
            focus-visible:outline-none
            focus-visible:ring-1
            focus-visible:ring-[#AD9060]/55

            group-hover/event:-translate-y-[1px]

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

              transition-transform
              duration-400

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              group-hover/event-arrow:-translate-y-[2px]
              group-hover/event-arrow:translate-x-[2px]

              group-focus-visible/event-arrow:-translate-y-[2px]
              group-focus-visible/event-arrow:translate-x-[2px]

              md:h-[20px]
              md:w-[20px]
            "
          />
        </a>
      ) : (
        /*
         * Su mobile manteniamo soltanto
         * lo spazio della terza colonna.
         *
         * Da tablet in poi il layout è
         * block e il placeholder non serve.
         */
        <span
          aria-hidden="true"
          className="
            h-[30px]
            w-[30px]
            md:hidden
          "
        />
      )}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0

          h-px

          origin-left
          scale-x-0

          bg-[#AD9060]/65

          transition-transform
          duration-700

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          group-hover/event:scale-x-100
          group-focus-within/event:scale-x-100
        "
      />
    </article>
  );
}