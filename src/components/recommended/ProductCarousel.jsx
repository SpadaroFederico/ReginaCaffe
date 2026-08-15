import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ProductCard from "./ProductCard";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ProductCarousel({ products }) {
  const carouselRef = useRef(null);

  const animationFrameRef = useRef(null);
  const controlsFrameRef = useRef(null);

  const { t } = useLanguage();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  /**
   * Interrompe un'eventuale animazione in corso.
   * Viene richiamata anche quando l'utente interagisce
   * manualmente con touch, mouse o trackpad.
   */
  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const carousel = carouselRef.current;

    if (carousel) {
      carousel.style.scrollSnapType = "";
    }
  }, []);

  /**
   * Aggiorna lo stato delle frecce.
   */
  const updateControls = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const maxScroll = Math.max(
      0,
      carousel.scrollWidth - carousel.clientWidth
    );

    const nextCanGoBack = carousel.scrollLeft > 3;

    const nextCanGoNext =
      maxScroll > 3 &&
      carousel.scrollLeft < maxScroll - 3;

    setCanGoBack((current) =>
      current === nextCanGoBack
        ? current
        : nextCanGoBack
    );

    setCanGoNext((current) =>
      current === nextCanGoNext
        ? current
        : nextCanGoNext
    );
  }, []);

  /**
   * Evita di aggiornare React decine di volte
   * nello stesso frame durante lo scorrimento.
   */
  const requestControlsUpdate = useCallback(() => {
    if (controlsFrameRef.current !== null) {
      return;
    }

    controlsFrameRef.current =
      requestAnimationFrame(() => {
        controlsFrameRef.current = null;
        updateControls();
      });
  }, [updateControls]);

  /**
   * Restituisce tutte le posizioni valide di arresto.
   * Usa le coordinate reali delle card invece di fare
   * affidamento su width + gap, evitando errori di
   * arrotondamento tra i diversi browser.
   */
  const getScrollTargets = useCallback(() => {
    const carousel = carouselRef.current;

    if (!carousel) return [];

    const carouselRect =
      carousel.getBoundingClientRect();

    const maxScroll = Math.max(
      0,
      carousel.scrollWidth - carousel.clientWidth
    );

    const cardPositions = Array.from(
      carousel.children
    ).map((card) => {
      const cardRect = card.getBoundingClientRect();

      const rawPosition =
        cardRect.left -
        carouselRect.left +
        carousel.scrollLeft;

      return Math.min(
        maxScroll,
        Math.max(0, rawPosition)
      );
    });

    const positions = [
      0,
      ...cardPositions,
      maxScroll,
    ].sort((a, b) => a - b);

    /**
     * Elimina posizioni duplicate, che possono
     * comparire quando le ultime card vengono
     * limitate dal maxScroll.
     */
    return positions.filter(
      (position, index, values) =>
        index === 0 ||
        Math.abs(position - values[index - 1]) > 1
    );
  }, []);

  /**
   * Animazione personalizzata.
   * L'easing produce una partenza pronta e una
   * decelerazione molto morbida sul punto finale.
   */
  const animateTo = useCallback(
    (requestedTarget) => {
      const carousel = carouselRef.current;

      if (!carousel) return;

      cancelAnimation();

      const maxScroll = Math.max(
        0,
        carousel.scrollWidth -
          carousel.clientWidth
      );

      const startPosition = carousel.scrollLeft;

      const targetPosition = Math.min(
        maxScroll,
        Math.max(0, requestedTarget)
      );

      const distance =
        targetPosition - startPosition;

      if (Math.abs(distance) < 1) {
        carousel.scrollLeft = targetPosition;
        requestControlsUpdate();
        return;
      }

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (prefersReducedMotion) {
        carousel.scrollLeft = targetPosition;
        requestControlsUpdate();
        return;
      }

      /**
       * Durante l'animazione disattiviamo temporaneamente
       * lo snap nativo, altrimenti alcuni browser possono
       * cercare di correggere la posizione a ogni frame.
       */
      carousel.style.scrollSnapType = "none";

      const startTime = performance.now();

      /**
       * Durata adattiva:
       * resta elegante sia su mobile sia su desktop,
       * senza diventare lenta sulle card più larghe.
       */
      const duration = Math.min(
        620,
        Math.max(460, Math.abs(distance) * 1.1)
      );

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        /**
         * Easing equivalente a una curva premium
         * con forte decelerazione finale.
         */
        const easedProgress =
          1 - Math.pow(1 - progress, 4);

        carousel.scrollLeft =
          startPosition +
          distance * easedProgress;

        requestControlsUpdate();

        if (progress < 1) {
          animationFrameRef.current =
            requestAnimationFrame(animate);

          return;
        }

        carousel.scrollLeft = targetPosition;
        carousel.style.scrollSnapType = "";

        animationFrameRef.current = null;

        requestControlsUpdate();
      };

      animationFrameRef.current =
        requestAnimationFrame(animate);
    },
    [
      cancelAnimation,
      requestControlsUpdate,
    ]
  );

  /**
   * Va alla card precedente o successiva,
   * usando il primo target utile rispetto
   * alla posizione corrente.
   */
  const scroll = useCallback(
    (direction) => {
      const carousel = carouselRef.current;

      if (!carousel) return;

      const targets = getScrollTargets();

      if (!targets.length) return;

      const currentPosition = carousel.scrollLeft;
      const tolerance = 4;

      let targetPosition;

      if (direction === "next") {
        targetPosition = targets.find(
          (position) =>
            position >
            currentPosition + tolerance
        );

        if (targetPosition === undefined) {
          targetPosition =
            targets[targets.length - 1];
        }
      } else {
        targetPosition = [...targets]
          .reverse()
          .find(
            (position) =>
              position <
              currentPosition - tolerance
          );

        if (targetPosition === undefined) {
          targetPosition = targets[0];
        }
      }

      animateTo(targetPosition);
    },
    [animateTo, getScrollTargets]
  );

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return undefined;

    updateControls();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            requestControlsUpdate();
          })
        : null;

    resizeObserver?.observe(carousel);

    const handleResize = () => {
      requestControlsUpdate();
    };

    if (!resizeObserver) {
      window.addEventListener(
        "resize",
        handleResize
      );
    }

    return () => {
      resizeObserver?.disconnect();

      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimation();

      if (controlsFrameRef.current !== null) {
        cancelAnimationFrame(
          controlsFrameRef.current
        );

        controlsFrameRef.current = null;
      }
    };
  }, [
    products.length,
    cancelAnimation,
    requestControlsUpdate,
    updateControls,
  ]);

  return (
    <div
      className="
        grid
        grid-cols-[22px_minmax(0,1fr)_22px]
        items-start
        gap-x-[6px]

        sm:grid-cols-[28px_minmax(0,1fr)_28px]
        sm:gap-x-[10px]

        lg:grid-cols-[30px_minmax(0,1fr)_30px]
        lg:gap-x-[12px]
      "
    >
      {/* Freccia precedente */}
      <button
        type="button"
        onClick={() => scroll("prev")}
        disabled={!canGoBack}
        aria-label={t("recommended.previous")}
        className="
          group/previous

          mt-[clamp(64px,20vw,90px)]

          flex
          h-[38px]
          w-full
          items-center
          justify-center

          border-0
          bg-transparent
          p-0

          text-[#2F2A21]

          transition-opacity
          duration-300
          ease-out

          disabled:cursor-default
          disabled:opacity-20

          sm:mt-[clamp(95px,14vw,118px)]
          sm:h-[42px]

          lg:mt-[clamp(112px,11vw,150px)]
          lg:h-[46px]
        "
      >
        <ChevronLeft
          strokeWidth={1.2}
          className="
            h-[23px]
            w-[23px]

            transition-transform
            duration-300
            ease-out

            group-hover/previous:-translate-x-[2px]

            group-disabled/previous:translate-x-0

            sm:h-[25px]
            sm:w-[25px]
          "
        />
      </button>

      {/* Track delle card */}
      <div
        ref={carouselRef}
        onScroll={requestControlsUpdate}
        onPointerDown={cancelAnimation}
        onWheel={cancelAnimation}
        className="
          flex
          items-start

          snap-x
          snap-mandatory

          gap-[12px]

          overflow-x-auto
          overscroll-x-contain

          [scroll-behavior:auto]
          [scrollbar-width:none]
          [-webkit-overflow-scrolling:touch]

          [&::-webkit-scrollbar]:hidden

          sm:gap-[16px]

          lg:gap-[20px]
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
              min-w-0
              shrink-0

              snap-start
              [scroll-snap-stop:always]

              basis-[calc((100%_-_12px)/2)]

              sm:basis-[calc((100%_-_32px)/3)]

              lg:basis-[calc((100%_-_60px)/4)]
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Freccia successiva */}
      <button
        type="button"
        onClick={() => scroll("next")}
        disabled={!canGoNext}
        aria-label={t("recommended.next")}
        className="
          group/next

          mt-[clamp(64px,20vw,90px)]

          flex
          h-[38px]
          w-full
          items-center
          justify-center

          border-0
          bg-transparent
          p-0

          text-[#2F2A21]

          transition-opacity
          duration-300
          ease-out

          disabled:cursor-default
          disabled:opacity-20

          sm:mt-[clamp(95px,14vw,118px)]
          sm:h-[42px]

          lg:mt-[clamp(112px,11vw,150px)]
          lg:h-[46px]
        "
      >
        <ChevronRight
          strokeWidth={1.2}
          className="
            h-[23px]
            w-[23px]

            transition-transform
            duration-300
            ease-out

            group-hover/next:translate-x-[2px]

            group-disabled/next:translate-x-0

            sm:h-[25px]
            sm:w-[25px]
          "
        />
      </button>
    </div>
  );
}