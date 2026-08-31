import {
  useEffect,
  useState,
} from "react";

/*
 * =======================================================
 * ROTAZIONE DELLE IMMAGINI
 * =======================================================
 *
 * Restituisce l'indice dell'immagine
 * attualmente visibile in una dissolvenza
 * incrociata.
 *
 * Chi la usa impila le immagini una sopra
 * l'altra e mostra soltanto quella attiva:
 * la transizione resta quindi una questione
 * di CSS, coerente con il resto del sito.
 *
 * Con "riduci animazioni" attivo la rotazione
 * non parte affatto e resta visibile la prima
 * immagine, senza dissolvenze.
 */
export function useImageRotation(
  count,
  intervalMs
) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (count < 2) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const rotation = window.setInterval(
      () => {
        setActiveIndex(
          (current) =>
            (current + 1) % count
        );
      },
      intervalMs
    );

    return () => {
      window.clearInterval(rotation);
    };
  }, [count, intervalMs]);

  return activeIndex;
}
