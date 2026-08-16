import { requireSupabase } from "../lib/supabase";

const EVENT_STATUSES = new Set([
  "draft",
  "published",
  "archived",
]);

const PUBLIC_EVENT_COLUMNS = `
  id,
  slug,
  title_it,
  title_en,
  description_it,
  description_en,
  starts_at,
  ends_at,
  external_url
`;

const ADMIN_EVENT_COLUMNS = `
  id,
  slug,
  title_it,
  title_en,
  description_it,
  description_en,
  starts_at,
  ends_at,
  external_url,
  status,
  published_at,
  created_at,
  updated_at
`;

const AUDIT_LOG_COLUMNS = `
  id,
  event_id,
  action,
  actor_id,
  occurred_at,
  old_row,
  new_row
`;

export class EventConflictError extends Error {
  constructor(
    message =
      "L'evento è stato modificato da un altro amministratore."
  ) {
    super(message);

    this.name = "EventConflictError";
    this.code = "EVENT_CONFLICT";
  }
}

export function isEventConflictError(
  error
) {
  return (
    error instanceof EventConflictError ||
    error?.code === "EVENT_CONFLICT"
  );
}

function cleanText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function assertEventId(id) {
  if (
    typeof id !== "string" ||
    id.trim() === ""
  ) {
    throw new Error(
      "Identificativo evento non valido."
    );
  }
}

function assertStatus(status) {
  if (!EVENT_STATUSES.has(status)) {
    throw new Error(
      "Stato evento non valido."
    );
  }
}

function assertIsoDate(
  value,
  fieldName
) {
  if (
    typeof value !== "string" ||
    value.trim() === "" ||
    Number.isNaN(Date.parse(value))
  ) {
    throw new Error(
      `${fieldName} non valida.`
    );
  }
}

function normalizeExternalUrl(value) {
  let externalUrl =
    cleanText(value);

  if (!externalUrl) {
    return null;
  }

  /*
   * Per comodità accettiamo anche:
   *
   * instagram.com/...
   * www.instagram.com/...
   *
   * e aggiungiamo automaticamente https://
   */
  if (
    !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(
      externalUrl
    )
  ) {
    externalUrl =
      `https://${externalUrl}`;
  }

  if (externalUrl.length > 2048) {
    throw new Error(
      "Il link dell'evento è troppo lungo."
    );
  }

  let parsedUrl;

  try {
    parsedUrl =
      new URL(externalUrl);
  } catch {
    throw new Error(
      "Il link dell'evento non è valido."
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.protocol !== "http:"
  ) {
    throw new Error(
      "Il link dell'evento deve iniziare con http:// oppure https://."
    );
  }

  return parsedUrl.toString();
}

function mapEvent(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    slug: row.slug,

    title: {
      it: row.title_it ?? "",
      en:
        row.title_en ??
        row.title_it ??
        "",
    },

    description: {
      it:
        row.description_it ??
        "",

      en:
        row.description_en ??
        row.description_it ??
        "",
    },

    startsAt:
      row.starts_at,

    endsAt:
      row.ends_at,

    externalUrl:
      row.external_url ?? "",

    status:
      row.status ?? null,

    publishedAt:
      row.published_at ?? null,

    createdAt:
      row.created_at ?? null,

    updatedAt:
      row.updated_at ?? null,
  };
}

function toDatabasePayload(event) {
  if (
    !event ||
    typeof event !== "object"
  ) {
    throw new Error(
      "Dati evento non validi."
    );
  }

  const slug =
    cleanText(event.slug);

  const titleIt =
    cleanText(
      event.title?.it
    );

  const titleEn =
    cleanText(
      event.title?.en
    );

  const descriptionIt =
    cleanText(
      event.description?.it
    );

  const descriptionEn =
    cleanText(
      event.description?.en
    );

  const externalUrl =
    normalizeExternalUrl(
      event.externalUrl
    );

  const status =
    event.status ?? "draft";

  if (!slug) {
    throw new Error(
      "Lo slug dell'evento è obbligatorio."
    );
  }

  assertStatus(status);

  assertIsoDate(
    event.startsAt,
    "Data di inizio"
  );

  assertIsoDate(
    event.endsAt,
    "Data di fine"
  );

  if (
    new Date(
      event.endsAt
    ).getTime() <=
    new Date(
      event.startsAt
    ).getTime()
  ) {
    throw new Error(
      "La fine dell'evento deve essere successiva all'inizio."
    );
  }

  return {
    slug,

    title_it:
      titleIt,

    title_en:
      titleEn,

    description_it:
      descriptionIt,

    description_en:
      descriptionEn,

    starts_at:
      event.startsAt,

    ends_at:
      event.endsAt,

    external_url:
      externalUrl,

    status,
  };
}

/*
 * =========================================================
 * SITO PUBBLICO
 * =========================================================
 */

/*
 * Restituisce soltanto gli eventi pubblicati
 * che non sono ancora terminati.
 *
 * La RLS impedisce comunque agli utenti
 * anonimi di leggere bozze o archiviati.
 */
export async function getPublishedEvents() {
  const supabase =
    requireSupabase();

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .select(
      PUBLIC_EVENT_COLUMNS
    )
    .eq(
      "status",
      "published"
    )
    .gte(
      "ends_at",
      new Date().toISOString()
    )
    .order(
      "starts_at",
      {
        ascending: true,
      }
    );

  if (error) {
    console.error(
      "Errore durante il caricamento degli eventi pubblici:",
      error
    );

    throw error;
  }

  return (
    data ?? []
  ).map(mapEvent);
}

/*
 * Recupera un singolo evento pubblico
 * tramite slug.
 *
 * Rimane disponibile nel service anche
 * se attualmente la freccia pubblica usa
 * externalUrl.
 */
export async function getPublishedEventBySlug(
  slug
) {
  const supabase =
    requireSupabase();

  const normalizedSlug =
    cleanText(
      slug
    ).toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .select(
      PUBLIC_EVENT_COLUMNS
    )
    .eq(
      "slug",
      normalizedSlug
    )
    .eq(
      "status",
      "published"
    )
    .maybeSingle();

  if (error) {
    console.error(
      "Errore durante il caricamento dell'evento:",
      error
    );

    throw error;
  }

  return mapEvent(data);
}

/*
 * =========================================================
 * AREA ADMIN
 * =========================================================
 */

export async function getAdminEvents() {
  const supabase =
    requireSupabase();

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .select(
      ADMIN_EVENT_COLUMNS
    )
    .order(
      "starts_at",
      {
        ascending: true,
      }
    );

  if (error) {
    console.error(
      "Errore durante il caricamento degli eventi admin:",
      error
    );

    throw error;
  }

  return (
    data ?? []
  ).map(mapEvent);
}

export async function getAdminEventById(
  id
) {
  assertEventId(id);

  const supabase =
    requireSupabase();

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .select(
      ADMIN_EVENT_COLUMNS
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return mapEvent(data);
}

/*
 * =========================================================
 * CREA EVENTO
 * =========================================================
 */

export async function createEvent(
  event
) {
  const supabase =
    requireSupabase();

  const payload =
    toDatabasePayload(event);

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .insert(payload)
    .select(
      ADMIN_EVENT_COLUMNS
    )
    .single();

  if (error) {
    throw error;
  }

  return mapEvent(data);
}

/*
 * =========================================================
 * MODIFICA EVENTO
 * =========================================================
 *
 * expectedUpdatedAt implementa
 * l'optimistic locking.
 */

export async function updateEvent(
  id,
  event,
  expectedUpdatedAt =
    event?.updatedAt ?? null
) {
  assertEventId(id);

  const supabase =
    requireSupabase();

  const payload =
    toDatabasePayload(event);

  let query =
    supabase
      .from("events")
      .update(payload)
      .eq("id", id);

  if (expectedUpdatedAt) {
    query =
      query.eq(
        "updated_at",
        expectedUpdatedAt
      );
  }

  const {
    data,
    error,
  } = await query
    .select(
      ADMIN_EVENT_COLUMNS
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new EventConflictError();
  }

  return mapEvent(data);
}

/*
 * =========================================================
 * CAMBIO STATO
 * =========================================================
 */

export async function setEventStatus(
  id,
  status,
  expectedUpdatedAt = null
) {
  assertEventId(id);
  assertStatus(status);

  const supabase =
    requireSupabase();

  let query =
    supabase
      .from("events")
      .update({
        status,
      })
      .eq("id", id);

  if (expectedUpdatedAt) {
    query =
      query.eq(
        "updated_at",
        expectedUpdatedAt
      );
  }

  const {
    data,
    error,
  } = await query
    .select(
      ADMIN_EVENT_COLUMNS
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new EventConflictError();
  }

  return mapEvent(data);
}

/*
 * =========================================================
 * ELIMINA EVENTO
 * =========================================================
 */

export async function deleteEvent(
  id,
  expectedUpdatedAt = null
) {
  assertEventId(id);

  const supabase =
    requireSupabase();

  let query =
    supabase
      .from("events")
      .delete()
      .eq("id", id);

  if (expectedUpdatedAt) {
    query =
      query.eq(
        "updated_at",
        expectedUpdatedAt
      );
  }

  const {
    data,
    error,
  } = await query
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new EventConflictError(
      "L'evento è stato modificato o non è più disponibile. Aggiorna la lista prima di eliminarlo."
    );
  }

  return true;
}

/*
 * =========================================================
 * AUDIT LOG
 * =========================================================
 */

export async function getEventAuditLog({
  limit = 250,
} = {}) {
  const supabase =
    requireSupabase();

  const safeLimit =
    Math.min(
      Math.max(
        Number.parseInt(
          limit,
          10
        ) || 250,
        1
      ),
      1000
    );

  const {
    data,
    error,
  } = await supabase
    .from(
      "event_audit_log"
    )
    .select(
      AUDIT_LOG_COLUMNS
    )
    .order(
      "occurred_at",
      {
        ascending: false,
      }
    )
    .limit(safeLimit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

/*
 * Recupera tutto l'audit log a pagine.
 * Usato principalmente dal backup admin.
 */
export async function getAllEventAuditLog({
  pageSize = 500,
} = {}) {
  const supabase =
    requireSupabase();

  const safePageSize =
    Math.min(
      Math.max(
        Number.parseInt(
          pageSize,
          10
        ) || 500,
        50
      ),
      1000
    );

  const result = [];

  let from = 0;

  while (true) {
    const to =
      from +
      safePageSize -
      1;

    const {
      data,
      error,
    } = await supabase
      .from(
        "event_audit_log"
      )
      .select(
        AUDIT_LOG_COLUMNS
      )
      .order(
        "occurred_at",
        {
          ascending: true,
        }
      )
      .range(
        from,
        to
      );

    if (error) {
      throw error;
    }

    const rows =
      data ?? [];

    result.push(
      ...rows
    );

    if (
      rows.length <
      safePageSize
    ) {
      break;
    }

    from +=
      safePageSize;
  }

  return result;
}