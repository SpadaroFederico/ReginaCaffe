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
  introHighlight: true,
  groups: [
    {
      items: [
        {
          name: "Barone",
          price: "€ 5",
          description: l(
            "Fesa di tacchino, mozzarella fior di latte, melanzane sott'olio e foglie di basilico.",
            "Turkey breast, mozzarella fior di latte, marinated aubergines and basil leaves.",
            "Blanc de dinde, mozzarella fior di latte, aubergines marinées et feuilles de basilic."
          ),
        },
        {
          name: "Veg",
          price: "€ 5",
          description: l(
            "Stracciatella, melanzane grigliate, zucchine grigliate, pomodorini freschi, olio EVO pugliese e foglie di basilico.",
            "Stracciatella, grilled aubergines, grilled courgettes, fresh cherry tomatoes, Apulian extra virgin olive oil and basil leaves.",
            "Stracciatella, aubergines grillées, courgettes grillées, tomates cerises fraîches, huile d'olive extra vierge des Pouilles et feuilles de basilic."
          ),
        },
        {
          name: "La Leggera",
          price: "€ 6",
          description: l(
            "Bresaola, pomodorini freschi, cetriolo, menta fresca e scorza di limone.",
            "Bresaola, fresh cherry tomatoes, cucumber, fresh mint and lemon zest.",
            "Bresaola, tomates cerises fraîches, concombre, menthe fraîche et zeste de citron."
          ),
        },
        {
          name: "La Mortazza",
          price: "€ 6",
          description: l(
            "Mortadella artigianale selezionata, stracciatella e crema di pistacchio.",
            "Selected artisan mortadella, stracciatella and pistachio cream.",
            "Mortadelle artisanale sélectionnée, stracciatella et crème de pistache."
          ),
        },
        {
          name: "Fiamma",
          price: "€ 6",
          description: l(
            "Speck affumicato, stracchino, zucchine grigliate, rucola e olio EVO pugliese.",
            "Smoked speck, stracchino, grilled courgettes, rocket and Apulian extra virgin olive oil.",
            "Speck fumé, stracchino, courgettes grillées, roquette et huile d'olive extra vierge des Pouilles."
          ),
        },
        {
          name: "La Jonica",
          price: "€ 7",
          description: l(
            "Tonno, pomodoro, cipolla rossa dolce, olive nere, capperi, origano e foglie di menta.",
            "Tuna, tomato, sweet red onion, black olives, capers, oregano and mint leaves.",
            "Thon, tomate, oignon rouge doux, olives noires, câpres, origan et feuilles de menthe."
          ),
        },
        {
          name: "Peperina",
          price: "€ 7",
          description: l(
            "Salame piccante, prosciutto cotto, scamorza affumicata, crema piccante, funghi sott'olio e lattuga.",
            "Spicy salami, cooked ham, smoked scamorza, spicy cream, marinated mushrooms and lettuce.",
            "Salami piquant, jambon cuit, scamorza fumée, crème piquante, champignons marinés et laitue."
          ),
        },
        {
          name: "Capitolo",
          price: "€ 7",
          description: l(
            "Salame artigianale pugliese, caciocavallo stagionato, pomodoro fresco, rucola e olio EVO pugliese.",
            "Artisan Apulian salami, aged caciocavallo, fresh tomato, rocket and Apulian extra virgin olive oil.",
            "Salami artisanal des Pouilles, caciocavallo affiné, tomate fraîche, roquette et huile d'olive extra vierge des Pouilles."
          ),
        },
        {
          name: "Tonino",
          price: "€ 7",
          description: l(
            "Capocollo di Martina Franca, stracciatella, scaglie di caciocavallo semi stagionato, rucola fresca, crema piccante e olio EVO pugliese.",
            "Capocollo di Martina Franca, stracciatella, semi-aged caciocavallo flakes, fresh rocket, spicy cream and Apulian extra virgin olive oil.",
            "Capocollo de Martina Franca, stracciatella, copeaux de caciocavallo semi-affiné, roquette fraîche, crème piquante et huile d'olive extra vierge des Pouilles."
          ),
        },
        {
          name: "Regina",
          price: "€ 8",
          description: l(
            "Prosciutto crudo, burrata, marmellata di fichi, pomodorini secchi, rucola e olio EVO pugliese.",
            "Cured ham, burrata, fig jam, sun-dried cherry tomatoes, rocket and Apulian extra virgin olive oil.",
            "Jambon cru, burrata, confiture de figues, tomates cerises séchées, roquette et huile d'olive extra vierge des Pouilles."
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
      introHighlight: true,
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
            "Un momento leggero, ideale per accompagnare la vostra bevuta. Olive, taralli e arachidi, patatine e snack salati, sfiziosità del giorno",
            "A light moment, perfect to accompany your drink. Olives, taralli and peanuts, crisps and savoury snacks, daily specials",
            "Un moment léger, idéal pour accompagner votre boisson. Olives, taralli et cacahuètes, chips et snacks salés, suggestions du jour"
          ),
        },
        {
          name: "Apericena",
          price: "€ 10",
          description: l(
            "Il perfetto incontro tra la leggerezza dell’aperitivo e la completezza di una cena, tutto quello che vuoi in un’unica esperienza! Selezione di sfiziosità locali e piatti caldi e freddi tipici del posto.",
            "The perfect meeting between the lightness of an aperitivo and the fullness of a dinner, everything you want in one experience! A selection of local specialities and hot and cold dishes typical of the area.",
            "La rencontre parfaite entre la légèreté de l’apéritif et la complétude d’un dîner, tout ce que vous voulez en une seule expérience ! Sélection de spécialités locales et plats chauds et froids typiques de la région."
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
            "Un’esperienza di sapori: salumi e formaggi selezionati, con accompagnamenti tipici del posto, serviti in tagliere da condividere.",
            "An experience of flavours: selected cured meats and cheeses, with local accompaniments, served on a board to share.",
            "Une expérience de saveurs : charcuteries et fromages sélectionnés, avec des accompagnements typiques du terroir, servis sur une planche à partager."
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
        { name: "Red Bull", price: "€ 3" },
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
        { name: "Oban", price: "€ 8" },
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
    slug: "caffetteria",
    title: {
      it: { lead: "", italic: "Caffetteria" },
      en: { lead: "", italic: "Coffee" },
      fr: { lead: "", italic: "Café" },
    },
    summary: l(
      "Caffè, macchiato, espressino e cappuccino, anche decaffeinati.",
      "Espresso, macchiato, espressino and cappuccino, also decaf.",
      "Expresso, macchiato, espressino et cappuccino, aussi en décaféiné."
    ),
    sections: [caffetteria],
  },
  {
    slug: "dolci",
    title: {
      it: { lead: "", italic: "Dolci" },
      en: { lead: "", italic: "Desserts" },
      fr: { lead: "", italic: "Desserts" },
    },
    summary: l(
      "Tiramisù, cheesecake, salame al cioccolato, dolce del giorno e crêpes.",
      "Tiramisù, cheesecake, chocolate salami, dessert of the day and crêpes.",
      "Tiramisù, cheesecake, salami au chocolat, dessert du jour et crêpes."
    ),
    sections: [dolci],
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
    slug: "gin",
    title: {
      it: { lead: "", italic: "Gin" },
      en: { lead: "", italic: "Gin" },
      fr: { lead: "", italic: "Gin" },
    },
    summary: l(
      "Venti gin, serviti con la tonica giusta.",
      "Twenty gins, served with the right tonic.",
      "Vingt gins, servis avec le bon tonic."
    ),
    sections: [gin],
  },
  {
    slug: "distillati",
    title: {
      it: { lead: "", italic: "Distillati" },
      en: { lead: "", italic: "Spirits" },
      fr: { lead: "", italic: "Spiritueux" },
    },
    summary: l(
      "Whisky, rum, vodka, tequila e mezcal.",
      "Whisky, rum, vodka, tequila and mezcal.",
      "Whisky, rhum, vodka, tequila et mezcal."
    ),
    sections: [whisky, rum, vodkaTequilaMezcal],
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
