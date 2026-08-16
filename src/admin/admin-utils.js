const ROME_TIME_ZONE = "Europe/Rome";

const MAX_SLUG_LENGTH = 120;

export class RomeDateTimeError extends Error {
  constructor(message, code) {
    super(message);

    this.name = "RomeDateTimeError";
    this.code = code;
  }
}

export function isRomeDateTimeError(error) {
  return error instanceof RomeDateTimeError;
}

export function slugify(
  value,
  maxLength = MAX_SLUG_LENGTH
) {
  const normalized = String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized
    .slice(0, maxLength)
    .replace(/-+$/g, "");
}

export function isValidSlug(value) {
  if (typeof value !== "string") {
    return false;
  }

  const slug = value.trim();

  return (
    slug.length > 0 &&
    slug.length <= MAX_SLUG_LENGTH &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      slug
    )
  );
}

function parseLocalDateTime(value) {
  if (typeof value !== "string") {
    throw new RomeDateTimeError(
      "Data e ora non valide.",
      "INVALID_LOCAL_DATETIME"
    );
  }

  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/
  );

  if (!match) {
    throw new RomeDateTimeError(
      "Formato data e ora non valido.",
      "INVALID_LOCAL_DATETIME"
    );
  }

  const [
    ,
    yearText,
    monthText,
    dayText,
    hourText,
    minuteText,
    secondText = "00",
  ] = match;

  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    throw new RomeDateTimeError(
      "Data e ora non valide.",
      "INVALID_LOCAL_DATETIME"
    );
  }

  /*
   * Verifica anche date impossibili
   * come 31 febbraio.
   */
  const testDate = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      hour,
      minute,
      second
    )
  );

  if (
    testDate.getUTCFullYear() !== year ||
    testDate.getUTCMonth() !==
      month - 1 ||
    testDate.getUTCDate() !== day ||
    testDate.getUTCHours() !== hour ||
    testDate.getUTCMinutes() !==
      minute ||
    testDate.getUTCSeconds() !== second
  ) {
    throw new RomeDateTimeError(
      "La data inserita non esiste.",
      "INVALID_LOCAL_DATETIME"
    );
  }

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
}

function getZonedParts(
  date,
  timeZone = ROME_TIME_ZONE
) {
  const formatter =
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });

  const parts =
    formatter.formatToParts(date);

  const result = {};

  for (const part of parts) {
    if (part.type === "literal") {
      continue;
    }

    result[part.type] = part.value;
  }

  return {
    year: Number(result.year),
    month: Number(result.month),
    day: Number(result.day),
    hour: Number(result.hour),
    minute: Number(result.minute),
    second: Number(result.second),
  };
}

function getTimeZoneOffsetMs(
  date,
  timeZone = ROME_TIME_ZONE
) {
  const parts = getZonedParts(
    date,
    timeZone
  );

  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return asUtc - date.getTime();
}

function sameLocalDateTime(
  first,
  second
) {
  return (
    first.year === second.year &&
    first.month === second.month &&
    first.day === second.day &&
    first.hour === second.hour &&
    first.minute === second.minute &&
    first.second === second.second
  );
}

/*
 * Restituisce tutti gli istanti UTC
 * che corrispondono a una specifica
 * data/ora locale di Roma.
 *
 * Normalmente ne esiste uno.
 *
 * Durante il cambio ora:
 *
 * - primavera: possono essere 0
 *   perché alcuni orari locali non esistono;
 *
 * - autunno: possono essere 2
 *   perché alcuni orari vengono ripetuti.
 */
function getRomeUtcCandidates(
  localParts
) {
  const wallClockAsUtc = Date.UTC(
    localParts.year,
    localParts.month - 1,
    localParts.day,
    localParts.hour,
    localParts.minute,
    localParts.second
  );

  /*
   * Controlliamo gli offset nei giorni
   * circostanti. Questo intercetta sia
   * CET sia CEST anche nelle giornate
   * del cambio dell'ora.
   */
  const sampleOffsets = [
    -7 * 24,
    -2 * 24,
    -24,
    0,
    24,
    2 * 24,
    7 * 24,
  ];

  const offsets = new Set();

  for (const hours of sampleOffsets) {
    const sampleDate = new Date(
      wallClockAsUtc +
        hours * 60 * 60 * 1000
    );

    offsets.add(
      getTimeZoneOffsetMs(
        sampleDate,
        ROME_TIME_ZONE
      )
    );
  }

  const candidates = [];

  for (const offset of offsets) {
    const utcMs =
      wallClockAsUtc - offset;

    const candidate =
      new Date(utcMs);

    const candidateLocalParts =
      getZonedParts(
        candidate,
        ROME_TIME_ZONE
      );

    if (
      sameLocalDateTime(
        localParts,
        candidateLocalParts
      )
    ) {
      candidates.push(candidate);
    }
  }

  /*
   * Elimina eventuali duplicati e
   * ordina cronologicamente.
   */
  const uniqueCandidates = [
    ...new Map(
      candidates.map((candidate) => [
        candidate.getTime(),
        candidate,
      ])
    ).values(),
  ];

  uniqueCandidates.sort(
    (a, b) =>
      a.getTime() - b.getTime()
  );

  return uniqueCandidates;
}

/*
 * Analizza una data/ora locale italiana
 * senza effettuare conversioni silenziose.
 */
export function analyzeRomeLocalDateTime(
  value
) {
  if (!value) {
    return {
      valid: false,
      nonexistent: false,
      ambiguous: false,
      candidates: [],
    };
  }

  let localParts;

  try {
    localParts =
      parseLocalDateTime(value);
  } catch {
    return {
      valid: false,
      nonexistent: false,
      ambiguous: false,
      candidates: [],
    };
  }

  const candidates =
    getRomeUtcCandidates(localParts);

  return {
    valid: candidates.length > 0,

    /*
     * Per esempio le 02:30 nel giorno
     * del passaggio all'ora legale.
     */
    nonexistent:
      candidates.length === 0,

    /*
     * Per esempio le 02:30 nel giorno
     * del ritorno all'ora solare.
     */
    ambiguous:
      candidates.length > 1,

    candidates:
      candidates.map((date) =>
        date.toISOString()
      ),
  };
}

/*
 * Converte un datetime-local interpretato
 * SEMPRE nel fuso Europe/Rome.
 *
 * Non utilizza il fuso orario del computer
 * dell'amministratore.
 *
 * Per sicurezza, un'ora ambigua durante
 * il ritorno all'ora solare viene rifiutata
 * di default anziché scegliere arbitrariamente.
 *
 * È comunque possibile specificare:
 *
 * disambiguation: "earlier"
 * disambiguation: "later"
 */
export function romeLocalToIso(
  value,
  {
    disambiguation = "reject",
  } = {}
) {
  if (!value) {
    return "";
  }

  const localParts =
    parseLocalDateTime(value);

  const candidates =
    getRomeUtcCandidates(localParts);

  if (candidates.length === 0) {
    throw new RomeDateTimeError(
      "Questo orario non esiste in Italia a causa del passaggio all'ora legale. Scegli un altro orario.",
      "NONEXISTENT_LOCAL_DATETIME"
    );
  }

  if (candidates.length > 1) {
    if (disambiguation === "earlier") {
      return candidates[0].toISOString();
    }

    if (disambiguation === "later") {
      return candidates[
        candidates.length - 1
      ].toISOString();
    }

    throw new RomeDateTimeError(
      "Questo orario è ambiguo a causa del ritorno all'ora solare. Scegli un altro orario.",
      "AMBIGUOUS_LOCAL_DATETIME"
    );
  }

  return candidates[0].toISOString();
}

/*
 * Converte una data UTC/Supabase
 * nel valore utilizzabile da
 * <input type="datetime-local">,
 * sempre nel fuso Europe/Rome.
 */
export function isoToRomeLocal(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const parts = getZonedParts(
    date,
    ROME_TIME_ZONE
  );

  const pad = (number) =>
    String(number).padStart(2, "0");

  return [
    `${parts.year}-${pad(
      parts.month
    )}-${pad(parts.day)}`,
    `${pad(parts.hour)}:${pad(
      parts.minute
    )}`,
  ].join("T");
}

/*
 * Converte e valida insieme
 * inizio e fine evento.
 *
 * La useremo nel form admin
 * per avere una sola fonte
 * di verità.
 */
export function romeRangeToIso(
  startsAtLocal,
  endsAtLocal
) {
  const startsAt =
    romeLocalToIso(startsAtLocal);

  const endsAt =
    romeLocalToIso(endsAtLocal);

  if (
    new Date(endsAt).getTime() <=
    new Date(startsAt).getTime()
  ) {
    throw new RomeDateTimeError(
      "La fine dell'evento deve essere successiva all'inizio.",
      "INVALID_TIME_RANGE"
    );
  }

  return {
    startsAt,
    endsAt,
  };
}

function getNormalizedBasePath() {
  const rawBase =
    import.meta.env.BASE_URL || "/";

  let pathname = rawBase;

  try {
    pathname = new URL(
      rawBase,
      window.location.origin
    ).pathname;
  } catch {
    pathname = rawBase;
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  if (!pathname.endsWith("/")) {
    pathname = `${pathname}/`;
  }

  return pathname.replace(
    /\/{2,}/g,
    "/"
  );
}

export function getPublicHomeUrl() {
  return getNormalizedBasePath();
}

export function getAdminPath() {
  return `${getNormalizedBasePath()}admin`;
}

export function getAdminUrl() {
  return new URL(
    getAdminPath(),
    window.location.origin
  ).toString();
}

export function getPublicEventPath(slug) {
  const normalizedSlug =
    slugify(slug);

  if (!normalizedSlug) {
    return getPublicHomeUrl();
  }

  return `${getNormalizedBasePath()}eventi/${encodeURIComponent(
    normalizedSlug
  )}`;
}

export function getPublicEventUrl(slug) {
  return new URL(
    getPublicEventPath(slug),
    window.location.origin
  ).toString();
}