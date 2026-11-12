/*
 * Varianti di animazione condivise dalle
 * pagine del menu. Stessi tempi e stessa
 * curva della pagina menu originale.
 */

export const MENU_EASE = [0.22, 1, 0.36, 1];

export function getRevealVariants(reduceMotion) {
  return {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 22,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: reduceMotion ? 0 : 0.72,
        ease: MENU_EASE,
      },
    },
  };
}

export function getContainerVariants(reduceMotion) {
  return {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.055,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
}

export function getItemVariants(reduceMotion) {
  return {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 10,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: reduceMotion ? 0 : 0.52,
        ease: MENU_EASE,
      },
    },
  };
}

/*
 * Animazione d'ingresso per gli elementi
 * della testata (animate, non whileInView).
 */
export function getEnterProps(
  reduceMotion,
  {
    delay = 0,
    y = 14,
    x = 0,
    duration = 0.72,
  } = {}
) {
  return {
    initial: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : y,
      x: reduceMotion ? 0 : x,
    },

    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },

    transition: {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      ease: MENU_EASE,
    },
  };
}
