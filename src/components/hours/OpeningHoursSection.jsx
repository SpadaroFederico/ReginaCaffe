import { openingHours } from "../../data/openingHours";
import { useLanguage } from "../../i18n/LanguageContext";

function HoursRow({ item, t }) {
  return (
    <article
      className="
        group
        relative

        grid
        min-h-[91px]
        grid-cols-[minmax(0,1fr)_auto]
        items-center
        gap-x-[14px]

        border-b
        border-[#D8D2C6]

        px-[1px]
        py-[20px]

        transition-colors
        duration-300

        hover:bg-[#ECE8DE]/30

        sm:min-h-[98px]
        sm:gap-x-[22px]
        sm:px-[4px]
        sm:py-[23px]

        md:min-h-[108px]
        md:px-[18px]
        md:py-[26px]

        lg:min-h-[118px]
        lg:px-[26px]
        lg:py-[29px]
      "
    >
      {/* Giorni */}
      <h3
        className="
          min-w-0

          font-sans
          text-[15px]
          font-normal
          leading-[1.35]
          text-[#635B4E]

          sm:text-[16px]

          md:text-[17px]

          lg:text-[18px]
        "
      >
        {t(item.labelKey)}
      </h3>

      {/* Fascia oraria */}
      <div
        className="
          flex
          shrink-0
          items-baseline
          whitespace-nowrap

          font-serif
          font-normal
          text-[#2F2A21]
        "
      >
        <time
          dateTime={item.opensAt}
          className="
            text-[28px]
            leading-none
            tabular-nums

            sm:text-[31px]

            md:text-[35px]

            lg:text-[39px]

            xl:text-[41px]
          "
        >
          {item.opensAt}
        </time>

        <span
          aria-hidden="true"
          className="
            mx-[7px]

            text-[18px]
            text-[#8F8575]

            sm:mx-[10px]
            sm:text-[20px]

            md:mx-[13px]
            md:text-[23px]

            lg:mx-[15px]
          "
        >
          —
        </span>

        <time
          dateTime={item.closesAt}
          className="
            text-[28px]
            leading-none
            tabular-nums

            sm:text-[31px]

            md:text-[35px]

            lg:text-[39px]

            xl:text-[41px]
          "
        >
          {item.closesAt}
        </time>
      </div>
    </article>
  );
}

export default function OpeningHoursSection() {
  const { t } = useLanguage();

  return (
    <section
      id="orari"
      className="
        border-y
        border-[#D8D2C6]

        bg-[#F2F1EC]
        text-[#2F2A21]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]

          px-[22px]
          py-[32px]

          sm:px-8
          sm:py-[42px]

          md:grid
          md:grid-cols-[0.85fr_1.15fr]
          md:items-stretch
          md:py-[50px]

          lg:grid-cols-[360px_minmax(0,1fr)]
          lg:px-10
          lg:py-[62px]

          xl:grid-cols-[400px_minmax(0,1fr)]
          xl:px-12
          xl:py-[68px]
        "
      >
        {/* Introduzione */}
        <div
          className="
            md:flex
            md:flex-col
            md:border-r
            md:border-[#D8D2C6]
            md:pr-8

            lg:pr-10

            xl:pr-12
          "
        >
          <p
            className="
              font-sans
              text-[9px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-[#635B4E]

              sm:text-[10px]

              lg:text-[11px]
            "
          >
            {t("hours.eyebrow")}
          </p>

          <h2
            className="
              mt-[13px]

              font-serif
              text-[42px]
              font-normal
              leading-[0.94]
              text-[#2F2A21]

              sm:text-[48px]

              md:text-[52px]

              lg:mt-[16px]
              lg:text-[58px]

              xl:text-[64px]
            "
          >
            {t("hours.title")}
          </h2>

          <p
            className="
              mt-[17px]
              max-w-[315px]

              font-sans
              text-[13px]
              font-normal
              leading-[20px]
              text-[#635B4E]

              sm:max-w-[390px]
              sm:text-[14px]
              sm:leading-[22px]

              md:max-w-[285px]

              lg:mt-[22px]
              lg:max-w-[310px]
              lg:text-[15px]
              lg:leading-[24px]
            "
          >
            {t("hours.description")}
          </p>

          <span
            aria-hidden="true"
            className="
              mt-[19px]
              h-px
              w-[58px]
              bg-[#B9A37A]

              sm:w-[68px]

              lg:mt-[24px]
            "
          />

          {/* Informazione editoriale tablet / desktop */}
          <div
            className="
              hidden

              md:mt-auto
              md:flex
              md:items-baseline
              md:gap-[9px]
              md:pt-[34px]
            "
          >
            <span
              className="
                font-serif
                text-[34px]
                font-normal
                leading-none
                text-[#635B4E]

                lg:text-[38px]
              "
            >
              7/7
            </span>

            <span
              className="
                max-w-[90px]

                font-sans
                text-[8px]
                font-medium
                uppercase
                leading-[14px]
                tracking-[0.22em]
                text-[#635B4E]

                lg:text-[9px]
              "
            >
              {t("hours.everyDay")}
            </span>
          </div>
        </div>

        {/* Elenco orari */}
        <div
          className="
            mt-[28px]

            border-t
            border-[#D8D2C6]

            md:mt-0
            md:ml-8

            lg:ml-10

            xl:ml-12
          "
        >
            {openingHours.map((item) => (
            <HoursRow
                key={item.id}
                item={item}
                t={t}
            />
            ))}
        </div>
      </div>
    </section>
  );
}