import {
  useEffect,
  useState,
} from "react";

import {
  Cookie,
  Settings2,
  ShieldCheck,
  X,
} from "lucide-react";

import LegalModal from "./LegalModal";

import {
  getLegalContent,
  LEGAL_CONFIG,
} from "../../legal/legalContent";

import { useLegal } from "../../legal/LegalContext";
import { useLanguage } from "../../i18n/LanguageContext";

/*
 * =========================================================
 * AVVISO BOZZA
 * =========================================================
 */

function DraftNotice({
  title,
  text,
}) {
  if (!LEGAL_CONFIG.isDraft) {
    return null;
  }

  return (
    <aside
      role="note"
      className="
        mb-[24px]

        rounded-[14px]
        border
        border-[#AD9060]/45

        bg-[#E9E0CF]/55

        px-[16px]
        py-[14px]

        sm:px-[20px]
        sm:py-[17px]
      "
    >
      <h3
        className="
          font-serif
          text-[20px]
          font-normal
          text-[#2F2A21]

          sm:text-[22px]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-[7px]

          font-sans
          text-[11px]
          leading-[17px]
          text-[#635B4E]

          sm:text-[12px]
          sm:leading-[19px]
        "
      >
        {text}
      </p>
    </aside>
  );
}

/*
 * =========================================================
 * DOCUMENTO POLICY
 * =========================================================
 */

function PolicyDocument({
  documentData,
}) {
  return (
    <div>
      {documentData.intro && (
        <p
          className="
            max-w-[720px]

            font-sans
            text-[13px]
            leading-[21px]
            text-[#4D463D]

            sm:text-[14px]
            sm:leading-[23px]
          "
        >
          {documentData.intro}
        </p>
      )}

      <div
        className={`
          space-y-[28px]

          sm:space-y-[34px]

          ${
            documentData.intro
              ? "mt-[28px] sm:mt-[34px]"
              : ""
          }
        `}
      >
        {documentData.sections.map(
          (section) => (
            <section
              key={section.title}
              className="
                border-t
                border-[#D8D2C6]

                pt-[20px]

                sm:pt-[24px]
              "
            >
              <h3
                className="
                  font-serif
                  text-[25px]
                  font-normal
                  leading-[1.05]
                  text-[#2F2A21]

                  sm:text-[29px]
                "
              >
                {section.title}
              </h3>

              {section.paragraphs?.map(
                (
                  paragraph,
                  index
                ) => (
                  <p
                    key={`${section.title}-paragraph-${index}`}
                    className="
                      mt-[12px]

                      max-w-[760px]

                      font-sans
                      text-[12px]
                      leading-[20px]
                      text-[#635B4E]

                      sm:text-[13px]
                      sm:leading-[22px]
                    "
                  >
                    {paragraph}
                  </p>
                )
              )}

              {section.bullets && (
                <ul
                  className="
                    mt-[14px]

                    space-y-[9px]

                    pl-[18px]

                    font-sans
                    text-[12px]
                    leading-[20px]
                    text-[#635B4E]

                    sm:text-[13px]
                    sm:leading-[22px]
                  "
                >
                  {section.bullets.map(
                    (
                      bullet,
                      index
                    ) => (
                      <li
                        key={`${section.title}-bullet-${index}`}
                        className="
                          list-disc

                          marker:text-[#AD9060]
                        "
                      >
                        {bullet}
                      </li>
                    )
                  )}
                </ul>
              )}
            </section>
          )
        )}
      </div>
    </div>
  );
}

/*
 * =========================================================
 * TECNOLOGIE / STORAGE
 * =========================================================
 */

function TechnologyList({
  technologies,
  labels,
}) {
  return (
    <div
      className="
        mt-[26px]

        grid
        gap-[10px]

        sm:grid-cols-2
        sm:gap-[12px]
      "
    >
      {technologies.map(
        (technology) => (
          <article
            key={technology.name}
            className="
              rounded-[14px]
              border
              border-[#CDBF9F]/75

              bg-[#F7F2E8]/55

              px-[16px]
              py-[15px]

              sm:px-[18px]
              sm:py-[17px]
            "
          >
            <h3
              className="
                font-serif
                text-[21px]
                font-normal
                text-[#2F2A21]
              "
            >
              {technology.name}
            </h3>

            <dl
              className="
                mt-[12px]

                space-y-[8px]

                font-sans
                text-[10px]
                leading-[16px]
                text-[#635B4E]

                sm:text-[11px]
                sm:leading-[17px]
              "
            >
              <div>
                <dt
                  className="
                    inline
                    font-medium
                    text-[#4D463D]
                  "
                >
                  {labels.type}:{" "}
                </dt>

                <dd className="inline">
                  {technology.type}
                </dd>
              </div>

              <div>
                <dt
                  className="
                    inline
                    font-medium
                    text-[#4D463D]
                  "
                >
                  {labels.category}:{" "}
                </dt>

                <dd className="inline">
                  {technology.category}
                </dd>
              </div>

              <div>
                <dt
                  className="
                    inline
                    font-medium
                    text-[#4D463D]
                  "
                >
                  {labels.duration}:{" "}
                </dt>

                <dd className="inline">
                  {technology.duration}
                </dd>
              </div>

              <div>
                <dt
                  className="
                    inline
                    font-medium
                    text-[#4D463D]
                  "
                >
                  {labels.purpose}:{" "}
                </dt>

                <dd className="inline">
                  {technology.purpose}
                </dd>
              </div>
            </dl>
          </article>
        )
      )}
    </div>
  );
}

/*
 * =========================================================
 * RIGA PREFERENZA
 * =========================================================
 */

function PreferenceRow({
  title,
  description,
  checked,
  locked = false,
  available = true,
  onChange,
  labels,
}) {
  const status = locked
    ? labels.alwaysActive
    : !available
      ? labels.currentlyInactive
      : checked
        ? labels.enabled
        : labels.disabled;

  return (
    <article
      className="
        flex
        items-center
        justify-between
        gap-[18px]

        rounded-[15px]
        border
        border-[#CDBF9F]/75

        bg-[#F7F2E8]/45

        px-[16px]
        py-[16px]

        sm:px-[20px]
        sm:py-[18px]
      "
    >
      <div className="min-w-0">
        <div
          className="
            flex
            flex-wrap
            items-baseline
            gap-x-[10px]
            gap-y-[4px]
          "
        >
          <h3
            className="
              font-serif
              text-[22px]
              font-normal
              text-[#2F2A21]

              sm:text-[24px]
            "
          >
            {title}
          </h3>

          <span
            className="
              font-sans
              text-[8px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#7C644A]

              sm:text-[9px]
            "
          >
            {status}
          </span>
        </div>

        <p
          className="
            mt-[6px]
            max-w-[560px]

            font-sans
            text-[11px]
            leading-[17px]
            text-[#635B4E]

            sm:text-[12px]
            sm:leading-[19px]
          "
        >
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${title}: ${status}`}
        disabled={
          locked ||
          !available
        }
        onClick={() =>
          onChange?.(!checked)
        }
        className={`
          relative

          h-[28px]
          w-[50px]
          shrink-0

          rounded-full
          border

          transition-[background-color,border-color,opacity]
          duration-300

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[#AD9060]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#F3EDDE]

          ${
            checked
              ? "border-[#AD9060] bg-[#AD9060]"
              : "border-[#AFA28D] bg-[#DDD4C3]"
          }

          ${
            locked ||
            !available
              ? "cursor-default opacity-55"
              : "cursor-pointer"
          }
        `}
      >
        <span
          aria-hidden="true"
          className={`
            absolute
            top-[3px]

            h-[20px]
            w-[20px]

            rounded-full
            bg-[#F7F2E8]

            shadow-[0_2px_8px_rgba(42,36,32,0.16)]

            transition-transform
            duration-300

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            ${
              checked
                ? "translate-x-[25px]"
                : "translate-x-[3px]"
            }
          `}
        />
      </button>
    </article>
  );
}

/*
 * =========================================================
 * PULSANTI
 * =========================================================
 */

function SecondaryButton({
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        min-h-[42px]
        items-center
        justify-center

        rounded-full
        border
        border-[#A99B7F]

        bg-transparent

        px-[18px]

        font-sans
        text-[10px]
        font-medium
        uppercase
        tracking-[0.14em]
        text-[#4D463D]

        transition-[background-color,color,border-color,transform]
        duration-300

        hover:-translate-y-[1px]
        hover:border-[#7C644A]
        hover:bg-[#E9E0CF]
        hover:text-[#2F2A21]

        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-[#AD9060]
      "
    >
      {children}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        min-h-[42px]
        items-center
        justify-center

        rounded-full
        border
        border-[#2F2A21]

        bg-[#2F2A21]

        px-[20px]

        font-sans
        text-[10px]
        font-medium
        uppercase
        tracking-[0.14em]
        text-[#F3EDDE]

        transition-[background-color,color,transform,box-shadow]
        duration-300

        hover:-translate-y-[1px]
        hover:bg-[#40382F]
        hover:shadow-[0_10px_24px_rgba(42,36,32,0.13)]

        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-[#AD9060]
      "
    >
      {children}
    </button>
  );
}

/*
 * =========================================================
 * LEGAL CENTER
 * =========================================================
 */

export default function LegalCenter() {
  const {
    language,
    t,
  } = useLanguage();

  const {
    consent,
    showBanner,
    activeModal,
    availableCategories,

    acceptAll,
    rejectOptional,
    savePreferences,

    openPrivacy,
    openCookiePolicy,
    openPreferences,
    closeModal,
  } = useLegal();

  const content =
    getLegalContent(
      language
    );

  /*
   * Alcune etichette appartengono alla
   * struttura del documento tecnico e non
   * erano ancora presenti nelle traduzioni.
   *
   * Le manteniamo qui localizzate per
   * evitare che la Cookie Policy inglese
   * mostri "Tipo / Categoria / Durata /
   * Finalità" in italiano.
   */
  const technologyLabels =
    language === "en"
      ? {
          type: "Type",
          category: "Category",
          duration: "Duration",
          purpose: "Purpose",
        }
      : {
          type: "Tipo",
          category: "Categoria",
          duration: "Durata",
          purpose: "Finalità",
        };

  const [
    draftPreferences,
    setDraftPreferences,
  ] = useState({
    preferences: false,
    analytics: false,
    marketing: false,
  });

  /*
   * Quando viene aperto il pannello,
   * partiamo sempre dalle preferenze
   * realmente salvate.
   */
  useEffect(() => {
    if (
      activeModal !==
      "preferences"
    ) {
      return;
    }

    setDraftPreferences({
      preferences:
        Boolean(
          consent
            ?.categories
            ?.preferences
        ),

      analytics:
        Boolean(
          consent
            ?.categories
            ?.analytics
        ),

      marketing:
        Boolean(
          consent
            ?.categories
            ?.marketing
        ),
    });
  }, [
    activeModal,
    consent,
  ]);

  const saveAndClose = () => {
    savePreferences(
      draftPreferences
    );

    closeModal();
  };

  const acceptAndClose = () => {
    acceptAll();
    closeModal();
  };

  const rejectAndClose = () => {
    rejectOptional();
    closeModal();
  };

  const currentLastUpdated =
    LEGAL_CONFIG.lastUpdated[
      language === "en"
        ? "en"
        : "it"
    ];

  const modalMeta = (
    <div
      className="
        mt-[30px]

        flex
        flex-wrap
        gap-x-[22px]
        gap-y-[6px]

        border-t
        border-[#D8D2C6]

        pt-[16px]

        font-sans
        text-[9px]
        uppercase
        tracking-[0.14em]
        text-[#8E8371]
      "
    >
      <span>
        {t(
          "legal.lastUpdated"
        )}
        :{" "}
        {currentLastUpdated}
      </span>

      <span>
        {t(
          "legal.version"
        )}
        :{" "}
        {
          LEGAL_CONFIG.policyVersion
        }
      </span>
    </div>
  );

  return (
    <>
      {/* ===================================================
          COOKIE / PRIVACY BANNER
          =================================================== */}

      {showBanner && (
        <aside
          role="region"
          aria-label={t(
            "legal.bannerLabel"
          )}
          aria-live="polite"
          className="
            cookie-banner-in

            fixed
            inset-x-0
            bottom-0
            z-[100]

            p-[10px]

            sm:p-[16px]

            lg:p-[22px]
          "
        >
          <div
            className="
              relative

              mx-auto
              w-full
              max-w-[1180px]

              overflow-hidden

              rounded-[20px]
              border
              border-[#B9A37A]/75

              bg-[#F3EDDE]/[0.98]

              shadow-[0_24px_80px_rgba(28,22,16,0.22)]

              backdrop-blur-xl

              px-[18px]
              pb-[18px]
              pt-[20px]

              sm:px-[24px]
              sm:pb-[22px]
              sm:pt-[23px]

              lg:grid
              lg:grid-cols-[minmax(0,1fr)_auto]
              lg:items-end
              lg:gap-[34px]
              lg:px-[30px]
              lg:py-[26px]
            "
          >
            <button
              type="button"
              onClick={
                rejectOptional
              }
              aria-label={t(
                "legal.closeBanner"
              )}
              className="
                absolute
                right-[12px]
                top-[12px]

                flex
                h-[34px]
                w-[34px]
                items-center
                justify-center

                rounded-full
                border
                border-[#B9A37A]/55

                bg-transparent

                text-[#635B4E]

                transition-[transform,background-color,color]
                duration-300

                hover:rotate-90
                hover:bg-[#E9E0CF]
                hover:text-[#2F2A21]

                focus-visible:outline-none
                focus-visible:ring-1
                focus-visible:ring-[#AD9060]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#F3EDDE]
              "
            >
              <X
                aria-hidden="true"
                className="h-[17px] w-[17px]"
                strokeWidth={1.35}
              />
            </button>

            <div className="pr-[38px]">
              <div
                className="
                  flex
                  items-center
                  gap-[9px]

                  text-[#AD9060]
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.45}
                />

                <p
                  className="
                    font-sans
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.28em]

                    sm:text-[9px]
                  "
                >
                  {t(
                    "legal.bannerEyebrow"
                  )}
                </p>
              </div>

              <h2
                className="
                  mt-[10px]

                  max-w-[620px]

                  font-serif
                  text-[29px]
                  font-normal
                  leading-[1]
                  text-[#2F2A21]

                  sm:text-[34px]
                "
              >
                {t(
                  "legal.bannerTitle"
                )}
              </h2>

              <p
                className="
                  mt-[10px]
                  max-w-[720px]

                  font-sans
                  text-[11px]
                  leading-[17px]
                  text-[#635B4E]

                  sm:text-[12px]
                  sm:leading-[19px]
                "
              >
                {t(
                  "legal.bannerText"
                )}
              </p>

              <div
                className="
                  mt-[11px]

                  flex
                  flex-wrap
                  items-center
                  gap-x-[16px]
                  gap-y-[7px]
                "
              >
                <button
                  type="button"
                  onClick={
                    openPrivacy
                  }
                  className="
                    border-0
                    bg-transparent
                    p-0

                    font-sans
                    text-[9px]
                    font-medium
                    text-[#635B4E]
                    underline
                    decoration-[#AD9060]/65
                    underline-offset-4

                    transition-colors
                    duration-300

                    hover:text-[#2F2A21]

                    focus-visible:outline-none
                    focus-visible:ring-1
                    focus-visible:ring-[#AD9060]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#F3EDDE]
                  "
                >
                  {t(
                    "legal.privacyLink"
                  )}
                </button>

                <button
                  type="button"
                  onClick={
                    openCookiePolicy
                  }
                  className="
                    border-0
                    bg-transparent
                    p-0

                    font-sans
                    text-[9px]
                    font-medium
                    text-[#635B4E]
                    underline
                    decoration-[#AD9060]/65
                    underline-offset-4

                    transition-colors
                    duration-300

                    hover:text-[#2F2A21]

                    focus-visible:outline-none
                    focus-visible:ring-1
                    focus-visible:ring-[#AD9060]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#F3EDDE]
                  "
                >
                  {t(
                    "legal.cookieLink"
                  )}
                </button>
              </div>
            </div>

            <div
              className="
                mt-[18px]

                grid
                grid-cols-1
                gap-[8px]

                sm:grid-cols-3

                lg:mt-0
                lg:min-w-[470px]
              "
            >
              <SecondaryButton
                onClick={
                  rejectOptional
                }
              >
                {t(
                  "legal.onlyNecessary"
                )}
              </SecondaryButton>

              <SecondaryButton
                onClick={
                  openPreferences
                }
              >
                <Settings2
                  aria-hidden="true"
                  className="
                    mr-[7px]
                    h-[14px]
                    w-[14px]
                  "
                  strokeWidth={1.4}
                />

                {t(
                  "legal.customize"
                )}
              </SecondaryButton>

              <PrimaryButton
                onClick={
                  acceptAll
                }
              >
                {t(
                  "legal.acceptAll"
                )}
              </PrimaryButton>
            </div>
          </div>
        </aside>
      )}

      {/* ===================================================
          PRIVACY POLICY
          =================================================== */}

      <LegalModal
        open={
          activeModal ===
          "privacy"
        }
        title={t(
          "legal.privacyTitle"
        )}
        eyebrow="Regina Caffè"
        closeLabel={t(
          "legal.closeModal"
        )}
        onClose={
          closeModal
        }
        footer={
          <div className="flex justify-end">
            <PrimaryButton
              onClick={
                closeModal
              }
            >
              {t(
                "legal.close"
              )}
            </PrimaryButton>
          </div>
        }
      >
        <DraftNotice
          title={t(
            "legal.draftTitle"
          )}
          text={t(
            "legal.draftText"
          )}
        />

        <PolicyDocument
          documentData={
            content.privacy
          }
        />

        {modalMeta}
      </LegalModal>

      {/* ===================================================
          COOKIE POLICY
          =================================================== */}

      <LegalModal
        open={
          activeModal ===
          "cookies"
        }
        title={t(
          "legal.cookieTitle"
        )}
        eyebrow="Regina Caffè"
        closeLabel={t(
          "legal.closeModal"
        )}
        onClose={
          closeModal
        }
        footer={
          <div
            className="
              flex
              flex-wrap
              justify-end
              gap-[8px]
            "
          >
            <SecondaryButton
              onClick={
                openPreferences
              }
            >
              {t(
                "legal.openPreferences"
              )}
            </SecondaryButton>

            <PrimaryButton
              onClick={
                closeModal
              }
            >
              {t(
                "legal.close"
              )}
            </PrimaryButton>
          </div>
        }
      >
        <DraftNotice
          title={t(
            "legal.draftTitle"
          )}
          text={t(
            "legal.draftText"
          )}
        />

        <p
          className="
            max-w-[720px]

            font-sans
            text-[13px]
            leading-[21px]
            text-[#4D463D]

            sm:text-[14px]
            sm:leading-[23px]
          "
        >
          {
            content.cookies
              .intro
          }
        </p>

        <TechnologyList
          technologies={
            content.cookies
              .technologies
          }
          labels={
            technologyLabels
          }
        />

        <div className="mt-[30px]">
          <PolicyDocument
            documentData={{
              intro: "",
              sections:
                content.cookies
                  .sections,
            }}
          />
        </div>

        {modalMeta}
      </LegalModal>

      {/* ===================================================
          PREFERENZE
          =================================================== */}

      <LegalModal
        open={
          activeModal ===
          "preferences"
        }
        title={t(
          "legal.preferencesTitle"
        )}
        eyebrow={t(
          "legal.bannerEyebrow"
        )}
        closeLabel={t(
          "legal.closeModal"
        )}
        onClose={
          closeModal
        }
        footer={
          <div
            className="
              grid
              gap-[8px]

              sm:grid-cols-3
            "
          >
            <SecondaryButton
              onClick={
                rejectAndClose
              }
            >
              {t(
                "legal.onlyNecessary"
              )}
            </SecondaryButton>

            <SecondaryButton
              onClick={
                saveAndClose
              }
            >
              {t(
                "legal.savePreferences"
              )}
            </SecondaryButton>

            <PrimaryButton
              onClick={
                acceptAndClose
              }
            >
              {t(
                "legal.acceptAll"
              )}
            </PrimaryButton>
          </div>
        }
      >
        <p
          className="
            mb-[22px]
            max-w-[680px]

            font-sans
            text-[12px]
            leading-[19px]
            text-[#635B4E]

            sm:text-[13px]
            sm:leading-[21px]
          "
        >
          {t(
            "legal.preferencesIntro"
          )}
        </p>

        <div className="space-y-[10px]">
          <PreferenceRow
            title={t(
              "legal.necessary"
            )}
            description={t(
              "legal.necessaryDescription"
            )}
            checked
            locked
            labels={{
              alwaysActive:
                t(
                  "legal.alwaysActive"
                ),

              currentlyInactive:
                t(
                  "legal.currentlyInactive"
                ),

              enabled:
                t(
                  "legal.enabled"
                ),

              disabled:
                t(
                  "legal.disabled"
                ),
            }}
          />

          <PreferenceRow
            title={t(
              "legal.preferences"
            )}
            description={t(
              "legal.preferencesDescription"
            )}
            checked={
              draftPreferences
                .preferences
            }
            available={
              availableCategories
                .preferences
            }
            onChange={(
              checked
            ) =>
              setDraftPreferences(
                (current) => ({
                  ...current,
                  preferences:
                    checked,
                })
              )
            }
            labels={{
              alwaysActive:
                t(
                  "legal.alwaysActive"
                ),

              currentlyInactive:
                t(
                  "legal.currentlyInactive"
                ),

              enabled:
                t(
                  "legal.enabled"
                ),

              disabled:
                t(
                  "legal.disabled"
                ),
            }}
          />

          <PreferenceRow
            title={t(
              "legal.analytics"
            )}
            description={t(
              "legal.analyticsDescription"
            )}
            checked={
              draftPreferences
                .analytics
            }
            available={
              availableCategories
                .analytics
            }
            onChange={(
              checked
            ) =>
              setDraftPreferences(
                (current) => ({
                  ...current,
                  analytics:
                    checked,
                })
              )
            }
            labels={{
              alwaysActive:
                t(
                  "legal.alwaysActive"
                ),

              currentlyInactive:
                t(
                  "legal.currentlyInactive"
                ),

              enabled:
                t(
                  "legal.enabled"
                ),

              disabled:
                t(
                  "legal.disabled"
                ),
            }}
          />

          <PreferenceRow
            title={t(
              "legal.marketing"
            )}
            description={t(
              "legal.marketingDescription"
            )}
            checked={
              draftPreferences
                .marketing
            }
            available={
              availableCategories
                .marketing
            }
            onChange={(
              checked
            ) =>
              setDraftPreferences(
                (current) => ({
                  ...current,
                  marketing:
                    checked,
                })
              )
            }
            labels={{
              alwaysActive:
                t(
                  "legal.alwaysActive"
                ),

              currentlyInactive:
                t(
                  "legal.currentlyInactive"
                ),

              enabled:
                t(
                  "legal.enabled"
                ),

              disabled:
                t(
                  "legal.disabled"
                ),
            }}
          />
        </div>

        <div
          className="
            mt-[22px]

            flex
            items-start
            gap-[10px]

            rounded-[13px]
            border
            border-[#CDBF9F]/70

            bg-[#E9E0CF]/35

            px-[14px]
            py-[13px]
          "
        >
          <Cookie
            aria-hidden="true"
            className="
              mt-[1px]
              h-[17px]
              w-[17px]
              shrink-0
              text-[#AD9060]
            "
            strokeWidth={1.45}
          />

          <p
            className="
              font-sans
              text-[10px]
              leading-[16px]
              text-[#635B4E]

              sm:text-[11px]
              sm:leading-[18px]
            "
          >
            {t(
              "legal.currentUsage"
            )}
          </p>
        </div>
      </LegalModal>
    </>
  );
}