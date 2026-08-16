import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Archive,
  ArrowLeft,
  Save,
  Send,
} from "lucide-react";

import {
  createEvent,
  isEventConflictError,
  updateEvent,
} from "../services/events";

import {
  isRomeDateTimeError,
  isValidSlug,
  isoToRomeLocal,
  romeRangeToIso,
  slugify,
} from "./admin-utils";

const STATUS_LABELS = {
  draft: "Bozza",
  published: "Pubblicato",
  archived: "Archiviato",
};

function emptyForm() {
  return {
    slug: "",
    titleIt: "",
    titleEn: "",
    descriptionIt: "",
    descriptionEn: "",
    startsAt: "",
    endsAt: "",
    externalUrl: "",
  };
}

function eventToForm(event) {
  if (!event) {
    return emptyForm();
  }

  return {
    slug:
      event.slug ?? "",

    titleIt:
      event.title?.it ?? "",

    titleEn:
      event.title?.en ?? "",

    descriptionIt:
      event.description?.it ?? "",

    descriptionEn:
      event.description?.en ?? "",

    startsAt:
      isoToRomeLocal(
        event.startsAt
      ),

    endsAt:
      isoToRomeLocal(
        event.endsAt
      ),

    externalUrl:
      event.externalUrl ?? "",
  };
}

function normalizeExternalUrlInput(
  value
) {
  let externalUrl =
    String(
      value ?? ""
    ).trim();

  if (!externalUrl) {
    return "";
  }

  /*
   * Consente all'admin di incollare anche:
   *
   * instagram.com/...
   * www.facebook.com/...
   *
   * senza dover scrivere manualmente
   * https://
   */
  if (
    !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(
      externalUrl
    )
  ) {
    externalUrl =
      `https://${externalUrl}`;
  }

  if (
    externalUrl.length >
    2048
  ) {
    throw new Error(
      "Il link dell'evento è troppo lungo."
    );
  }

  let parsedUrl;

  try {
    parsedUrl =
      new URL(
        externalUrl
      );
  } catch {
    throw new Error(
      "Il link dell'evento non è valido."
    );
  }

  if (
    parsedUrl.protocol !==
      "https:" &&
    parsedUrl.protocol !==
      "http:"
  ) {
    throw new Error(
      "Il link dell'evento deve essere un indirizzo web http o https."
    );
  }

  return parsedUrl.toString();
}

function Field({
  label,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#635B4E]">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "min-h-[46px] w-full rounded-[10px] border border-[#CDBF9F] bg-[#FAF6ED] px-4 font-sans text-[13px] text-[#2F2A21] outline-none transition-[border-color,box-shadow] focus:border-[#AD9060] focus:shadow-[0_0_0_3px_rgba(173,144,96,0.10)] disabled:cursor-not-allowed disabled:opacity-60";

export default function AdminEventForm({
  event,
  onBack,
  onSaved,
}) {
  const [
    form,
    setForm,
  ] = useState(
    () =>
      eventToForm(event)
  );

  const [
    initialForm,
    setInitialForm,
  ] = useState(
    () =>
      eventToForm(event)
  );

  const [
    slugWasEdited,
    setSlugWasEdited,
  ] = useState(
    Boolean(event)
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  useEffect(() => {
    const nextForm =
      eventToForm(event);

    setForm(nextForm);

    setInitialForm(
      nextForm
    );

    setSlugWasEdited(
      Boolean(event)
    );

    setErrorMessage("");
  }, [event]);

  const isEditing =
    Boolean(event?.id);

  const isDirty =
    useMemo(
      () =>
        JSON.stringify(
          form
        ) !==
        JSON.stringify(
          initialForm
        ),
      [
        form,
        initialForm,
      ]
    );

  const canPublish =
    useMemo(
      () =>
        Boolean(
          form.slug.trim() &&
            form.titleIt.trim() &&
            form.titleEn.trim() &&
            form.descriptionIt.trim() &&
            form.descriptionEn.trim() &&
            form.startsAt &&
            form.endsAt
        ),
      [form]
    );

  /*
   * Protegge da refresh/chiusura scheda
   * mentre ci sono modifiche non salvate.
   */
  useEffect(() => {
    if (
      !isDirty ||
      saving
    ) {
      return undefined;
    }

    const handleBeforeUnload =
      (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [
    isDirty,
    saving,
  ]);

  const setValue = (
    key,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleItalianTitle =
    (value) => {
      setForm(
        (current) => ({
          ...current,

          titleIt: value,

          slug:
            slugWasEdited
              ? current.slug
              : slugify(value),
        })
      );

      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const handleBack = () => {
    if (saving) {
      return;
    }

    if (
      isDirty &&
      !window.confirm(
        "Hai modifiche non salvate. Vuoi davvero tornare agli eventi?"
      )
    ) {
      return;
    }

    onBack();
  };

  const save =
    async (status) => {
      if (saving) {
        return;
      }

      setErrorMessage("");

      const normalizedSlug =
        form.slug.trim();

      if (
        !normalizedSlug ||
        !form.startsAt ||
        !form.endsAt
      ) {
        setErrorMessage(
          "Slug, data di inizio e data di fine sono obbligatori."
        );

        return;
      }

      if (
        !isValidSlug(
          normalizedSlug
        )
      ) {
        setErrorMessage(
          "Lo slug non è valido. Usa soltanto lettere minuscole, numeri e trattini."
        );

        return;
      }

      if (
        status ===
          "published" &&
        !canPublish
      ) {
        setErrorMessage(
          "Per pubblicare servono titolo e descrizione sia in italiano sia in inglese."
        );

        return;
      }

      let externalUrl;

      try {
        externalUrl =
          normalizeExternalUrlInput(
            form.externalUrl
          );
      } catch (error) {
        setErrorMessage(
          error.message
        );

        return;
      }

      let startsAt;
      let endsAt;

      try {
        const range =
          romeRangeToIso(
            form.startsAt,
            form.endsAt
          );

        startsAt =
          range.startsAt;

        endsAt =
          range.endsAt;
      } catch (error) {
        if (
          isRomeDateTimeError(
            error
          )
        ) {
          setErrorMessage(
            error.message
          );

          return;
        }

        console.error(
          "Date conversion error:",
          error
        );

        setErrorMessage(
          "Le date inserite non sono valide."
        );

        return;
      }

      setSaving(true);

      try {
        const payload = {
          slug:
            normalizedSlug,

          title: {
            it:
              form.titleIt,

            en:
              form.titleEn,
          },

          description: {
            it:
              form.descriptionIt,

            en:
              form.descriptionEn,
          },

          startsAt,
          endsAt,

          externalUrl,

          status,
        };

        const saved =
          isEditing
            ? await updateEvent(
                event.id,
                payload,
                event.updatedAt
              )
            : await createEvent(
                payload
              );

        setInitialForm(
          eventToForm(
            saved
          )
        );

        onSaved(saved);
      } catch (error) {
        console.error(
          "Save event error:",
          error
        );

        if (
          isEventConflictError(
            error
          )
        ) {
          setErrorMessage(
            "Questo evento è stato modificato da un altro amministratore mentre lo stavi modificando. Torna alla lista, aggiorna gli eventi e riaprilo prima di salvare."
          );

          return;
        }

        if (
          error?.code ===
          "23505"
        ) {
          setErrorMessage(
            "Esiste già un evento con questo slug."
          );

          return;
        }

        if (
          error?.code ===
            "23514" &&
          String(
            error?.message ??
              ""
          ).includes(
            "external_url"
          )
        ) {
          setErrorMessage(
            "Il link dell'evento non è valido. Controlla l'indirizzo inserito."
          );

          return;
        }

        if (
          error?.code ===
          "23514"
        ) {
          setErrorMessage(
            "Il database ha rifiutato i dati: controlla contenuti, slug e date."
          );

          return;
        }

        setErrorMessage(
          error?.message ||
            "Non è stato possibile salvare l'evento. Riprova."
        );
      } finally {
        setSaving(false);
      }
    };

  const normalSaveStatus =
    isEditing
      ? event.status
      : "draft";

  const showPublishButton =
    !isEditing ||
    event.status ===
      "draft";

  const showArchiveButton =
    isEditing &&
    event.status !==
      "archived";

  return (
    <div>
      <button
        type="button"
        onClick={
          handleBack
        }
        disabled={
          saving
        }
        className="inline-flex items-center gap-2 border-0 bg-transparent p-0 font-sans text-[12px] text-[#635B4E] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-40"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={1.4}
        />

        Torna agli eventi
      </button>

      <div className="mt-6 flex flex-col gap-3 border-b border-[#CDBF9F] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-[#7C644A]">
            {isEditing
              ? "Modifica evento"
              : "Nuovo evento"}
          </p>

          <h2 className="mt-2 font-serif text-[38px] leading-none sm:text-[46px]">
            {isEditing
              ? event.title.it
              : "Crea una serata"}
          </h2>
        </div>

        {isEditing && (
          <span className="w-fit rounded-full border border-[#CDBF9F] px-3 py-2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#635B4E]">
            Stato attuale:{" "}
            {STATUS_LABELS[
              event.status
            ] ??
              event.status}
          </span>
        )}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[18px] border border-[#CDBF9F] bg-[#F3EDDE] p-5 sm:p-6">
          <h3 className="font-serif text-[27px]">
            Italiano
          </h3>

          <div className="mt-5 space-y-5">
            <Field label="Titolo">
              <input
                className={
                  inputClass
                }
                value={
                  form.titleIt
                }
                onChange={(
                  event
                ) =>
                  handleItalianTitle(
                    event
                      .target
                      .value
                  )
                }
                maxLength={
                  120
                }
                disabled={
                  saving
                }
              />
            </Field>

            <Field label="Descrizione">
              <textarea
                className={`${inputClass} min-h-[120px] resize-y py-3`}
                value={
                  form.descriptionIt
                }
                onChange={(
                  event
                ) =>
                  setValue(
                    "descriptionIt",
                    event
                      .target
                      .value
                  )
                }
                maxLength={
                  500
                }
                disabled={
                  saving
                }
              />
            </Field>
          </div>
        </section>

        <section className="rounded-[18px] border border-[#CDBF9F] bg-[#F3EDDE] p-5 sm:p-6">
          <h3 className="font-serif text-[27px]">
            English
          </h3>

          <div className="mt-5 space-y-5">
            <Field label="Title">
              <input
                className={
                  inputClass
                }
                value={
                  form.titleEn
                }
                onChange={(
                  event
                ) =>
                  setValue(
                    "titleEn",
                    event
                      .target
                      .value
                  )
                }
                maxLength={
                  120
                }
                disabled={
                  saving
                }
              />
            </Field>

            <Field label="Description">
              <textarea
                className={`${inputClass} min-h-[120px] resize-y py-3`}
                value={
                  form.descriptionEn
                }
                onChange={(
                  event
                ) =>
                  setValue(
                    "descriptionEn",
                    event
                      .target
                      .value
                  )
                }
                maxLength={
                  500
                }
                disabled={
                  saving
                }
              />
            </Field>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[18px] border border-[#CDBF9F] bg-[#F3EDDE] p-5 sm:p-6">
        <h3 className="font-serif text-[27px]">
          Dettagli
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Field label="Slug">
            <input
              className={
                inputClass
              }
              value={
                form.slug
              }
              onChange={(
                event
              ) => {
                setSlugWasEdited(
                  true
                );

                setValue(
                  "slug",
                  slugify(
                    event
                      .target
                      .value
                  )
                );
              }}
              placeholder="regina-nights"
              maxLength={
                120
              }
              disabled={
                saving
              }
            />
          </Field>

          <Field label="Inizio · ora di Roma">
            <input
              type="datetime-local"
              className={
                inputClass
              }
              value={
                form.startsAt
              }
              onChange={(
                event
              ) =>
                setValue(
                  "startsAt",
                  event
                    .target
                    .value
                )
              }
              disabled={
                saving
              }
            />
          </Field>

          <Field label="Fine · ora di Roma">
            <input
              type="datetime-local"
              className={
                inputClass
              }
              value={
                form.endsAt
              }
              onChange={(
                event
              ) =>
                setValue(
                  "endsAt",
                  event
                    .target
                    .value
                )
              }
              disabled={
                saving
              }
            />
          </Field>

          <div className="md:col-span-3">
            <Field label="Link evento · opzionale">
              <input
                type="url"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={
                  false
                }
                className={
                  inputClass
                }
                value={
                  form.externalUrl
                }
                onChange={(
                  event
                ) =>
                  setValue(
                    "externalUrl",
                    event
                      .target
                      .value
                  )
                }
                placeholder="https://instagram.com/... oppure instagram.com/..."
                maxLength={
                  2048
                }
                disabled={
                  saving
                }
              />
            </Field>

            <p className="mt-2 font-sans text-[10px] leading-[1.5] text-[#786D5D]">
              Può essere un post
              Instagram, Facebook,
              pagina di prenotazione,
              locandina online o un
              altro sito collegato
              all'evento.
            </p>
          </div>
        </div>
      </section>

      {errorMessage && (
        <p
          role="alert"
          className="mt-5 rounded-[12px] border border-[#A95454]/30 bg-[#A95454]/5 px-4 py-3 font-sans text-[12px] leading-[1.55] text-[#7A3434]"
        >
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-[#CDBF9F] pt-6 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={
            saving
          }
          onClick={() =>
            save(
              normalSaveStatus
            )
          }
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#2F2A21] bg-transparent px-5 font-sans text-[12px] text-[#2F2A21] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:cursor-wait disabled:opacity-40"
        >
          <Save
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.4}
          />

          {saving
            ? "Salvataggio..."
            : isEditing
              ? "Salva modifiche"
              : "Salva bozza"}
        </button>

        {showPublishButton && (
          <button
            type="button"
            disabled={
              saving ||
              !canPublish
            }
            onClick={() =>
              save(
                "published"
              )
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-0 bg-[#2F2A21] px-5 font-sans text-[12px] text-[#F3EEE5] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Send
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.4}
            />

            Pubblica
          </button>
        )}

        {showArchiveButton && (
          <button
            type="button"
            disabled={
              saving
            }
            onClick={() =>
              save(
                "archived"
              )
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#B9A37A] bg-[#E6DEC7] px-5 font-sans text-[12px] text-[#635B4E] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-40"
          >
            <Archive
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.4}
            />

            Archivia
          </button>
        )}
      </div>
    </div>
  );
}