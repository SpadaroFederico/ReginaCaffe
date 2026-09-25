export const recommendedProducts = {
  /*
   * =======================================================
   * VINI
   * =======================================================
   *
   * Etichette locali, servite sia in
   * bottiglia sia al calice: per questo il
   * prezzo non è un valore singolo ma la
   * lista `prices`, che ProductCard rende
   * su due righe.
   */
  wines: [
    {
      id: "torremora-rosato",
      name: "Torremora Rosato",
      image: "/torremoraRosato.webp",
      description: {
        it: "Rosato locale, fresco e fruttato",
        en: "Local rosé, fresh and fruity",
        fr: "Rosé local, frais et fruité",
      },
      prices: [
        {
          labelKey: "recommended.bottle",
          value: "20 €",
        },
        {
          labelKey: "recommended.glass",
          value: "5 €",
        },
      ],
    },
    {
      id: "torremora-chardonnay",
      name: "Torremora Chardonnay",
      image: "/torremoraChardonay.webp",
      description: {
        it: "Bianco locale, morbido e floreale",
        en: "Local white, smooth and floral",
        fr: "Blanc local, souple et floral",
      },
      prices: [
        {
          labelKey: "recommended.bottle",
          value: "20 €",
        },
        {
          labelKey: "recommended.glass",
          value: "5 €",
        },
      ],
    },
    {
      id: "chicca-primitivo",
      name: "Chicca Primitivo",
      image: "/ChiccaPrimitivo.webp",
      description: {
        it: "Rosso locale, dolce e speziato",
        en: "Local red, sweet and spicy",
        fr: "Rouge local, doux et épicé",
      },
      prices: [
        {
          labelKey: "recommended.bottle",
          value: "22 €",
        },
        {
          labelKey: "recommended.glass",
          value: "5 €",
        },
      ],
    },
    {
      id: "torremora-primitivo",
      name: "Torremora Primitivo",
      image: "/TorremoraPrimitivo.webp",
      description: {
        it: "Rosso locale, intenso e fruttato",
        en: "Local red, intense and fruity",
        fr: "Rouge local, intense et fruité",
      },
      prices: [
        {
          labelKey: "recommended.bottle",
          value: "20 €",
        },
        {
          labelKey: "recommended.glass",
          value: "5 €",
        },
      ],
    },
  ],

  /*
   * =======================================================
   * DRINK
   * =======================================================
   *
   * Tutti a 5 €, tranne il Gin Tonic: lì il
   * prezzo dipende dal gin scelto, quindi la
   * card porta un tag e un link diretto alla
   * sezione «Gin» del menu (menuAnchor).
   *
   * L'Angelino non ha ancora una foto:
   * ProductCard mostra il segnaposto col
   * monogramma finché il file non viene
   * aggiunto in public/.
   */
  signature: [
    {
      id: "spritz",
      name: "Spritz",
      image: "/spritz.webp",
      description: {
        it: "Fresco, frizzante e agrumato",
        en: "Fresh, sparkling and citrusy",
        fr: "Frais, pétillant et agrumé",
      },
      price: "5 €",
    },
    {
      id: "gin-tonic",
      name: "Gin Tonic",
      image: "/ginTonic.webp",
      description: {
        it: "Semplice, fresco e dissetante",
        en: "Simple, fresh and thirst-quenching",
        fr: "Simple, frais et désaltérant",
      },
      price: {
        it: "da 7 €",
        en: "from 7 €",
        fr: "dès 7 €",
      },
      menuAnchor: "gin",
      tagKey: "recommended.chooseGin",
    },
    {
      id: "negroni",
      name: "Negroni",
      image: "/negroni.webp",
      description: {
        it: "Amaro, intenso e iconico",
        en: "Bitter, intense and iconic",
        fr: "Amer, intense et iconique",
      },
      price: "5 €",
    },
    {
      id: "campari-spritz",
      name: "Campari Spritz",
      image: "/campariSpritz.webp",
      description: {
        it: "Amaro, frizzante e deciso",
        en: "Bitter, sparkling and bold",
        fr: "Amer, pétillant et corsé",
      },
      price: "5 €",
    },
    {
      id: "limoncello-spritz",
      name: "Limoncello Spritz",
      image: "/limoncelloSpritz.webp",
      description: {
        it: "Solare, estivo e agrumato",
        en: "Sunny, summery and citrusy",
        fr: "Solaire, estival et agrumé",
      },
      price: "5 €",
    },
    {
      id: "mojito",
      name: "Mojito",
      image: "/mojito.webp",
      description: {
        it: "Intramontabile, mentolato e rinfrescante",
        en: "Timeless, minty and refreshing",
        fr: "Intemporel, mentholé et rafraîchissant",
      },
      price: "5 €",
    },
    {
      id: "angelino",
      name: "Angelino",
      image: null,
      description: {
        it: "Esclusivo del Regina Caffè",
        en: "Exclusive to Regina Caffè",
        fr: "Exclusivité du Regina Caffè",
      },
      price: "5 €",
    },
  ],

  food: [
    {
      id: "apericena",
      name: "Apericena",
      image: "/tagliere.webp",
      description: {
        it: "Fritti, sfizi e stuzzichini da condividere",
        en: "Fried bites and nibbles to share",
        fr: "Fritures et amuse-bouches à partager",
      },
      price: "10 €",
    },
    {
      id: "tagliere-salumi-formaggi",
      name: {
        it: "Tagliere salumi e formaggi",
        en: "Cured meat and cheese board",
        fr: "Planche charcuteries et fromages",
      },
      image: "/tagliereSeF.webp",
      description: {
        it: "Salumi e formaggi locali da condividere",
        en: "Local cured meats and cheeses to share",
        fr: "Charcuteries et fromages locaux à partager",
      },
      price: "15 €",
    },
    {
      id: "pinsa",
      name: "Pinsa",
      image: "/pinza.webp",
      description: {
        it: "Crudo, stracciatella, rucola e pomodori secchi",
        en: "Cured ham, stracciatella, rocket and sun-dried tomatoes",
        fr: "Jambon cru, stracciatella, roquette et tomates séchées",
      },
      price: "10 €",
    },
    {
      id: "baguette-regina",
      name: "Regina",
      image: "/baguette.webp",
      description: {
        it: "Prosciutto crudo, burrata e rucola",
        en: "Cured ham, burrata and rocket",
        fr: "Jambon cru, burrata et roquette",
      },
      price: "8 €",
    },
    {
      id: "cheesecake",
      name: "Cheesecake",
      image: "/dessert.webp",
      description: {
        it: "Nutella, cioccolato bianco, pistacchio o frutti di bosco",
        en: "Nutella, white chocolate, pistachio or berries",
        fr: "Nutella, chocolat blanc, pistache ou fruits rouges",
      },
      price: "5 €",
    },
  ],
};
