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

export default function ProductCarousel({
  products,
}) {
  const carouselRef = useRef(null);

  const animationFrameRef = useRef(null);
  const controlsFrameRef = useRef(null);

  const { t } = useLanguage();

  const [canGoBack, setCanGoBack] =
    useState(false);

  const [canGoNext, setCanGoNext] =
    useState(false);

  const cancelAnimation =
    useCallback(() => {
      if (
        animationFrameRef.current !== null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current = null;
      }

      const carousel =
        carouselRef.current;

      if (carousel) {
        carousel.style.scrollSnapType =
          "";
      }
    }, []);

  const updateControls =
    useCallback(() => {
      const carousel =
        carouselRef.current;

      if (!carousel) return;

      const maxScroll = Math.max(
        0,
        carousel.scrollWidth -
          carousel.clientWidth
      );

      const nextCanGoBack =
        carousel.scrollLeft > 3;

      const nextCanGoNext =
        maxScroll > 3 &&
        carousel.scrollLeft <
          maxScroll - 3;

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

  const requestControlsUpdate =
    useCallback(() => {
      if (
        controlsFrameRef.current !== null
      ) {
        return;
      }

      controlsFrameRef.current =
        requestAnimationFrame(() => {
          controlsFrameRef.current = null;
          updateControls();
        });
    }, [updateControls]);

  const getScrollTargets =
    useCallback(() => {
      const carousel =
        carouselRef.current;

      if (!carousel) return [];

      const carouselRect =
        carousel.getBoundingClientRect();

      const maxScroll = Math.max(
        0,
        carousel.scrollWidth -
          carousel.clientWidth
      );

      const cardPositions = Array.from(
        carousel.children
      ).map((card) => {
        const cardRect =
          card.getBoundingClientRect();

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

      return positions.filter(
        (
          position,
          index,
          values
        ) =>
          index === 0 ||
          Math.abs(
            position -
              values[index - 1]
          ) > 1
      );
    }, []);

  const animateTo = useCallback(
    (requestedTarget) => {
      const carousel =
        carouselRef.current;

      if (!carousel) return;

      cancelAnimation();

      const maxScroll = Math.max(
        0,
        carousel.scrollWidth -
          carousel.clientWidth
      );

      const startPosition =
        carousel.scrollLeft;

      const targetPosition = Math.min(
        maxScroll,
        Math.max(
          0,
          requestedTarget
        )
      );

      const distance =
        targetPosition -
        startPosition;

      if (Math.abs(distance) < 1) {
        carousel.scrollLeft =
          targetPosition;

        requestControlsUpdate();
        return;
      }

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (prefersReducedMotion) {
        carousel.scrollLeft =
          targetPosition;

        requestControlsUpdate();
        return;
      }

      carousel.style.scrollSnapType =
        "none";

      const startTime =
        performance.now();

      const duration = Math.min(
        620,
        Math.max(
          460,
          Math.abs(distance) * 1.1
        )
      );

      const animate = (
        currentTime
      ) => {
        const elapsed =
          currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const easedProgress =
          1 -
          Math.pow(
            1 - progress,
            4
          );

        carousel.scrollLeft =
          startPosition +
          distance * easedProgress;

        requestControlsUpdate();

        if (progress < 1) {
          animationFrameRef.current =
            requestAnimationFrame(
              animate
            );

          return;
        }

        carousel.scrollLeft =
          targetPosition;

        carousel.style.scrollSnapType =
          "";

        animationFrameRef.current =
          null;

        requestControlsUpdate();
      };

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );
    },
    [
      cancelAnimation,
      requestControlsUpdate,
    ]
  );

  const scroll = useCallback(
    (direction) => {
      const carousel =
        carouselRef.current;

      if (!carousel) return;

      const targets =
        getScrollTargets();

      if (!targets.length) return;

      const currentPosition =
        carousel.scrollLeft;

      const tolerance = 4;

      let targetPosition;

      if (direction === "next") {
        targetPosition =
          targets.find(
            (position) =>
              position >
              currentPosition +
                tolerance
          );

        if (
          targetPosition ===
          undefined
        ) {
          targetPosition =
            targets[
              targets.length - 1
            ];
        }
      } else {
        targetPosition = [
          ...targets,
        ]
          .reverse()
          .find(
            (position) =>
              position <
              currentPosition -
                tolerance
          );

        if (
          targetPosition ===
          undefined
        ) {
          targetPosition =
            targets[0];
        }
      }

      animateTo(targetPosition);
    },
    [
      animateTo,
      getScrollTargets,
    ]
  );

  useEffect(() => {
    const carousel =
      carouselRef.current;

    if (!carousel) {
      return undefined;
    }

    updateControls();

    const resizeObserver =
      typeof ResizeObserver !==
      "undefined"
        ? new ResizeObserver(() => {
            requestControlsUpdate();
          })
        : null;

    resizeObserver?.observe(
      carousel
    );

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

      if (
        controlsFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          controlsFrameRef.current
        );

        controlsFrameRef.current =
          null;
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
      <button
        type="button"
        onClick={() =>
          scroll("prev")
        }
        disabled={!canGoBack}
        aria-label={t(
          "recommended.previous"
        )}
        className="
          group/previous

          mt-[clamp(64px,20vw,90px)]

          flex
          h-[38px]
          w-full
          items-center
          justify-center

          rounded-full
          border-0
          bg-transparent
          p-0

          text-[#2F2A21]

          transition-[opacity,background-color,color,transform]
          duration-300

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          hover:-translate-x-[1px]
          hover:bg-[#E9E0CF]/70
          hover:text-[#635B4E]

          active:scale-[0.92]

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[#AD9060]/60

          disabled:cursor-default
          disabled:opacity-20
          disabled:hover:translate-x-0
          disabled:hover:bg-transparent
          disabled:active:scale-100

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

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

            group-hover/previous:-translate-x-[2px]

            group-disabled/previous:translate-x-0

            sm:h-[25px]
            sm:w-[25px]
          "
        />
      </button>

      <div
        ref={carouselRef}
        onScroll={
          requestControlsUpdate
        }
        onPointerDown={
          cancelAnimation
        }
        onWheel={cancelAnimation}
        className="
          flex
          cursor-grab
          items-start

          snap-x
          snap-mandatory

          gap-[12px]

          overflow-x-auto
          overscroll-x-contain

          active:cursor-grabbing

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
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          scroll("next")
        }
        disabled={!canGoNext}
        aria-label={t(
          "recommended.next"
        )}
        className="
          group/next

          mt-[clamp(64px,20vw,90px)]

          flex
          h-[38px]
          w-full
          items-center
          justify-center

          rounded-full
          border-0
          bg-transparent
          p-0

          text-[#2F2A21]

          transition-[opacity,background-color,color,transform]
          duration-300

          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

          hover:translate-x-[1px]
          hover:bg-[#E9E0CF]/70
          hover:text-[#635B4E]

          active:scale-[0.92]

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[#AD9060]/60

          disabled:cursor-default
          disabled:opacity-20
          disabled:hover:translate-x-0
          disabled:hover:bg-transparent
          disabled:active:scale-100

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

            [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

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