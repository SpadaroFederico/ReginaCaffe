/*
 * =======================================================
 * DATI DEL MENU
 * =======================================================
 *
 * Unico file con tutti i contenuti della
 * carta. Per cambiare un prezzo basta
 * modificare la riga corrispondente.
 *
 * Struttura:
 *
 * menuMacros            → le macro-sezioni (/menu/<slug>)
 *   sections            → i riquadri della pagina
 *     groups            → blocchi interni (titolo opzionale)
 *       items           → le voci
 *
 * Voce:
 *
 * {
 *   name: "Nome" | { it, en, fr },
 *   price: "€ 5",                 // formato del sito
 *   priceNote: { it, en, fr },    // opzionale, es. "a persona"
 *   prices: [                     // opzionale, più formati
 *     { label: "20 cl", price: "€ 3" },
 *   ],
 *   description: "..." | { it, en, fr },
 * }
 *
 * I testi tradotti usano { it, en, fr }:
 * se una lingua manca si mostra l'italiano.
 * Le stringhe semplici valgono per tutte
 * le lingue (nomi propri, prezzi).
 *
 * Lo slug di ogni macro diventa l'URL:
 * /menu/drink, /en/menu/drink, /fr/menu/drink.
 * È letto anche da vite-seo-plugin.js per
 * la sitemap: cambiarlo cambia l'indirizzo.
 */

const l = (it, en, fr) => ({
  it,
  en,
  fr,
});

/* Formati ricorrenti */
const GLASS = l("calice", "glass", "verre");
const BOTTLE = l("bottiglia", "bottle", "bouteille");
const PER_PERSON = l("a persona", "per person", "par personne");

const SPIRITS_NOTE = l(
  "Ogni distillato è accompagnato da cioccolato e sigarillo, per un'esperienza di degustazione ancora più completa.",
  "Every spirit is served with chocolate and a cigarillo, for an even more complete tasting experience.",
  "Chaque spiritueux est accompagné de chocolat et d'un cigarillo, pour une dégustation encore plus complète."
);

/* =======================================================
   SEZIONI
   ======================================================= */

const caffetteria = {
  id: "caffetteria",
  title: l("Caffetteria", "Coffee", "Café"),
  groups: [
    {
      items: [
        { name: l("Caffè", "Espresso", "Expresso"), price: "€ 1,20" },
        { name: l("Caffè macchiato", "Espresso macchiato", "Expresso macchiato"), price: "€ 1,20" },
        { name: l("Caffè decaffeinato", "Decaf espresso", "Expresso décaféiné"), price: "€ 1,40" },
        { name: "Espressino", price: "€ 1,40" },
        { name: l("Espressino decaffeinato", "Decaf espressino", "Espressino décaféiné"), price: "€ 1,60" },
        { name: "Cappuccino", price: "€ 1,60" },
        { name: l("Cappuccino decaffeinato", "Decaf cappuccino", "Cappuccino décaféiné"), price: "€ 1,80" },
      ],
    },
  ],
};

const dolci = {
  id: "dolci",
  title: l("Dolci", "Desserts", "Desserts"),
  intro: l(
    "Un finale semplice e goloso.",
    "A simple and delicious sweet ending.",
    "Une fin de repas simple et gourmande."
  ),
  groups: [
    {
      items: [
        { name: "Tiramisù", price: "€ 5" },
        {
          name: "Cheesecake",
          price: "€ 5",
          description: l(
            "Nutella, cioccolato bianco, pistacchio o frutti di bosco.",
            "Nutella, white chocolate, pistachio or berries.",
            "Nutella, chocolat blanc, pistache ou fruits rouges."
          ),
        },
        { name: "Salame al cioccolato", price: "€ 3,50" },
        {
          name: l("Dolce del giorno", "Dessert of the day", "Dessert du jour"),
          price: "€ 5",
        },
        { name: "Crêpes", price: "€ 4" },
      ],
    },
  ],
};

const baguette = {
  id: "baguette",
  title: l("Le nostre baguette", "Our baguettes", "Nos baguettes"),
  intro: l(
    "Base a scelta: baguette classica, ai cereali o piadina.",
    "Choose your base: classic baguette, multigrain baguette or piadina.",
    "Base au choix : baguette classique, aux céréales ou piadina."
  ),
  groups: [
    {
      items: [
        {
          name: "Barone",
          price: "€ 6",
          description: l(
            "Capocollo, stracciatella, pomodori secchi.",
            "Capocollo, stracciatella and sun-dried tomatoes.",
            "Capocollo, stracciatella et tomates séchées."
          ),
        },
        {
          name: "Veg",
          price: "€ 5",
          description: l(
            "Grigliata di verdure, hummus, rucola.",
            "Grilled vegetables, hummus and rocket.",
            "Légumes grillés, houmous et roquette."
          ),
        },
        {
          name: "La Leggera",
          price: "€ 5",
          description: l(
            "Petto di pollo, insalata, yogurt e limone.",
            "Chicken breast, salad, yogurt and lemon.",
            "Blanc de poulet, salade, yaourt et citron."
          ),
        },
        {
          name: "La Mortazza",
          price: "€ 6",
          description: l(
            "Mortadella, pistacchio, mozzarella fiordilatte.",
            "Mortadella, pistachio and fiordilatte mozzarella.",
            "Mortadelle, pistache et mozzarella fiordilatte."
          ),
        },
        {
          name: "Fiamma",
          price: "€ 6",
          description: l(
            "Salame piccante, provola, crema di peperoni.",
            "Spicy salami, provola and pepper cream.",
            "Salami piquant, provola et crème de poivrons."
          ),
        },
        {
          name: "La Junia",
          price: "€ 6",
          description: l(
            "Tonno, cipolla rossa, olive nere.",
            "Tuna, red onion and black olives.",
            "Thon, oignon rouge et olives noires."
          ),
        },
        {
          name: "Peperini",
          price: "€ 5",
          description: l(
            "Peperoni arrostiti, acciughe, caciocavallo.",
            "Roasted peppers, anchovies and caciocavallo cheese.",
            "Poivrons grillés, anchois et caciocavallo."
          ),
        },
        {
          name: "Capitolo",
          price: "€ 6",
          description: l(
            "Prosciutto crudo, burrata, basilico.",
            "Cured ham, burrata and basil.",
            "Jambon cru, burrata et basilic."
          ),
        },
        {
          name: "Tonino",
          price: "€ 5",
          description: l(
            "Frittata di cipolla, pecorino, pepe.",
            "Onion omelette, pecorino and pepper.",
            "Omelette à l’oignon, pecorino et poivre."
          ),
        },
        {
          name: "Regina",
          price: "€ 6",
          description: l(
            "Roast beef, rucola, scaglie e senape al miele.",
            "Roast beef, rocket, cheese flakes and honey mustard.",
            "Rosbif, roquette, copeaux de fromage et moutarde au miel."
          ),
        },
      ],
    },
  ],
};

const fritti = {
  id: "fritti",
  title: l("Fritti & sfiziosità", "Fried bites & nibbles", "Fritures & gourmandises"),
  groups: [
    {
      items: [
        {
          name: l("Bruschette al pomodoro 3pz", "Tomato bruschette 3 pcs", "Bruschette à la tomate 3 pcs"),
          price: "€ 1,50",
          priceNote: PER_PERSON,
        },
        {
          name: l("Bruschette miste 3pz", "Mixed bruschette 3 pcs", "Bruschette mixtes 3 pcs"),
          price: "€ 3",
          priceNote: PER_PERSON,
        },
        {
          name: l("Bruschette gourmet 3pz", "Gourmet bruschette 3 pcs", "Bruschette gourmet 3 pcs"),
          price: "€ 5",
          priceNote: PER_PERSON,
        },
      ],
    },
    {
      /* Contenuto invariato della vecchia sezione "Sfiziosità fritte" */
      title: l("Sfiziosità fritte", "Fried bites", "Fritures gourmandes"),
      intro: l(
        "Crocchette di patate, patatine fritte, patatine con cheddar e bacon, polpette della casa, panzerotti.",
        "Potato croquettes, fries, cheddar and bacon fries, homemade meatballs and panzerotti.",
        "Croquettes de pommes de terre, frites, frites cheddar et bacon, boulettes maison et panzerotti."
      ),
      items: [
        { name: l("Porzione piccola", "Small portion", "Petite portion"), price: "€ 4" },
        { name: l("Porzione media", "Medium portion", "Portion moyenne"), price: "€ 6" },
        { name: l("Nuggets di pollo", "Chicken nuggets", "Nuggets de poulet"), price: "€ 6" },
      ],
    },
  ],
};

const aperitivo = {
  id: "aperitivo",
  title: l("Aperitivo & Apericena", "Aperitivo & Apericena", "Apéritif & Apericena"),
  intro: l(
    "Una selezione pensata per accompagnare l’aperitivo e condividere qualcosa di buono.",
    "A selection designed to accompany your aperitivo and share something delicious.",
    "Une sélection pensée pour accompagner l’apéritif et partager un bon moment."
  ),
  groups: [
    {
      items: [
        {
          name: "Aperitivo",
          price: "€ 8",
          description: l(
            "Drink + patate o snack salati.",
            "Drink + crisps or savoury snacks.",
            "Boisson + chips ou snacks salés."
          ),
        },
        {
          name: "Apericena",
          price: "€ 10",
          description: l(
            "Drink + piatto composto, la sera.",
            "Drink + composed plate, served in the evening.",
            "Boisson + assiette composée, en soirée."
          ),
        },
        {
          name: l(
            "Tagliere salumi e formaggi",
            "Cured meat and cheese board",
            "Planche charcuteries et fromages"
          ),
          price: "€ 15",
          description: l(
            "Salumi e formaggi locali da condividere.",
            "A local cured meat and cheese board to share.",
            "Planche de charcuteries et fromages locaux à partager."
          ),
        },
      ],
    },
  ],
};

const acque = {
  id: "acque",
  title: l("Acque", "Water", "Eaux"),
  groups: [
    {
      items: [
        { name: l("Acqua naturale 50 cl", "Still water 50 cl", "Eau plate 50 cl"), price: "€ 1" },
        { name: l("Acqua frizzante 50 cl", "Sparkling water 50 cl", "Eau gazeuse 50 cl"), price: "€ 1" },
      ],
    },
  ],
};

const bibiteClassiche = {
  id: "bibite-classiche",
  title: l("Bibite classiche", "Classic soft drinks", "Sodas classiques"),
  groups: [
    {
      items: [
        { name: "Coca-Cola 33 cl", price: "€ 2,50" },
        { name: "Coca-Cola Zero 33 cl", price: "€ 2,50" },
        { name: "Fanta 33 cl", price: "€ 2,50" },
        { name: "Sprite", price: "€ 3" },
        { name: "Chinotto", price: "€ 3" },
        { name: l("Estathé limone/pesca", "Estathé lemon/peach", "Estathé citron/pêche"), price: "€ 2,50" },
        { name: l("Succo di frutta", "Fruit juice", "Jus de fruits"), price: "€ 2,50" },
        { name: "Red Bull", price: "€ 3,50" },
      ],
    },
  ],
};

const aperitiviAnalcolici = {
  id: "aperitivi-analcolici",
  title: l("Aperitivi analcolici", "Non-alcoholic aperitifs", "Apéritifs sans alcool"),
  groups: [
    {
      items: [
        { name: "Crodino", price: "€ 2,50" },
        { name: "Cocktail San Pellegrino", price: "€ 2,50" },
        { name: "Tassoni", price: "€ 2,50" },
      ],
    },
  ],
};

const toniche = {
  id: "toniche",
  title: l("Toniche & premium soft drinks", "Tonics & premium soft drinks", "Tonics & softs premium"),
  groups: [
    {
      items: [
        { name: l("Acqua tonica 20 cl", "Tonic water 20 cl", "Eau tonique 20 cl"), price: "€ 3" },
        { name: "Lemon Soda 20 cl", price: "€ 2,50" },
        { name: "Ginger Beer 20 cl", price: "€ 3" },
        { name: l("Soda al pompelmo rosa", "Pink grapefruit soda", "Soda au pamplemousse rose"), price: "€ 3,50" },
      ],
    },
  ],
};

const cocktails = {
  id: "cocktails",
  title: "Cocktails",
  groups: [
    {
      items: [
        {
          name: l("Spritz & Aperitivi", "Spritz & Aperitifs", "Spritz & Apéritifs"),
          price: "€ 5",
          description: "Aperol Spritz, Campari Spritz, Hugo",
        },
        {
          name: "Create your Spritz",
          price: "€ 5",
          description: l(
            "Scegli il liquore che preferisci. Personalizza il tuo Spritz e crea il tuo aperitivo.",
            "Pick the liqueur you like best. Customise your Spritz and create your own aperitivo.",
            "Choisissez la liqueur que vous préférez. Personnalisez votre Spritz et créez votre apéritif."
          ),
        },
        {
          name: "International Classics",
          price: "€ 5",
          description: "Negroni, Americano, Moscow Mule, Mojito, Margarita, Daiquiri",
        },
        {
          name: "Vodka Cocktails",
          price: "€ 5",
          description: "Cosmopolitan, Espresso Martini, Moscow Mule",
        },
        {
          name: "Rum Cocktails",
          price: "€ 5",
          description: "Cuba Libre, Mojito, Daiquiri, Piña Colada",
        },
        {
          name: "Whisky Cocktails",
          price: "€ 5",
          description: "Old Fashioned, Whisky Sour, Manhattan",
        },
        {
          name: "Signature Cocktails",
          price: "€ 5",
          description: l(
            "creazioni originali del Regina",
            "original creations by Regina",
            "créations originales du Regina"
          ),
        },
        {
          name: "Mocktails",
          price: "€ 5",
          description: l(
            "cocktail analcolici",
            "non-alcoholic cocktails",
            "cocktails sans alcool"
          ),
        },
      ],
    },
  ],
};

const birre = {
  id: "birre",
  title: l("Birre", "Beers", "Bières"),
  groups: [
    {
      /* Contenuto invariato della vecchia sezione "Birre" */
      intro: l(
        "Tutte in bottiglia da 33 cl.",
        "All served in 33 cl bottles.",
        "Toutes en bouteille de 33 cl."
      ),
      columns: true,
      items: [
        { name: "Beck's", price: "€ 2,50" },
        { name: "Peroni Nastro Azzurro", price: "€ 2,50" },
        { name: "Bud", price: "€ 3" },
        { name: "Corona", price: "€ 3" },
        { name: "Menabrea", price: "€ 3" },
        { name: "Peroni Rossa", price: "€ 3" },
        { name: "Tennent's", price: "€ 3" },
        { name: "Bjorne Beer", price: "€ 3,50" },
        { name: "Ceres", price: "€ 3,50" },
        { name: "Stella Artois", price: "€ 3,50" },
        { name: "Leffe Bionda", price: "€ 4" },
        { name: "Tipa", price: "€ 5" },
      ],
    },
    {
      title: l("Birre alla spina", "Draught beers", "Bières pression"),
      items: [
        {
          name: "Heineken",
          prices: [
            { label: "20 cl", price: "€ 3" },
            { label: "40 cl", price: "€ 4,50" },
            { label: l("½ litro", "½ litre", "½ litre"), price: "€ 5,50" },
          ],
        },
        {
          name: "Moretti La Rossa",
          prices: [
            { label: "20 cl", price: "€ 3,50" },
            { label: "40 cl", price: "€ 5,50" },
            { label: l("½ litro", "½ litre", "½ litre"), price: "€ 7" },
          ],
        },
      ],
    },
  ],
};

const vini = {
  id: "vini",
  title: l("Vini & Bollicine", "Wines & Bubbles", "Vins & Bulles"),
  groups: [
    {
      title: l("Vini rossi", "Red wines", "Vins rouges"),
      items: [
        {
          name: "Chicca Primitivo",
          prices: [
            { label: GLASS, price: "€ 5" },
            { label: BOTTLE, price: "€ 22" },
          ],
        },
        {
          name: "Torremora Primitivo",
          prices: [
            { label: GLASS, price: "€ 5" },
            { label: BOTTLE, price: "€ 20" },
          ],
        },
        {
          name: "Torremora Negroamaro",
          prices: [
            { label: GLASS, price: "€ 5" },
            { label: BOTTLE, price: "€ 20" },
          ],
        },
      ],
    },
    {
      title: l("Vini rosati", "Rosé wines", "Vins rosés"),
      items: [
        {
          name: "Torremora Rosato",
          prices: [
            { label: GLASS, price: "€ 5" },
            { label: BOTTLE, price: "€ 20" },
          ],
        },
      ],
    },
    {
      title: l("Vini bianchi", "White wines", "Vins blancs"),
      items: [
        {
          name: "Torremora Chardonnay",
          prices: [
            { label: GLASS, price: "€ 5" },
            { label: BOTTLE, price: "€ 20" },
          ],
        },
      ],
    },
    {
      title: "Prosecco",
      items: [
        { name: l("Prosecco al calice", "Prosecco by the glass", "Prosecco au verre"), price: "€ 3" },
        { name: l("Prosecco in bottiglia", "Prosecco by the bottle", "Prosecco en bouteille"), price: "€ 15" },
      ],
    },
  ],
};

/* Contenuto invariato della vecchia sezione "Gin" */
const gin = {
  id: "gin",
  title: "Gin",
  intro: l(
    "Scegli il tuo gin: lo serviamo con la tonica giusta.",
    "Choose your gin: we serve it with the right tonic.",
    "Choisissez votre gin : nous le servons avec le bon tonic."
  ),
  groups: [
    {
      columns: true,
      items: [
        { name: "Bombay Sapphire", price: "€ 7" },
        { name: "Corricella", price: "€ 7" },
        { name: "Tanqueray", price: "€ 7" },
        { name: "Brockmans", price: "€ 8" },
        { name: "Hendrick's", price: "€ 8" },
        { name: "Hendrick's Another", price: "€ 8" },
        { name: "Malfy Arancia", price: "€ 8" },
        { name: "Malfy Rosa", price: "€ 8" },
        { name: "Mare Mediterranean Gin", price: "€ 8" },
        { name: "Mazzetti", price: "€ 8" },
        { name: "Nordés", price: "€ 8" },
        { name: "Wint", price: "€ 8" },
        { name: "Bobby's", price: "€ 10" },
        { name: "Engine", price: "€ 10" },
        { name: "Malammore", price: "€ 10" },
        { name: "Monkey 47", price: "€ 10" },
        { name: "Nº 3 London Dry", price: "€ 10" },
        { name: "Portofino", price: "€ 10" },
        { name: "Roku", price: "€ 10" },
        { name: "Tanqueray Nº Ten", price: "€ 10" },
      ],
    },
  ],
};

const whisky = {
  id: "whisky",
  title: "Whisky & Whiskey",
  intro: SPIRITS_NOTE,
  groups: [
    {
      title: "Scotch Whisky",
      items: [
        { name: "Talisker Skye", price: "€ 7" },
        { name: "Oban", price: "€ 9" },
      ],
    },
    {
      title: "Irish Whiskey",
      items: [{ name: "Jameson", price: "€ 5" }],
    },
    {
      title: "Tennessee Whiskey",
      items: [
        { name: "Jack Daniel's", price: "€ 5" },
        { name: "Jack Daniel's Apple", price: "€ 5" },
        { name: "Jack Daniel's Honey", price: "€ 5" },
        { name: "Jack Daniel's Fire", price: "€ 5" },
      ],
    },
    {
      title: "Bourbon Whiskey",
      items: [{ name: "Wild Turkey", price: "€ 6" }],
    },
  ],
};

const rum = {
  id: "rum",
  title: "Rum",
  intro: SPIRITS_NOTE,
  groups: [
    {
      title: l("Rum scuri & speziati", "Dark & spiced rum", "Rhums bruns & épicés"),
      items: [
        { name: "The Kraken", price: "€ 5" },
        { name: "Don Papa Baroko", price: "€ 6" },
      ],
    },
    {
      title: l("Rum premium & invecchiati", "Premium & aged rum", "Rhums premium & vieillis"),
      items: [
        { name: "Don Papa Original", price: "€ 7" },
        { name: "Diplomatico", price: "€ 7" },
        { name: "Havana Club 7", price: "€ 5" },
        { name: "Zacapa 23", price: "€ 8" },
      ],
    },
    {
      title: l("Rum & liquori speciali", "Rum & special liqueurs", "Rhums & liqueurs spéciales"),
      items: [
        { name: "Legendario", price: "€ 5" },
        { name: "Tamai Amaro e Rum alle Noci", price: "€ 6" },
      ],
    },
  ],
};

const vodkaTequilaMezcal = {
  id: "vodka-tequila-mezcal",
  title: "Vodka • Tequila • Mezcal",
  groups: [
    {
      title: "Vodka",
      items: [
        { name: "Moscovskaya", price: "€ 4" },
        { name: "Belvedere", price: "€ 6" },
      ],
    },
    {
      title: "Tequila",
      items: [
        { name: "Espolòn Blanco", price: "€ 4" },
        { name: "Espolòn Reposado", price: "€ 5" },
      ],
    },
    {
      title: "Mezcal",
      items: [
        { name: "Montelobos", price: "€ 4" },
        { name: "Gusano Rojo", price: "€ 5" },
      ],
    },
  ],
};

const amari = {
  id: "amari",
  title: l("Amari & Digestivi", "Amari & Digestifs", "Amari & Digestifs"),
  groups: [
    {
      items: [
        {
          name: "Amari",
          price: "€ 3",
          description:
            "Amaro del Capo, Jägermeister, Montenegro, Limoncello, Averna, Amaro Lucano, Fernet Branca, Brancamenta",
        },
        {
          name: l("Altri amari e liquori", "Other amari & liqueurs", "Autres amari & liqueurs"),
          price: "€ 3",
          description:
            "Unicum, Petrus, Sambuca, Baileys, Animanera, Borghetti, Cynar, Sheridan's",
        },
        {
          name: l("Selezione speciale", "Special selection", "Sélection spéciale"),
          price: "€ 4",
          description:
            "Jefferson Amaro Importante, Vecchio Amaro del Capo Red Hot Edition, Crema alpina al pistacchio, Crema alpina alla nocciola",
        },
      ],
    },
  ],
};

/* =======================================================
   MACRO-SEZIONI
   =======================================================
 *
 * title.lead + title.italic compongono il
 * titolo: la parola in italic segue lo
 * stile dei titoli del sito.
 */

export const menuMacros = [
  {
    slug: "caffetteria-dolci",
    title: {
      it: { lead: "Caffetteria &", italic: "Dolci" },
      en: { lead: "Coffee &", italic: "Desserts" },
      fr: { lead: "Café &", italic: "Desserts" },
    },
    summary: l(
      "Caffè, cappuccino, espressino, dolci e crêpes.",
      "Espresso, cappuccino, espressino, desserts and crêpes.",
      "Expresso, cappuccino, espressino, desserts et crêpes."
    ),
    sections: [caffetteria, dolci],
  },
  {
    slug: "cucina",
    title: {
      it: { lead: "", italic: "Cucina" },
      en: { lead: "", italic: "Food" },
      fr: { lead: "", italic: "Cuisine" },
    },
    summary: l(
      "Baguette, bruschette, fritti, aperitivo e apericena.",
      "Baguettes, bruschette, fried bites, aperitivo and apericena.",
      "Baguettes, bruschette, fritures, apéritif et apericena."
    ),
    sections: [baguette, fritti, aperitivo],
  },
  {
    slug: "bibite",
    title: {
      it: { lead: "", italic: "Bibite" },
      en: { lead: "Soft", italic: "drinks" },
      fr: { lead: "Boissons", italic: "sans alcool" },
    },
    summary: l(
      "Acque, bibite classiche, aperitivi analcolici e toniche.",
      "Water, classic soft drinks, non-alcoholic aperitifs and tonics.",
      "Eaux, sodas classiques, apéritifs sans alcool et tonics."
    ),
    sections: [acque, bibiteClassiche, aperitiviAnalcolici, toniche],
  },
  {
    slug: "drink",
    title: {
      it: { lead: "", italic: "Drink" },
      en: { lead: "", italic: "Drinks" },
      fr: { lead: "", italic: "Drinks" },
    },
    summary: l(
      "Cocktail, birre in bottiglia e alla spina, vini e bollicine.",
      "Cocktails, bottled and draught beers, wines and bubbles.",
      "Cocktails, bières en bouteille et pression, vins et bulles."
    ),
    sections: [cocktails, birre, vini],
  },
  {
    slug: "distillati",
    title: {
      it: { lead: "", italic: "Distillati" },
      en: { lead: "", italic: "Spirits" },
      fr: { lead: "", italic: "Spiritueux" },
    },
    summary: l(
      "Gin, whisky, rum, vodka, tequila e mezcal.",
      "Gin, whisky, rum, vodka, tequila and mezcal.",
      "Gin, whisky, rhum, vodka, tequila et mezcal."
    ),
    sections: [gin, whisky, rum, vodkaTequilaMezcal],
  },
  {
    slug: "amari-digestivi",
    title: {
      it: { lead: "Amari &", italic: "Digestivi" },
      en: { lead: "Amari &", italic: "Digestifs" },
      fr: { lead: "Amari &", italic: "Digestifs" },
    },
    summary: l(
      "Amari, liquori e una selezione speciale.",
      "Amari, liqueurs and a special selection.",
      "Amari, liqueurs et une sélection spéciale."
    ),
    sections: [amari],
  },
];

export const MENU_SLUGS = menuMacros.map(
  (macro) => macro.slug
);

export function findMenuMacro(slug) {
  return (
    menuMacros.find(
      (macro) => macro.slug === slug
    ) ?? null
  );
}
