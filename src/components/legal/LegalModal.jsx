import {
  useEffect,
  useId,
  useRef,
} from "react";

import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable='true']",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function LegalModal({
  open,
  title,
  eyebrow,
  closeLabel,
  onClose,
  children,
  footer,
}) {
  const panelRef = useRef(null);
  const closeButtonRef =
    useRef(null);

  /*
   * Evita ID duplicati nel caso in cui
   * in futuro vengano montati più dialog.
   */
  const reactId = useId();

  const titleId =
    `legal-modal-title-${reactId}`;

  useEffect(() => {
    if (
      !open ||
      typeof document ===
        "undefined"
    ) {
      return undefined;
    }

    const previousActiveElement =
      document.activeElement;

    const previousOverflow =
      document.body.style.overflow;

    const previousPaddingRight =
      document.body.style.paddingRight;

    const rootElement =
      document.getElementById(
        "root"
      );

    const rootWasInert =
      rootElement?.inert ??
      false;

    /*
     * =====================================================
     * BLOCCO BACKGROUND
     * =====================================================
     *
     * Il contenuto dietro la modale non
     * deve essere raggiungibile con Tab
     * né cliccabile mentre il dialog è
     * aperto.
     */
    if (rootElement) {
      rootElement.inert = true;
    }

    /*
     * Blocchiamo lo scroll della pagina.
     *
     * Compensiamo inoltre la larghezza
     * della scrollbar per evitare un
     * piccolo spostamento orizzontale
     * all'apertura della modale.
     */
    const scrollbarWidth =
      window.innerWidth -
      document.documentElement
        .clientWidth;

    document.body.style.overflow =
      "hidden";

    if (scrollbarWidth > 0) {
      const currentPadding =
        Number.parseFloat(
          window
            .getComputedStyle(
              document.body
            )
            .paddingRight
        ) || 0;

      document.body.style.paddingRight =
        `${currentPadding + scrollbarWidth}px`;
    }

    /*
     * Portiamo il focus sul pulsante
     * Chiudi dopo il montaggio.
     */
    const focusFrame =
      window.requestAnimationFrame(
        () => {
          if (
            closeButtonRef.current
          ) {
            closeButtonRef.current.focus();
          } else {
            panelRef.current?.focus();
          }
        }
      );

    const handleKeyDown =
      (event) => {
        if (
          event.key ===
            "Escape" &&
          !event.isComposing
        ) {
          event.preventDefault();

          onClose();

          return;
        }

        if (event.key !== "Tab") {
          return;
        }

        const panel =
          panelRef.current;

        if (!panel) {
          return;
        }

        const focusableElements =
          Array.from(
            panel.querySelectorAll(
              FOCUSABLE_SELECTOR
            )
          ).filter(
            (element) =>
              element instanceof
                HTMLElement &&
              !element.hasAttribute(
                "disabled"
              ) &&
              element.getAttribute(
                "aria-hidden"
              ) !== "true"
          );

        /*
         * Se per qualche motivo il dialog
         * non contiene elementi interattivi,
         * il focus resta sul pannello.
         */
        if (
          focusableElements.length ===
          0
        ) {
          event.preventDefault();

          panel.focus();

          return;
        }

        const firstElement =
          focusableElements[0];

        const lastElement =
          focusableElements[
            focusableElements.length -
              1
          ];

        const activeElement =
          document.activeElement;

        /*
         * Se il focus dovesse finire fuori
         * dalla modale per un intervento
         * programmatico, lo riportiamo
         * immediatamente dentro.
         */
        if (
          !panel.contains(
            activeElement
          )
        ) {
          event.preventDefault();

          if (event.shiftKey) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }

          return;
        }

        if (
          event.shiftKey &&
          activeElement ===
            firstElement
        ) {
          event.preventDefault();

          lastElement.focus();

          return;
        }

        if (
          !event.shiftKey &&
          activeElement ===
            lastElement
        ) {
          event.preventDefault();

          firstElement.focus();
        }
      };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.cancelAnimationFrame(
        focusFrame
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

      document.body.style.paddingRight =
        previousPaddingRight;

      if (rootElement) {
        rootElement.inert =
          rootWasInert;
      }

      /*
       * Restituisce il focus al controllo
       * che aveva aperto la finestra,
       * quando è ancora presente nel DOM.
       */
      if (
        previousActiveElement instanceof
          HTMLElement &&
        previousActiveElement
          .isConnected
      ) {
        previousActiveElement.focus();
      }
    };
  }, [
    open,
    onClose,
  ]);

  if (
    !open ||
    typeof document ===
      "undefined"
  ) {
    return null;
  }

  return createPortal(
    <div
      className="
        legal-backdrop-in

        fixed
        inset-0
        z-[120]

        flex
        items-end
        justify-center

        bg-[#17130F]/70

        backdrop-blur-[4px]

        md:items-center
        md:p-6
      "
      onMouseDown={(event) => {
        /*
         * Chiudiamo soltanto quando il
         * click avviene realmente sul
         * backdrop e non sul pannello.
         */
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          titleId
        }
        tabIndex={-1}
        className="
          legal-panel-in

          relative

          flex
          max-h-[94dvh]
          w-full
          flex-col
          overflow-hidden

          rounded-t-[24px]

          border
          border-[#CDBF9F]/80

          bg-[#F3EDDE]
          text-[#2F2A21]

          shadow-[0_28px_90px_rgba(20,16,12,0.28)]

          outline-none

          md:max-h-[88vh]
          md:max-w-[920px]
          md:rounded-[22px]
        "
      >
        <header
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-6

            border-b
            border-[#D8CFBA]

            bg-[#F3EDDE]/95

            px-[20px]
            py-[18px]

            backdrop-blur-md

            sm:px-8
            sm:py-[22px]
          "
        >
          <div>
            {eyebrow && (
              <p
                className="
                  font-sans
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-[#7C644A]

                  sm:text-[10px]
                "
              >
                {eyebrow}
              </p>
            )}

            <h2
              id={titleId}
              className="
                mt-[7px]

                font-serif
                text-[34px]
                font-normal
                leading-none
                text-[#2F2A21]

                sm:text-[42px]
              "
            >
              {title}
            </h2>
          </div>

          <button
            ref={
              closeButtonRef
            }
            type="button"
            onClick={
              onClose
            }
            aria-label={
              closeLabel
            }
            className="
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center

              rounded-full
              border
              border-[#B9A37A]/55

              bg-transparent

              text-[#635B4E]

              transition-[transform,background-color,color,border-color]
              duration-300

              hover:rotate-90
              hover:border-[#AD9060]
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
              className="
                h-[19px]
                w-[19px]
              "
              strokeWidth={1.35}
            />
          </button>
        </header>

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain

            px-[20px]
            py-[22px]

            [scrollbar-color:#B9A37A_transparent]
            [scrollbar-width:thin]

            sm:px-8
            sm:py-[30px]
          "
        >
          {children}
        </div>

        {footer && (
          <footer
            className="
              shrink-0

              border-t
              border-[#D8CFBA]

              bg-[#F3EDDE]/95

              px-[20px]
              py-[15px]

              backdrop-blur-md

              sm:px-8
              sm:py-[18px]
            "
          >
            {footer}
          </footer>
        )}
      </section>
    </div>,
    document.body
  );
}