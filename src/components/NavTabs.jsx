import { useLanguage } from "../i18n/LanguageContext";

const tabs = [
  {
    id: "cocktails",
    key: "tabs.cocktails",
  },
  {
    id: "vibes",
    key: "tabs.vibes",
  },
  {
    id: "aperitif",
    key: "tabs.aperitif",
  },
  {
    id: "coffee",
    key: "tabs.coffee",
  },
  {
    id: "breakfast",
    key: "tabs.breakfast",
  },
  {
    id: "wine",
    key: "tabs.wine",
  },
];

function TabGroup({
  hidden = false,
  t,
}) {
  return (
    <div
      aria-hidden={hidden ? "true" : undefined}
      className="
        flex
        shrink-0
        items-center
        gap-[20px]
        pr-[20px]

        sm:gap-[26px]
        sm:pr-[26px]

        lg:gap-[30px]
        lg:pr-[30px]
      "
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="
            flex
            shrink-0
            items-center
            gap-[20px]

            sm:gap-[26px]

            lg:gap-[30px]
          "
        >
          <a
            href={`#${tab.id}`}
            tabIndex={hidden ? -1 : undefined}
            className="
              relative
              shrink-0
              whitespace-nowrap

              text-[#635B4E]
              no-underline

              transition-[color,transform]
              duration-300

              [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              after:absolute
              after:-bottom-[7px]
              after:left-0
              after:h-px
              after:w-full
              after:origin-center
              after:scale-x-0
              after:bg-[#7C644A]/70
              after:transition-transform
              after:duration-400
              after:[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

              hover:-translate-y-[1px]
              hover:text-[#2F2A21]
              hover:after:scale-x-100

              focus-visible:-translate-y-[1px]
              focus-visible:text-[#2F2A21]
              focus-visible:outline-none
              focus-visible:after:scale-x-100
            "
          >
            {t(tab.key)}
          </a>

          <span
            aria-hidden="true"
            className="
              shrink-0

              text-[14px]
              text-[#635B4E]

              opacity-70

              sm:text-[15px]
              lg:text-[16px]
            "
          >
            ·
          </span>
        </div>
      ))}
    </div>
  );
}

export default function NavTabs() {
  const { t } = useLanguage();

  return (
    <nav
      id="menu"
      className="
        group/ticker
        relative

        flex
        h-[58px]
        w-full
        items-center
        overflow-hidden

        border-y
        border-[#BEB29A]

        bg-[#E6DEC7]

        font-serif
        text-[20px]
        font-normal
        leading-none
        text-[#635B4E]

        sm:h-[64px]
        sm:text-[22px]

        lg:h-[68px]
        lg:text-[23px]
      "
    >
      <div
        className="
          flex
          w-max
          will-change-transform

          animate-[marquee_22s_linear_infinite]

          group-hover/ticker:[animation-play-state:paused]
          focus-within:[animation-play-state:paused]

          sm:animate-[marquee_25s_linear_infinite]

          lg:animate-[marquee_28s_linear_infinite]

          motion-reduce:animate-none
        "
      >
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <TabGroup
              key={index}
              hidden={index !== 0}
              t={t}
            />
          )
        )}
      </div>
    </nav>
  );
}