import ProductCarousel from "./ProductCarousel";

import { recommendedProducts } from "../../data/recommended.mock";
import { useLanguage } from "../../i18n/LanguageContext";
import { ArrowUpRight } from "lucide-react";

function CategoryTitle({
  children,
  regular,
  italic = false,
}) {
  return (
    <div
      className="
        mb-[16px]
        flex
        items-center
        gap-[14px]

        sm:mb-[20px]

        lg:mb-[24px]
      "
    >
      <h3
        className="
          shrink-0

          font-serif
          text-[24px]
          font-normal
          leading-none
          text-[#2F2A21]

          sm:text-[28px]

          lg:text-[32px]
        "
      >
        {regular && (
          <>
            <span>{regular}</span>{" "}
          </>
        )}

        <span className={italic ? "italic" : ""}>
          {children}
        </span>
      </h3>

      <span
        aria-hidden="true"
        className="
          mt-[4px]
          h-px
          flex-1
          bg-[#B9A37A]/70
        "
      />
    </div>
  );
}

export default function RecommendedSection() {
  const { t } = useLanguage();

  return (
    <section
      id="consigliati"
      className="
        border-y
        border-[#CDBF9F]/70

        bg-[#F5F5EA]
        text-[#2F2A21]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]

          px-[14px]
          py-[30px]

          sm:px-8
          sm:py-[42px]

          lg:px-10
          lg:py-[56px]

          xl:px-12
          xl:py-[64px]
        "
      >
        {/* Intro */}
        <div
          className="
            mb-[28px]

            sm:mb-[38px]

            lg:mb-[48px]
          "
        >
          <h2
            className="
              font-serif
              text-[38px]
              font-normal
              leading-[0.86]
              text-[#2F2A21]

              sm:text-[46px]

              lg:text-[56px]
            "
          >
            <span className="block">
              {t("recommended.titleLine1")}
            </span>

            <span className="block">
              {t("recommended.titleLine2")}
            </span>
          </h2>

          <p
            className="
              mt-[14px]
              max-w-[235px]

              font-sans
              text-[11px]
              font-normal
              leading-[16px]
              text-[#635B4E]

              sm:mt-[17px]
              sm:max-w-[340px]
              sm:text-[13px]
              sm:leading-[19px]

              lg:mt-[20px]
              lg:max-w-[420px]
              lg:text-[15px]
              lg:leading-[22px]
            "
          >
            {t("recommended.description")}
          </p>

          <div
            aria-hidden="true"
            className="
              mt-[16px]
              h-px
              w-[48px]
              bg-[#B9A37A]

              sm:mt-[20px]
              sm:w-[64px]
            "
          />
        </div>

        {/* Vini */}
        <div
          className="
            mb-[34px]

            sm:mb-[46px]

            lg:mb-[58px]
          "
        >
          <CategoryTitle>
            {t("recommended.wines")}
          </CategoryTitle>

          <ProductCarousel
            products={recommendedProducts.wines}
          />
        </div>

        {/* Drink signature */}
        <div
          className="
            mb-[34px]

            sm:mb-[46px]

            lg:mb-[58px]
          "
        >
          <CategoryTitle
            regular={t("recommended.signatureRegular")}
            italic
          >
            {t("recommended.signatureItalic")}
          </CategoryTitle>

          <ProductCarousel
            products={recommendedProducts.signature}
          />
        </div>

        {/* Da accompagnare */}
        <div>
        <CategoryTitle
            regular={t("recommended.foodRegular")}
            italic
        >
            {t("recommended.foodItalic")}
        </CategoryTitle>

        <ProductCarousel
            products={recommendedProducts.food}
        />

        {/* Link centrale al menu */}
        <div
            className="
            mt-[28px]
            flex
            justify-center

            sm:mt-[34px]

            lg:mt-[42px]
            "
        >
            <a
            href="#menu"
            className="
                group

                inline-flex
                min-w-[166px]
                items-center
                justify-between
                gap-[22px]

                border-b
                border-[#A99B7F]
                pb-[8px]

                font-serif
                text-[21px]
                font-normal
                leading-none
                text-[#2F2A21]
                no-underline

                transition-colors
                duration-300

                hover:text-[#635B4E]

                sm:min-w-[184px]
                sm:text-[23px]

                lg:min-w-[200px]
                lg:text-[25px]
            "
            >
            <span>{t("recommended.menuCta")}</span>

            <ArrowUpRight
                strokeWidth={1.2}
                className="
                h-[17px]
                w-[17px]
                shrink-0

                transition-transform
                duration-300
                ease-out

                group-hover:-translate-y-[2px]
                group-hover:translate-x-[2px]

                sm:h-[18px]
                sm:w-[18px]

                lg:h-[20px]
                lg:w-[20px]
                "
            />
            </a>
        </div>
        </div>
      </div>
    </section>
  );
}