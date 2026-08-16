import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Archive,
  CalendarDays,
  Download,
  LogOut,
  Pencil,
  Plus,
  RefreshCcw,
  Send,
  Trash2,
} from "lucide-react";

import {
  deleteEvent,
  getAdminEvents,
  getAllEventAuditLog,
  isEventConflictError,
  setEventStatus,
} from "../services/events";

import {
  getPublicHomeUrl,
} from "./admin-utils";

import AdminEventForm from "./AdminEventForm";

const STATUS_LABELS = {
  draft: "Bozza",
  published: "Pubblicato",
  archived: "Archiviato",
};

const FILTERS = [
  ["all", "Tutti"],
  ["published", "Pubblicati"],
  ["draft", "Bozze"],
  ["archived", "Archiviati"],
];

function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "it-IT",
    {
      timeZone: "Europe/Rome",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function sortEvents(events) {
  return [...events].sort(
    (first, second) => {
      const firstTime =
        new Date(
          first.startsAt
        ).getTime();

      const secondTime =
        new Date(
          second.startsAt
        ).getTime();

      return firstTime - secondTime;
    }
  );
}

function downloadJson(
  filename,
  value
) {
  const json = JSON.stringify(
    value,
    null,
    2
  );

  const blob = new Blob(
    [json],
    {
      type: "application/json;charset=utf-8",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";

  document.body.appendChild(
    anchor
  );

  anchor.click();
  anchor.remove();

  /*
   * Il revoke viene posticipato per
   * evitare di invalidare il download
   * prima che il browser lo avvii.
   */
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

function createBackupFilename() {
  const timestamp =
    new Date()
      .toISOString()
      .replace(
        /[:.]/g,
        "-"
      );

  return `regina-caffe-backup-${timestamp}.json`;
}

function getPublishErrorMessage(
  error
) {
  if (
    error?.code === "23514" ||
    String(
      error?.message ?? ""
    ).includes(
      "events_publishable_content"
    )
  ) {
    return "L'evento non può essere pubblicato finché titolo e descrizione IT/EN non sono completi.";
  }

  return "Non è stato possibile pubblicare l'evento.";
}

export default function AdminDashboard({
  user,
  onLogout,
}) {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    busyIds,
    setBusyIds,
  ] = useState(
    () => new Set()
  );

  const [
    backupLoading,
    setBackupLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    noticeMessage,
    setNoticeMessage,
  ] = useState("");

  const [filter, setFilter] =
    useState("all");

  const [
    editingEvent,
    setEditingEvent,
  ] = useState(null);

  const [
    isCreating,
    setIsCreating,
  ] = useState(false);

  /*
   * Protegge la UI da risultati asincroni
   * arrivati fuori ordine.
   *
   * Esempio:
   * - parte refresh A
   * - parte refresh B
   * - A termina dopo B
   *
   * Senza questo controllo A potrebbe
   * sovrascrivere dati più recenti.
   */
  const loadSequence =
    useRef(0);

  const mountedRef =
    useRef(false);

  const setEventBusy =
    useCallback(
      (id, busy) => {
        setBusyIds(
          (current) => {
            const next =
              new Set(current);

            if (busy) {
              next.add(id);
            } else {
              next.delete(id);
            }

            return next;
          }
        );
      },
      []
    );

  /*
   * =======================================================
   * CARICAMENTO EVENTI
   * =======================================================
   */

  const loadEvents =
    useCallback(
      async ({
        showLoading = true,
        clearError = true,
      } = {}) => {
        const requestId =
          ++loadSequence.current;

        if (clearError) {
          setErrorMessage("");
        }

        if (showLoading) {
          setLoading(true);
        }

        try {
          const nextEvents =
            await getAdminEvents();

          if (
            !mountedRef.current ||
            requestId !==
              loadSequence.current
          ) {
            return;
          }

          setEvents(
            sortEvents(nextEvents)
          );
        } catch (error) {
          console.error(
            "Load admin events error:",
            error
          );

          if (
            !mountedRef.current ||
            requestId !==
              loadSequence.current
          ) {
            return;
          }

          setErrorMessage(
            "Non è stato possibile caricare gli eventi. Controlla la connessione e riprova."
          );
        } finally {
          if (
            mountedRef.current &&
            requestId ===
              loadSequence.current
          ) {
            setLoading(false);
          }
        }
      },
      []
    );

  useEffect(() => {
    mountedRef.current = true;

    loadEvents();

    return () => {
      mountedRef.current = false;

      /*
       * Invalida eventuali richieste
       * ancora in corso.
       */
      loadSequence.current += 1;
    };
  }, [loadEvents]);

  /*
   * =======================================================
   * FILTRI E CONTEGGI
   * =======================================================
   */

  const filteredEvents =
    useMemo(() => {
      if (filter === "all") {
        return events;
      }

      return events.filter(
        (event) =>
          event.status === filter
      );
    }, [events, filter]);

  const counts =
    useMemo(
      () => ({
        all: events.length,

        draft:
          events.filter(
            (event) =>
              event.status ===
              "draft"
          ).length,

        published:
          events.filter(
            (event) =>
              event.status ===
              "published"
          ).length,

        archived:
          events.filter(
            (event) =>
              event.status ===
              "archived"
          ).length,
      }),
      [events]
    );

  /*
   * =======================================================
   * CAMBIO STATO
   * =======================================================
   */

  const handleStatus =
    async (
      event,
      status
    ) => {
      if (
        busyIds.has(event.id)
      ) {
        return;
      }

      setEventBusy(
        event.id,
        true
      );

      setErrorMessage("");
      setNoticeMessage("");

      try {
        /*
         * updatedAt viene passato al service
         * per l'optimistic locking.
         *
         * Se un secondo amministratore ha
         * modificato l'evento nel frattempo,
         * questa operazione viene rifiutata.
         */
        const updated =
          await setEventStatus(
            event.id,
            status,
            event.updatedAt
          );

        setEvents(
          (current) =>
            sortEvents(
              current.map(
                (item) =>
                  item.id ===
                  updated.id
                    ? updated
                    : item
              )
            )
        );

        if (
          status ===
          "published"
        ) {
          setNoticeMessage(
            `“${updated.title.it}” è ora pubblicato.`
          );
        } else if (
          status === "draft"
        ) {
          setNoticeMessage(
            `“${updated.title.it}” è ora in bozza.`
          );
        } else if (
          status ===
          "archived"
        ) {
          setNoticeMessage(
            `“${updated.title.it}” è stato archiviato.`
          );
        }
      } catch (error) {
        console.error(
          "Change event status error:",
          error
        );

        if (
          isEventConflictError(
            error
          )
        ) {
          setErrorMessage(
            "Questo evento è stato modificato da un altro amministratore. Ho aggiornato la lista con la versione più recente."
          );

          await loadEvents({
            showLoading: false,
            clearError: false,
          });

          return;
        }

        if (
          status ===
          "published"
        ) {
          setErrorMessage(
            getPublishErrorMessage(
              error
            )
          );

          return;
        }

        setErrorMessage(
          "Non è stato possibile aggiornare lo stato dell'evento."
        );
      } finally {
        setEventBusy(
          event.id,
          false
        );
      }
    };

  /*
   * =======================================================
   * ELIMINAZIONE
   * =======================================================
   */

  const handleDelete =
    async (event) => {
      if (
        busyIds.has(event.id)
      ) {
        return;
      }

      const eventName =
        event.title?.it ||
        event.slug ||
        "questo evento";

      const confirmed =
        window.confirm(
          `Eliminare definitivamente “${eventName}”?\n\nL'evento verrà rimosso dal database e l'operazione resterà registrata nell'audit log.`
        );

      if (!confirmed) {
        return;
      }

      setEventBusy(
        event.id,
        true
      );

      setErrorMessage("");
      setNoticeMessage("");

      try {
        /*
         * Anche l'eliminazione utilizza
         * updatedAt per evitare di cancellare
         * una versione modificata nel frattempo
         * da un altro amministratore.
         */
        await deleteEvent(
          event.id,
          event.updatedAt
        );

        setEvents(
          (current) =>
            current.filter(
              (item) =>
                item.id !==
                event.id
            )
        );

        setNoticeMessage(
          `“${eventName}” è stato eliminato.`
        );
      } catch (error) {
        console.error(
          "Delete event error:",
          error
        );

        if (
          isEventConflictError(
            error
          )
        ) {
          setErrorMessage(
            "L'evento è cambiato da quando hai aperto la pagina oppure è già stato eliminato. Ho aggiornato la lista."
          );

          await loadEvents({
            showLoading: false,
            clearError: false,
          });

          return;
        }

        setErrorMessage(
          "Non è stato possibile eliminare l'evento."
        );
      } finally {
        setEventBusy(
          event.id,
          false
        );
      }
    };

  /*
   * =======================================================
   * BACKUP JSON
   * =======================================================
   */

  const handleBackup =
    async () => {
      if (backupLoading) {
        return;
      }

      setBackupLoading(true);

      setErrorMessage("");
      setNoticeMessage("");

      try {
        /*
         * Prendiamo dati freschi direttamente
         * dal database invece di usare soltanto
         * ciò che è attualmente mostrato nella UI.
         */
        const [
          freshEvents,
          auditLog,
        ] = await Promise.all([
          getAdminEvents(),
          getAllEventAuditLog(),
        ]);

        const exportedAt =
          new Date().toISOString();

        const backup = {
          format:
            "regina-caffe-events-backup",

          version: 1,

          exportedAt,

          source:
            window.location.origin,

          exportedBy:
            user?.email ?? null,

          timeZone:
            "Europe/Rome",

          counts: {
            events:
              freshEvents.length,

            auditEntries:
              auditLog.length,
          },

          events:
            freshEvents,

          auditLog,
        };

        downloadJson(
          createBackupFilename(),
          backup
        );

        /*
         * Allineiamo anche la dashboard
         * agli eventi freschi appena letti.
         */
        setEvents(
          sortEvents(
            freshEvents
          )
        );

        setNoticeMessage(
          "Backup eventi e audit log esportato correttamente."
        );
      } catch (error) {
        console.error(
          "Admin backup error:",
          error
        );

        setErrorMessage(
          "Non è stato possibile esportare il backup."
        );
      } finally {
        setBackupLoading(false);
      }
    };

  /*
   * =======================================================
   * FORM CREAZIONE / MODIFICA
   * =======================================================
   */

  if (
    isCreating ||
    editingEvent
  ) {
    return (
      <AdminShell
        user={user}
        onLogout={onLogout}
      >
        <AdminEventForm
          event={
            editingEvent
          }
          onBack={() => {
            setIsCreating(
              false
            );

            setEditingEvent(
              null
            );
          }}
          onSaved={(
            saved
          ) => {
            setEvents(
              (current) => {
                const exists =
                  current.some(
                    (item) =>
                      item.id ===
                      saved.id
                  );

                if (exists) {
                  return sortEvents(
                    current.map(
                      (item) =>
                        item.id ===
                        saved.id
                          ? saved
                          : item
                    )
                  );
                }

                return sortEvents([
                  ...current,
                  saved,
                ]);
              }
            );

            setIsCreating(
              false
            );

            setEditingEvent(
              null
            );

            setNoticeMessage(
              editingEvent
                ? `“${saved.title.it}” è stato aggiornato.`
                : `“${saved.title.it}” è stato creato.`
            );
          }}
        />
      </AdminShell>
    );
  }

  /*
   * =======================================================
   * DASHBOARD
   * =======================================================
   */

  return (
    <AdminShell
      user={user}
      onLogout={onLogout}
    >
      <div className="flex flex-col gap-5 border-b border-[#CDBF9F] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-[#7C644A]">
            Gestione sito
          </p>

          <h1 className="mt-2 font-serif text-[42px] font-normal leading-[0.92] sm:text-[52px]">
            Serate{" "}
            <span className="italic text-[#635B4E]">
              Regina
            </span>
          </h1>

          <p className="mt-4 max-w-[560px] font-sans text-[13px] leading-[1.6] text-[#635B4E]">
            Gestisci gli eventi visibili
            sul sito pubblico, le bozze e
            gli eventi archiviati.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            type="button"
            onClick={
              handleBackup
            }
            disabled={
              backupLoading
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#CDBF9F] bg-transparent px-4 font-sans text-[10px] text-[#635B4E] transition-[opacity,border-color] hover:border-[#AD9060] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-3 focus-visible:ring-offset-[#F2F1EC] disabled:cursor-wait disabled:opacity-40"
          >
            <Download
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.4}
            />

            {backupLoading
              ? "Esportazione..."
              : "Esporta backup"}
          </button>

          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setNoticeMessage("");
              setIsCreating(true);
            }}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-0 bg-[#2F2A21] px-5 font-serif text-[18px] text-[#F3EEE5] transition-[opacity,transform] hover:-translate-y-[1px] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-3 focus-visible:ring-offset-[#F2F1EC]"
          >
            <Plus
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.4}
            />

            Nuovo evento
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {FILTERS.map(
          ([
            value,
            label,
          ]) => (
            <button
              type="button"
              key={value}
              onClick={() =>
                setFilter(
                  value
                )
              }
              className={`rounded-full border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] ${
                filter ===
                value
                  ? "border-[#2F2A21] bg-[#2F2A21] text-[#F3EEE5]"
                  : "border-[#CDBF9F] bg-transparent text-[#635B4E] hover:border-[#AD9060]"
              }`}
            >
              {label} ·{" "}
              {counts[value]}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() =>
            loadEvents()
          }
          disabled={loading}
          className="ml-auto inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[#CDBF9F] bg-transparent text-[#635B4E] transition-[opacity,border-color] hover:border-[#AD9060] hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:cursor-wait disabled:opacity-35"
          aria-label="Aggiorna eventi"
          title="Aggiorna eventi"
        >
          <RefreshCcw
            aria-hidden="true"
            className={`h-4 w-4 ${
              loading
                ? "animate-spin"
                : ""
            }`}
            strokeWidth={1.4}
          />
        </button>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mt-5 rounded-[12px] border border-[#A95454]/30 bg-[#A95454]/5 px-4 py-3 font-sans text-[12px] leading-[1.55] text-[#7A3434]"
        >
          {errorMessage}
        </p>
      )}

      {noticeMessage && (
        <p
          role="status"
          aria-live="polite"
          className="mt-5 rounded-[12px] border border-[#7C644A]/25 bg-[#7C644A]/5 px-4 py-3 font-sans text-[12px] leading-[1.55] text-[#635B4E]"
        >
          {noticeMessage}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-[18px] border border-[#CDBF9F] bg-[#F3EDDE]">
        {loading ? (
          <div className="px-5 py-12 text-center font-sans text-[12px] text-[#635B4E]">
            Caricamento eventi...
          </div>
        ) : filteredEvents.length ===
          0 ? (
          <div className="px-5 py-12 text-center">
            <CalendarDays
              aria-hidden="true"
              className="mx-auto h-7 w-7 text-[#AD9060]"
              strokeWidth={1.3}
            />

            <p className="mt-3 font-serif text-[24px]">
              Nessun evento in questa
              sezione
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#CDBF9F]">
            {filteredEvents.map(
              (event) => {
                const busy =
                  busyIds.has(
                    event.id
                  );

                return (
                  <article
                    key={
                      event.id
                    }
                    className="grid gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-[#B9A37A] bg-[#E6DEC7] px-2.5 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.16em] text-[#635B4E]">
                          {
                            STATUS_LABELS[
                              event
                                .status
                            ] ??
                              event.status
                          }
                        </span>

                        <span className="max-w-full truncate font-sans text-[10px] text-[#8A7D6B]">
                          {
                            event.slug
                          }
                        </span>
                      </div>

                      <h2 className="mt-3 font-serif text-[28px] leading-none text-[#2F2A21]">
                        {event
                          .title
                          ?.it ||
                          "Evento senza titolo"}
                      </h2>

                      <p className="mt-2 font-sans text-[12px] leading-[1.5] text-[#635B4E]">
                        {formatDate(
                          event.startsAt
                        )}{" "}
                        →{" "}
                        {formatDate(
                          event.endsAt
                        )}
                      </p>

                      {event
                        .description
                        ?.it && (
                        <p className="mt-2 line-clamp-2 max-w-[720px] font-sans text-[11px] leading-[1.55] text-[#786D5D]">
                          {
                            event
                              .description
                              .it
                          }
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        disabled={
                          busy
                        }
                        onClick={() => {
                          setErrorMessage(
                            ""
                          );

                          setNoticeMessage(
                            ""
                          );

                          setEditingEvent(
                            event
                          );
                        }}
                        className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#CDBF9F] bg-transparent px-3.5 font-sans text-[10px] text-[#635B4E] transition-colors hover:border-[#AD9060] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-35"
                      >
                        <Pencil
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          strokeWidth={
                            1.4
                          }
                        />

                        Modifica
                      </button>

                      {event.status ===
                        "draft" && (
                        <button
                          type="button"
                          disabled={
                            busy
                          }
                          onClick={() =>
                            handleStatus(
                              event,
                              "published"
                            )
                          }
                          className="inline-flex h-[38px] items-center gap-2 rounded-full border-0 bg-[#2F2A21] px-3.5 font-sans text-[10px] text-[#F3EEE5] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-35"
                        >
                          <Send
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            strokeWidth={
                              1.4
                            }
                          />

                          Pubblica
                        </button>
                      )}

                      {event.status ===
                        "published" && (
                        <button
                          type="button"
                          disabled={
                            busy
                          }
                          onClick={() =>
                            handleStatus(
                              event,
                              "draft"
                            )
                          }
                          className="inline-flex h-[38px] items-center rounded-full border border-[#CDBF9F] bg-transparent px-3.5 font-sans text-[10px] text-[#635B4E] transition-colors hover:border-[#AD9060] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-35"
                        >
                          Ritira
                        </button>
                      )}

                      {event.status ===
                        "archived" && (
                        <button
                          type="button"
                          disabled={
                            busy
                          }
                          onClick={() =>
                            handleStatus(
                              event,
                              "draft"
                            )
                          }
                          className="inline-flex h-[38px] items-center gap-2 rounded-full border border-[#CDBF9F] bg-transparent px-3.5 font-sans text-[10px] text-[#635B4E] transition-colors hover:border-[#AD9060] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-35"
                        >
                          <RefreshCcw
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            strokeWidth={
                              1.4
                            }
                          />

                          Ripristina
                        </button>
                      )}

                      {event.status !==
                        "archived" && (
                        <button
                          type="button"
                          disabled={
                            busy
                          }
                          onClick={() =>
                            handleStatus(
                              event,
                              "archived"
                            )
                          }
                          className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#CDBF9F] bg-transparent text-[#635B4E] transition-colors hover:border-[#AD9060] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:opacity-35"
                          aria-label={`Archivia ${
                            event
                              .title
                              ?.it ??
                            "evento"
                          }`}
                          title="Archivia"
                        >
                          <Archive
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            strokeWidth={
                              1.4
                            }
                          />
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={
                          busy
                        }
                        onClick={() =>
                          handleDelete(
                            event
                          )
                        }
                        className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#A95454]/30 bg-transparent text-[#8C4545] transition-colors hover:bg-[#A95454]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A95454] disabled:opacity-35"
                        aria-label={`Elimina ${
                          event
                            .title
                            ?.it ??
                          "evento"
                        }`}
                        title="Elimina"
                      >
                        <Trash2
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          strokeWidth={
                            1.4
                          }
                        />
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

/*
 * =========================================================
 * SHELL ADMIN
 * =========================================================
 */

function AdminShell({
  user,
  onLogout,
  children,
}) {
  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  const handleLogout =
    async () => {
      if (loggingOut) {
        return;
      }

      setLoggingOut(true);

      try {
        await onLogout();
      } finally {
        setLoggingOut(false);
      }
    };

  return (
    <main className="min-h-screen bg-[#F2F1EC] text-[#2F2A21]">
      <header className="border-b border-[#CDBF9F] bg-[#F3EDDE]">
        <div className="mx-auto flex min-h-[58px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-10 xl:px-12">
          <a
            href={getPublicHomeUrl()}
            className="font-serif text-[22px] text-[#2F2A21] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060]"
          >
            Regina Caffè{" "}
            <span className="italic text-[#635B4E]">
              Admin
            </span>
          </a>

          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden max-w-[240px] truncate font-sans text-[10px] text-[#635B4E] sm:block">
              {user?.email ??
                "Amministratore"}
            </span>

            <button
              type="button"
              onClick={
                handleLogout
              }
              disabled={
                loggingOut
              }
              className="inline-flex h-[36px] items-center gap-2 rounded-full border border-[#CDBF9F] bg-transparent px-3 font-sans text-[10px] text-[#635B4E] transition-[opacity,border-color] hover:border-[#AD9060] hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] disabled:cursor-wait disabled:opacity-40"
            >
              <LogOut
                aria-hidden="true"
                className="h-3.5 w-3.5"
                strokeWidth={1.4}
              />

              {loggingOut
                ? "Uscita..."
                : "Esci"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11 xl:px-12">
        {children}
      </div>
    </main>
  );
}