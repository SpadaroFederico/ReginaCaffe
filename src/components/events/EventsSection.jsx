import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  CalendarDays,
  RefreshCcw,
} from "lucide-react";

import EventRow from "./EventRow";
import { getPublishedEvents } from "../../services/events";
import { useLanguage } from "../../i18n/LanguageContext";
import Reveal from "../ui/Reveal";

function EventSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        grid
        min-h-[144px]
        grid-cols-[74px_1fr_26px]
        gap-x-[20px]

        overflow-hidden

        border-b
        border-[#D8D2C6]

        px-[22px]
        py-[27px]

        md:block
        md:min-h-[225px]
        md:px-[28px]
        md:py-[28px]

        md:odd:border-r

        lg:min-h-[235px]
        lg:px-[32px]
        lg:py-[32px]

        xl:min-h-[245px]
        xl:px-[36px]
        xl:py-[34px]
      "
    >
      {/* Data */}
      <div className="flex items-start gap-[7px]">
        <span
          className="
            h-[37px]
            w-[47px]
            rounded-[7px]
            bg-[#DCD8CE]

            animate-pulse
            motion-reduce:animate-none

            md:h-[41px]
            md:w-[52px]

            lg:h-[44px]
            lg:w-[56px]
          "
        />

        <span
          className="
            mt-[13px]
            h-[10px]
            w-[25px]
            rounded-full
            bg-[#E2DDD2]

            animate-pulse
            motion-reduce:animate-none

            md:mt-[14px]

            lg:mt-[15px]
          "
        />
      </div>

      {/* Contenuto */}
      <div
        className="
          min-w-0

          md:mt-[28px]
          md:pr-[34px]

          lg:mt-[32px]
        "
      >
        <div
          className="
            h-[27px]
            w-[68%]
            max-w-[260px]
            rounded-[8px]
            bg-[#D8D3C8]

            animate-pulse
            motion-reduce:animate-none

            md:h-[29px]

            lg:h-[31px]
          "
        />

        <div className="mt-[14px] space-y-[7px]">
          <div
            className="
              h-[11px]
              w-[88%]
              max-w-[390px]
              rounded-full
              bg-[#E1DDD3]

              animate-pulse
              motion-reduce:animate-none
            "
          />

          <div
            className="
              h-[11px]
              w-[58%]
              max-w-[260px]
              rounded-full
              bg-[#E6E2D9]

              animate-pulse
              motion-reduce:animate-none
            "
          />
        </div>
      </div>

      {/* Freccia placeholder */}
      <div
        className="
          mt-[2px]
          h-[30px]
          w-[30px]
          rounded-full
          border
          border-[#DDD6C9]

          animate-pulse
          motion-reduce:animate-none

          md:absolute
          md:right-[28px]
          md:top-[28px]

          lg:right-[32px]
          lg:top-[32px]
        "
      />

      {/* Piccolo accento inferiore */}
      <span
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0

          h-px
          w-[24%]

          bg-[#AD9060]/25
        "
      />
    </div>
  );
}

function EventsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Caricamento eventi"
      className="
        md:grid
        md:grid-cols-2
      "
    >
      <span className="sr-only">
        Caricamento eventi...
      </span>

      {Array.from({
        length: 4,
      }).map((_, index) => (
        <EventSkeleton
          key={index}
        />
      ))}
    </div>
  );
}

function EventsEmpty({
  language,
}) {
  const title =
    language === "en"
      ? "New dates coming soon"
      : "Nuove date in arrivo";

  const description =
    language === "en"
      ? "There are no upcoming events at the moment. Check back soon."
      : "Al momento non ci sono nuovi eventi in programma. Torna a trovarci presto.";

  return (
    <div
      className="
        flex
        min-h-[290px]
        items-center
        justify-center

        px-6
        py-14

        text-center

        md:col-span-2
        md:min-h-[450px]

        lg:min-h-[470px]
      "
    >
      <div className="max-w-[340px]">
        <span
          className="
            mx-auto
            flex
            h-[48px]
            w-[48px]
            items-center
            justify-center

            rounded-full
            border
            border-[#CDBF9F]

            bg-[#EEE9DC]

            text-[#7C644A]
          "
        >
          <CalendarDays
            aria-hidden="true"
            className="h-[20px] w-[20px]"
            strokeWidth={1.25}
          />
        </span>

        <h3
          className="
            mt-5

            font-serif
            text-[29px]
            font-normal
            leading-[1]

            text-[#2F2A21]

            sm:text-[32px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3

            font-sans
            text-[13px]
            leading-[21px]

            text-[#635B4E]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function EventsError({
  language,
  loading,
  onRetry,
}) {
  const title =
    language === "en"
      ? "Events are temporarily unavailable"
      : "Gli eventi non sono disponibili";

  const description =
    language === "en"
      ? "We couldn't load the upcoming dates. Please try again in a moment."
      : "Non siamo riusciti a caricare le prossime serate. Puoi riprovare tra un momento.";

  const retryLabel =
    language === "en"
      ? "Try again"
      : "Riprova";

  return (
    <div
      className="
        flex
        min-h-[290px]
        items-center
        justify-center

        px-6
        py-14

        text-center

        md:col-span-2
        md:min-h-[450px]

        lg:min-h-[470px]
      "
    >
      <div className="max-w-[350px]">
        <span
          className="
            mx-auto
            flex
            h-[48px]
            w-[48px]
            items-center
            justify-center

            rounded-full
            border
            border-[#CDBF9F]

            bg-[#EEE9DC]

            text-[#7C644A]
          "
        >
          <RefreshCcw
            aria-hidden="true"
            className={`
              h-[19px]
              w-[19px]

              ${
                loading
                  ? "animate-spin motion-reduce:animate-none"
                  : ""
              }
            `}
            strokeWidth={1.25}
          />
        </span>

        <h3
          className="
            mt-5

            font-serif
            text-[29px]
            font-normal
            leading-[1]

            text-[#2F2A21]

            sm:text-[32px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3

            font-sans
            text-[13px]
            leading-[21px]

            text-[#635B4E]
          "
        >
          {description}
        </p>

        <button
          type="button"
          onClick={onRetry}
          disabled={loading}
          className="
            mt-6

            inline-flex
            min-h-[42px]
            items-center
            justify-center
            gap-2

            rounded-full
            border
            border-[#CDBF9F]

            bg-transparent

            px-5

            font-sans
            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]

            text-[#635B4E]

            transition-[border-color,background-color,color,opacity]
            duration-300

            hover:border-[#AD9060]
            hover:bg-[#EEE9DC]
            hover:text-[#2F2A21]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#AD9060]/60
            focus-visible:ring-offset-3
            focus-visible:ring-offset-[#F2F1EC]

            disabled:cursor-wait
            disabled:opacity-45
          "
        >
          <RefreshCcw
            aria-hidden="true"
            className={`
              h-[14px]
              w-[14px]

              ${
                loading
                  ? "animate-spin motion-reduce:animate-none"
                  : ""
              }
            `}
            strokeWidth={1.4}
          />

          {retryLabel}
        </button>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const {
    t,
    language,
  } = useLanguage();

  const [
    events,
    setEvents,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  const loadEvents =
    useCallback(
      async ({
        cancelled = () =>
          false,
      } = {}) => {
        setLoading(true);
        setError(false);

        try {
          const nextEvents =
            await getPublishedEvents();

          if (cancelled()) {
            return;
          }

          setEvents(
            nextEvents
          );
        } catch (error) {
          console.error(
            "Public events load error:",
            error
          );

          if (cancelled()) {
            return;
          }

          /*
           * Non azzeriamo silenziosamente
           * gli eventi facendo sembrare
           * un errore di rete come se
           * non esistessero eventi.
           */
          setEvents([]);
          setError(true);
        } finally {
          if (!cancelled()) {
            setLoading(false);
          }
        }
      },
      []
    );

  useEffect(() => {
    let cancelled = false;

    loadEvents({
      cancelled: () =>
        cancelled,
    });

    return () => {
      cancelled = true;
    };
  }, [loadEvents]);

  const handleRetry = () => {
    loadEvents();
  };

  const countLabel =
    loading || error
      ? "—"
      : String(
          events.length
        ).padStart(
          2,
          "0"
        );

  return (
    <section
      id="eventi"
      className="
        bg-[#F2F1EC]
        text-[#2F2A21]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]

          lg:grid
          lg:grid-cols-[310px_minmax(0,1fr)]

          xl:grid-cols-[350px_minmax(0,1fr)]
        "
      >
        <Reveal
          distance={16}
          className="
            px-[22px]
            pb-[24px]
            pt-[30px]

            sm:px-8
            sm:pb-[30px]
            sm:pt-[36px]

            lg:flex
            lg:flex-col
            lg:border-r
            lg:border-[#D8D2C6]
            lg:px-10
            lg:py-[44px]

            xl:px-12
            xl:py-[50px]
          "
        >
          <p
            className="
              font-sans
              text-[10px]
              font-medium
              uppercase
              tracking-[0.34em]
              text-[#635B4E]

              sm:text-[11px]

              lg:hidden
            "
          >
            {t(
              "events.eyebrow"
            )}
          </p>

          <h2
            className="
              mt-[14px]

              font-serif
              text-[38px]
              font-normal
              leading-[0.95]
              text-[#2F2A21]

              sm:text-[44px]

              lg:mt-0
              lg:text-[54px]

              xl:text-[60px]
            "
          >
            <span className="italic">
              {t(
                "events.titleItalic"
              )}
            </span>{" "}
            <span className="not-italic">
              {t(
                "events.titleRegular"
              )}
            </span>
          </h2>

          <p
            className="
              hidden

              lg:mt-[28px]
              lg:block
              lg:max-w-[235px]
              lg:font-sans
              lg:text-[15px]
              lg:font-normal
              lg:leading-[24px]
              lg:text-[#635B4E]

              xl:mt-[32px]
              xl:max-w-[260px]
              xl:text-[16px]
              xl:leading-[25px]
            "
          >
            {t(
              "events.description"
            )}
          </p>

          <div
            className="
              hidden

              lg:mt-auto
              lg:flex
              lg:items-baseline
              lg:gap-[8px]
            "
          >
            <span
              className="
                min-w-[32px]

                font-serif
                text-[30px]

                text-[#635B4E]
              "
            >
              {countLabel}
            </span>

            <span
              className="
                font-sans
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-[#635B4E]
              "
            >
              {t(
                "events.count"
              )}
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={110}
          distance={14}
          className="
            border-t
            border-[#D8D2C6]

            md:grid
            md:grid-cols-2

            lg:border-t-0
          "
        >
          {loading ? (
            <div
              className="
                md:col-span-2
              "
            >
              <EventsLoading />
            </div>
          ) : error ? (
            <EventsError
              language={
                language
              }
              loading={
                loading
              }
              onRetry={
                handleRetry
              }
            />
          ) : events.length ===
            0 ? (
            <EventsEmpty
              language={
                language
              }
            />
          ) : (
            events.map(
              (event) => (
                <EventRow
                  key={
                    event.id
                  }
                  event={
                    event
                  }
                />
              )
            )
          )}
        </Reveal>
      </div>
    </section>
  );
}