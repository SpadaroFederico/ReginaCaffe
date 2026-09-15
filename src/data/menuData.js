export const menuPageData = {
  featured: [
    {
      id: "aperitivo",
      label: "Aperitivo",
      price: "€ 8",
    },
    {
      id: "apericena",
      label: "Apericena",
      price: "€ 10",
    },
    {
      id: "baguette",
      label: "Baguette",
      price: "da € 5",
    },
  ],

  sections: [
    {
      id: "starters",
      title: {
        it: "Per iniziare",
        en: "To begin",
        fr: "Pour commencer",
      },
      intro: {
        it: "Una selezione pensata per accompagnare l’aperitivo e condividere qualcosa di buono.",
        en: "A selection designed to accompany your aperitivo and share something delicious.",
        fr: "Une sélection pensée pour accompagner l’apéritif et partager un bon moment.",
      },
      items: [
        {
          name: "Aperitivo",
          price: "€ 8",
          description: {
            it: "Drink + patate o snack salati.",
            en: "Drink + crisps or savoury snacks.",
            fr: "Boisson + chips ou snacks salés.",
          },
        },
        {
          name: "Apericena",
          price: "€ 10",
          description: {
            it: "Drink + piatto composto, la sera.",
            en: "Drink + composed plate, served in the evening.",
            fr: "Boisson + assiette composée, en soirée.",
          },
        },
        {
          name: {
            it: "Tagliere salumi e formaggi",
            en: "Cured meat and cheese board",
            fr: "Planche charcuteries et fromages",
          },
          price: "€ 15",
          description: {
            it: "Salumi e formaggi locali da condividere.",
            en: "A local cured meat and cheese board to share.",
            fr: "Planche de charcuteries et fromages locaux à partager.",
          },
        },
      ],
    },

    {
      id: "fried",
      title: {
        it: "Sfiziosità fritte",
        en: "Fried bites",
        fr: "Fritures gourmandes",
      },
      intro: {
        it: "Crocchette di patate, patatine fritte, patatine con cheddar e bacon, polpette della casa, panzerotti.",
        en: "Potato croquettes, fries, cheddar and bacon fries, homemade meatballs and panzerotti.",
        fr: "Croquettes de pommes de terre, frites, frites cheddar et bacon, boulettes maison et panzerotti.",
      },
      items: [
        {
          name: {
            it: "Porzione piccola",
            en: "Small portion",
            fr: "Petite portion",
          },
          price: "€ 4",
          description: {
            it: "",
            en: "",
            fr: "",
          },
        },
        {
          name: {
            it: "Porzione media",
            en: "Medium portion",
            fr: "Portion moyenne",
          },
          price: "€ 6",
          description: {
            it: "",
            en: "",
            fr: "",
          },
        },
      ],
    },

    {
      id: "baguettes",
      title: {
        it: "Le nostre baguette",
        en: "Our baguettes",
        fr: "Nos baguettes",
      },
      intro: {
        it: "Base a scelta: baguette classica, ai cereali o piadina.",
        en: "Choose your base: classic baguette, multigrain baguette or piadina.",
        fr: "Base au choix : baguette classique, aux céréales ou piadina.",
      },
      items: [
        {
          name: "Barone",
          price: "€ 6",
          description: {
            it: "Capocollo, stracciatella, pomodori secchi.",
            en: "Capocollo, stracciatella and sun-dried tomatoes.",
            fr: "Capocollo, stracciatella et tomates séchées.",
          },
        },
        {
          name: "Veg",
          price: "€ 5",
          description: {
            it: "Grigliata di verdure, hummus, rucola.",
            en: "Grilled vegetables, hummus and rocket.",
            fr: "Légumes grillés, houmous et roquette.",
          },
        },
        {
          name: "La Leggera",
          price: "€ 5",
          description: {
            it: "Petto di pollo, insalata, yogurt e limone.",
            en: "Chicken breast, salad, yogurt and lemon.",
            fr: "Blanc de poulet, salade, yaourt et citron.",
          },
        },
        {
          name: "La Mortazza",
          price: "€ 6",
          description: {
            it: "Mortadella, pistacchio, mozzarella fiordilatte.",
            en: "Mortadella, pistachio and fiordilatte mozzarella.",
            fr: "Mortadelle, pistache et mozzarella fiordilatte.",
          },
        },
        {
          name: "Fiamma",
          price: "€ 6",
          description: {
            it: "Salame piccante, provola, crema di peperoni.",
            en: "Spicy salami, provola and pepper cream.",
            fr: "Salami piquant, provola et crème de poivrons.",
          },
        },
        {
          name: "La Junia",
          price: "€ 6",
          description: {
            it: "Tonno, cipolla rossa, olive nere.",
            en: "Tuna, red onion and black olives.",
            fr: "Thon, oignon rouge et olives noires.",
          },
        },
        {
          name: "Peperini",
          price: "€ 5",
          description: {
            it: "Peperoni arrostiti, acciughe, caciocavallo.",
            en: "Roasted peppers, anchovies and caciocavallo cheese.",
            fr: "Poivrons grillés, anchois et caciocavallo.",
          },
        },
        {
          name: "Capitolo",
          price: "€ 6",
          description: {
            it: "Prosciutto crudo, burrata, basilico.",
            en: "Cured ham, burrata and basil.",
            fr: "Jambon cru, burrata et basilic.",
          },
        },
        {
          name: "Tonino",
          price: "€ 5",
          description: {
            it: "Frittata di cipolla, pecorino, pepe.",
            en: "Onion omelette, pecorino and pepper.",
            fr: "Omelette à l’oignon, pecorino et poivre.",
          },
        },
        {
          name: "Regina",
          price: "€ 6",
          description: {
            it: "Roast beef, rucola, scaglie e senape al miele.",
            en: "Roast beef, rocket, cheese flakes and honey mustard.",
            fr: "Rosbif, roquette, copeaux de fromage et moutarde au miel.",
          },
        },
      ],
    },

    {
      id: "beers",
      title: {
        it: "Birre",
        en: "Beers",
        fr: "Bières",
      },
      intro: {
        it: "Tutte in bottiglia da 33 cl.",
        en: "All served in 33 cl bottles.",
        fr: "Toutes en bouteille de 33 cl.",
      },
      columns: true,
      items: [
        {
          name: "Beck's",
          price: "€ 2,50",
        },
        {
          name: "Peroni Nastro Azzurro",
          price: "€ 2,50",
        },
        {
          name: "Bud",
          price: "€ 3",
        },
        {
          name: "Corona",
          price: "€ 3",
        },
        {
          name: "Menabrea",
          price: "€ 3",
        },
        {
          name: "Peroni Rossa",
          price: "€ 3",
        },
        {
          name: "Tennent's",
          price: "€ 3",
        },
        {
          name: "Bjorne Beer",
          price: "€ 3,50",
        },
        {
          name: "Ceres",
          price: "€ 3,50",
        },
        {
          name: "Stella Artois",
          price: "€ 3,50",
        },
        {
          name: "Leffe Bionda",
          price: "€ 4",
        },
        {
          name: "Tipa",
          price: "€ 5",
        },
      ],
    },

    {
      id: "gin",
      title: {
        it: "Gin",
        en: "Gin",
        fr: "Gin",
      },
      intro: {
        it: "Scegli il tuo gin: lo serviamo con la tonica giusta.",
        en: "Choose your gin: we serve it with the right tonic.",
        fr: "Choisissez votre gin : nous le servons avec le bon tonic.",
      },
      columns: true,
      items: [
        {
          name: "Bombay Sapphire",
          price: "€ 7",
        },
        {
          name: "Corricella",
          price: "€ 7",
        },
        {
          name: "Tanqueray",
          price: "€ 7",
        },
        {
          name: "Brockmans",
          price: "€ 8",
        },
        {
          name: "Hendrick's",
          price: "€ 8",
        },
        {
          name: "Hendrick's Another",
          price: "€ 8",
        },
        {
          name: "Malfy Arancia",
          price: "€ 8",
        },
        {
          name: "Malfy Rosa",
          price: "€ 8",
        },
        {
          name: "Mare Mediterranean Gin",
          price: "€ 8",
        },
        {
          name: "Mazzetti",
          price: "€ 8",
        },
        {
          name: "Nordés",
          price: "€ 8",
        },
        {
          name: "Wint",
          price: "€ 8",
        },
        {
          name: "Bobby's",
          price: "€ 10",
        },
        {
          name: "Engine",
          price: "€ 10",
        },
        {
          name: "Malammore",
          price: "€ 10",
        },
        {
          name: "Monkey 47",
          price: "€ 10",
        },
        {
          name: "Nº 3 London Dry",
          price: "€ 10",
        },
        {
          name: "Portofino",
          price: "€ 10",
        },
        {
          name: "Roku",
          price: "€ 10",
        },
        {
          name: "Tanqueray Nº Ten",
          price: "€ 10",
        },
      ],
    },

    {
      id: "desserts",
      title: {
        it: "Dolci",
        en: "Desserts",
        fr: "Desserts",
      },
      intro: {
        it: "Un finale semplice e goloso.",
        en: "A simple and delicious sweet ending.",
        fr: "Une fin de repas simple et gourmande.",
      },
      items: [
        {
          name: "Tiramisù",
          price: "€ 5",
          description: {
            it: "",
            en: "",
            fr: "",
          },
        },
        {
          name: "Cheesecake",
          price: "€ 5",
          description: {
            it: "Nutella, cioccolato bianco, pistacchio o frutti di bosco.",
            en: "Nutella, white chocolate, pistachio or berries.",
            fr: "Nutella, chocolat blanc, pistache ou fruits rouges.",
          },
        },
        {
          name: "Salame al cioccolato",
          price: "€ 3,50",
          description: {
            it: "",
            en: "",
            fr: "",
          },
        },
        {
          name: {
            it: "Dolce del giorno",
            en: "Dessert of the day",
            fr: "Dessert du jour",
          },
          price: "€ 5",
          description: {
            it: "",
            en: "",
            fr: "",
          },
        },
      ],
    },
  ],

  upcoming: [
    {
      id: "cocktails",
      title: {
        it: "Carta cocktail",
        en: "Cocktail list",
        fr: "Carte des cocktails",
      },
      description: {
        it: "Per cocktail, signature e proposte del giorno, i nostri camerieri sono a disposizione per spiegarti ingredienti, gusti e abbinamenti.",
        en: "For cocktails, signature drinks and daily proposals, our staff will be happy to guide you through ingredients, flavours and pairings.",
        fr: "Pour les cocktails, les créations signature et les suggestions du jour, notre équipe se fera un plaisir de vous guider parmi les ingrédients, les saveurs et les accords.",
      },
    },
    {
      id: "events",
      title: {
        it: "Serate ed eventi",
        en: "Nights and events",
        fr: "Soirées et événements",
      },
      description: {
        it: "Musica, dj set e appuntamenti in piazza: le prossime date sono in home.",
        en: "Music, DJ sets and get-togethers in the square: the next dates are on the home page.",
        fr: "Musique, DJ sets et rendez-vous sur la place : les prochaines dates sont sur la page d’accueil.",
      },
    },
  ],
};