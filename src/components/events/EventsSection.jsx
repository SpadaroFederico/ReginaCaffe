import EventRow from "./EventRow";
import { eventsMock } from "../../data/events.mock";
import { useLanguage } from "../../i18n/LanguageContext";

export default function EventsSection() {
  const events = eventsMock;
  const { t } = useLanguage();

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
        <div
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
            {t("events.eyebrow")}
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
              {t("events.titleItalic")}
            </span>{" "}
            <span className="not-italic">
              {t("events.titleRegular")}
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
            {t("events.description")}
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
                font-serif
                text-[30px]
                text-[#635B4E]
              "
            >
              {String(events.length).padStart(2, "0")}
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
              {t("events.count")}
            </span>
          </div>
        </div>

        <div
          className="
            border-t
            border-[#D8D2C6]

            md:grid
            md:grid-cols-2

            lg:border-t-0
          "
        >
          {events.map((event) => (
            <EventRow
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </div>
    </section>
  );
}