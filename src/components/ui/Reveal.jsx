import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  distance = 18,
  threshold = 0.14,
  rootMargin = "0px 0px -8% 0px",
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const prefersReducedMotion =
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <Tag
      ref={elementRef}
      className={`
        will-change-[opacity,transform,filter]

        transition-[opacity,transform,filter]
        duration-[850ms]

        [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]

        motion-reduce:transform-none
        motion-reduce:opacity-100
        motion-reduce:filter-none
        motion-reduce:transition-none

        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${distance}px, 0)`,
        filter: isVisible
          ? "blur(0px)"
          : "blur(2px)",
      }}
    >
      {children}
    </Tag>
  );
}