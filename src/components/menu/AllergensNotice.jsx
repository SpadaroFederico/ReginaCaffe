import { motion } from "framer-motion";

/*
 * Riquadro allergeni: identico a quello
 * della pagina menu originale.
 */

export default function AllergensNotice({
  reduceMotion,
  t,
  className = "",
}) {
  return (
    <motion.aside
      initial={{
        opacity:
          reduceMotion
            ? 1
            : 0,

        y:
          reduceMotion
            ? 0
            : 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration:
          reduceMotion
            ? 0
            : 0.72,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={`
        border-y
        border-[#CDBF9F]/80

        px-[6px]
        py-[28px]

        sm:px-[12px]
        sm:py-[34px]

        lg:border
        lg:border-[#CDBF9F]/70

        lg:bg-[#F5F2EA]

        lg:px-[22px]
        lg:py-[22px]

        xl:px-[26px]
        xl:py-[24px]

        ${className}
      `}
    >
      <div
        className="
          w-full

          lg:grid
          lg:grid-cols-[135px_minmax(0,1fr)]
          lg:items-start
          lg:gap-[28px]

          xl:grid-cols-[150px_minmax(0,1fr)]
          xl:gap-[36px]
        "
      >
        <motion.div
          initial={{
            opacity:
              reduceMotion
                ? 1
                : 0,

            x:
              reduceMotion
                ? 0
                : -10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.6,

            delay:
              reduceMotion
                ? 0
                : 0.05,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <p
            className="
              font-sans
              text-[8px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#8A7558]

              sm:text-[9px]
            "
          >
            {t(
              "menu.allergensEyebrow"
            )}
          </p>

          <h2
            className="
              mt-[7px]

              font-serif
              text-[32px]
              font-normal
              leading-[0.95]
              text-[#2F2A21]

              sm:text-[38px]

              lg:text-[31px]

              xl:text-[34px]
            "
          >
            {t(
              "menu.allergensTitle"
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{
            opacity:
              reduceMotion
                ? 1
                : 0,

            y:
              reduceMotion
                ? 0
                : 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.66,

            delay:
              reduceMotion
                ? 0
                : 0.11,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-[18px]

            lg:mt-0
          "
        >
          <p
            className="
              font-serif
              text-[22px]
              font-normal
              leading-[1.08]
              text-[#2F2A21]

              sm:text-[25px]

              lg:text-[21px]

              xl:text-[23px]
            "
          >
            {t(
              "menu.allergensQuestion"
            )}
          </p>

          <p
            className="
              mt-[10px]

              max-w-[680px]

              font-sans
              text-[12px]
              leading-[19px]
              text-[#635B4E]

              sm:text-[13px]
              sm:leading-[21px]

              lg:text-[11px]
              lg:leading-[18px]

              xl:text-[12px]
              xl:leading-[19px]
            "
          >
            {t(
              "menu.allergensText"
            )}
          </p>

          <p
            className="
              mt-[8px]

              max-w-[680px]

              font-sans
              text-[10px]
              leading-[17px]
              text-[#8A8174]

              sm:text-[11px]
              sm:leading-[18px]

              lg:text-[10px]
              lg:leading-[16px]

              xl:text-[11px]
              xl:leading-[17px]
            "
          >
            {t(
              "menu.allergensNote"
            )}
          </p>
        </motion.div>
      </div>
    </motion.aside>
  );
}
