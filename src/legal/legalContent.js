export const LEGAL_CONFIG = {
  /*
   * Con true la finestra legale mostra
   * l'avviso «Bozza da completare».
   *
   * Titolare, sede, P. IVA, email, PEC e
   * hosting sono i dati reali del locale:
   * resta solo la verifica finale dei testi.
   *
   * Prima della pubblicazione questo valore
   * dovrà diventare false.
   */
  isDraft: true,

  policyVersion: "0.5",

  lastUpdated: {
    it: "14 settembre 2026",
    en: "14 September 2026",
    fr: "14 septembre 2026",
  },

  controller: {
    name:
      "Regina Caffè di Ranieri Antonio",

    registeredOffice:
      "Piazza Regina Margherita 21, 74023 Grottaglie (TA)",

    vatNumber: "03479700738",

    privacyEmail:
      "reginacaffegrottaglie@gmail.com",

    /*
     * Recapito per le comunicazioni con
     * valore legale. Lo stesso indirizzo
     * compare nel footer del sito.
     */
    pec: "antonioranieri2026@pec.it",
  },

  hosting: {
    /*
     * Il sito è pubblicato su Cloudflare,
     * che fornisce insieme hosting, CDN e
     * protezione del traffico.
     */
    provider: "Cloudflare, Inc.",
  },

  /*
   * Supabase è già realmente utilizzato.
   */
  supabase: {
    enabled: true,

    regionCode:
      "eu-west-1",

    region: {
      it: "West EU (Irlanda)",
      en: "West EU (Ireland)",
      fr: "West EU (Irlande)",
    },
  },

  /*
   * I font sono serviti in locale da
   * public/fonts (vedi src/fonts.css):
   * nessuna connessione a Google Fonts.
   */
  googleFonts: {
    enabled: false,
  },
};

function getItalianContent() {
  const {
    controller,
    hosting,
    supabase,
    googleFonts,
  } = LEGAL_CONFIG;

  const supabaseParagraph =
    supabase.enabled
      ? `La gestione e pubblicazione degli eventi utilizza Supabase. Il progetto principale è configurato nella regione ${supabase.region.it} (${supabase.regionCode}). Le richieste necessarie a caricare gli eventi pubblici raggiungono l'infrastruttura Supabase e possono comportare il trattamento di dati tecnici di connessione, quali indirizzo IP, data e ora della richiesta e informazioni tecniche del browser. L'area amministrativa utilizza inoltre Supabase Auth e può trattare indirizzi email degli amministratori, identificativi utente, informazioni di autenticazione e log tecnici o di sicurezza.`
      : "";

  const hostingParagraph =
    `Il sito è ospitato e distribuito tramite ${hosting.provider}, che fornisce hosting, rete CDN e protezione del traffico e può trattare dati tecnici necessari alla consegna e alla sicurezza del sito, inclusi indirizzo IP, data e ora della richiesta, risorsa richiesta e informazioni tecniche del client.`;

  const googleFontsParagraph =
    googleFonts.enabled
      ? "Nella configurazione tecnica attuale i caratteri tipografici del sito vengono richiesti tramite Google Fonts. Il caricamento comporta una connessione ai server del fornitore e la trasmissione dei dati tecnici necessari alla richiesta. Prima della pubblicazione definitiva sarà valutata anche la possibilità di ospitare localmente i font."
      : "I caratteri tipografici utilizzati dal sito sono ospitati localmente e non richiedono connessioni a servizi esterni per il loro caricamento.";

  return {
    privacy: {
      intro:
        "La presente informativa descrive il trattamento dei dati personali effettuato attraverso il sito di Regina Caffè.",

      sections: [
        {
          title:
            "1. Titolare del trattamento",

          paragraphs: [
            `Titolare: ${controller.name}.`,
            `Sede legale: ${controller.registeredOffice}.`,
            `P. IVA: ${controller.vatNumber}.`,
            `Contatto privacy: ${controller.privacyEmail}.`,
            `PEC: ${controller.pec}.`,
          ],
        },

        {
          title:
            "2. Dati personali trattati",

          paragraphs: [
            "In relazione all'utilizzo del sito possono essere trattate le seguenti categorie di dati:",
          ],

          bullets: [
            "dati tecnici e di navigazione, come indirizzo IP, data e ora della richiesta, browser, dispositivo, pagina o risorsa richiesta e log tecnici o di sicurezza;",
            "preferenza della lingua e preferenze relative a cookie, local storage o tecnologie analoghe;",
            "dati tecnici necessari al caricamento degli eventi pubblici attraverso l'infrastruttura Supabase;",
            "indirizzo email, identificativo utente e informazioni tecniche relative agli amministratori dell'area riservata;",
            "numero di telefono, nome, contenuto e metadati delle comunicazioni quando l'utente contatta volontariamente il locale tramite telefono, WhatsApp o altri canali indicati nel sito;",
            "dati eventualmente comunicati alle piattaforme esterne quando l'utente seleziona volontariamente collegamenti social, mappe, prenotazioni, locandine o altri link associati agli eventi.",
          ],
        },

        {
          title:
            "3. Finalità e basi giuridiche",

          bullets: [
            "fornire, mantenere operativo e proteggere il sito e la relativa infrastruttura tecnica, sulla base del legittimo interesse del titolare alla sicurezza e al funzionamento del servizio;",
            "mostrare e aggiornare gli eventi pubblicati dal locale;",
            "ricordare la preferenza della lingua quando l'utente autorizza la relativa categoria di preferenza;",
            "gestire autenticazione, autorizzazioni e sicurezza dell'area amministrativa;",
            "rispondere a richieste di informazioni, disponibilità o prenotazioni effettuate volontariamente dall'utente;",
            "adempiere agli obblighi legali, contabili o amministrativi eventualmente applicabili.",
          ],
        },

        {
          title:
            "4. Hosting e infrastruttura tecnica",

          paragraphs: [
            hostingParagraph,
            supabaseParagraph,
            googleFontsParagraph,
          ].filter(Boolean),
        },

        {
          title:
            "5. Collegamenti e piattaforme esterne",

          paragraphs: [
            "Il sito contiene collegamenti a servizi esterni quali Instagram, Facebook, TikTok, WhatsApp e Google Maps e può contenere collegamenti esterni associati ai singoli eventi, ad esempio verso social network, pagine di prenotazione o locandine online.",
            "Tali contenuti non vengono incorporati direttamente nel sito. Quando l'utente seleziona volontariamente un collegamento viene trasferito al relativo servizio esterno, che applica la propria informativa privacy e le proprie condizioni di utilizzo.",
          ],
        },

        {
          title:
            "6. Destinatari dei dati",

          paragraphs: [
            "I dati possono essere trattati, nei limiti necessari alle rispettive attività, da fornitori di infrastruttura, hosting, CDN/DNS, backend, autenticazione, manutenzione tecnica e da soggetti autorizzati dal titolare.",
            "Supabase è utilizzato quale fornitore dell'infrastruttura backend per la gestione degli eventi e dell'autenticazione amministrativa.",
            googleFonts.enabled
              ? "Nella configurazione attuale Google Fonts è utilizzato per il caricamento dei caratteri tipografici."
              : null,
            "Quando richiesto dalla legge, i dati possono inoltre essere comunicati alle autorità competenti.",
          ].filter(Boolean),
        },

        {
          title:
            "7. Trasferimenti internazionali",

          paragraphs: [
            `Il progetto principale Supabase è configurato nella regione ${supabase.region.it} (${supabase.regionCode}).`,
            "L'utilizzo di fornitori internazionali o dei relativi subfornitori può comunque comportare trattamenti o trasferimenti di dati al di fuori dello Spazio Economico Europeo. Prima della pubblicazione definitiva il titolare dovrà verificare gli accordi applicabili, le eventuali decisioni di adeguatezza e le altre garanzie previste dalla normativa.",
          ],
        },

        {
          title:
            "8. Conservazione",

          bullets: [
            "la scelta relativa alle preferenze privacy viene memorizzata per sei mesi, salvo revoca anticipata;",
            "la lingua selezionata viene ricordata fino alla revoca o alla scadenza della scelta privacy quando la categoria Preferenze è autorizzata;",
            "le sessioni degli amministratori sono mantenute secondo la durata e le impostazioni previste dal sistema di autenticazione e possono essere terminate tramite logout o revoca;",
            "gli account degli amministratori vengono conservati per il periodo in cui l'accesso è autorizzato e possono essere disabilitati quando non più necessari;",
            "i log tecnici e di sicurezza vengono conservati secondo le impostazioni e i termini applicabili ai fornitori utilizzati;",
            "i dati delle comunicazioni vengono conservati per il tempo necessario a gestire la relativa richiesta e per gli ulteriori periodi eventualmente richiesti dalla legge.",
          ],
        },

        {
          title:
            "9. Diritti dell'interessato",

          paragraphs: [
            "Nei casi previsti dalla normativa, l'interessato può richiedere accesso, rettifica, cancellazione, limitazione, portabilità e opposizione al trattamento.",
            "Quando il trattamento è basato sul consenso, questo può essere revocato in qualsiasi momento senza pregiudicare la liceità del trattamento effettuato prima della revoca.",
            `Le richieste possono essere inviate a ${controller.privacyEmail}. È inoltre possibile proporre reclamo al Garante per la protezione dei dati personali.`,
          ],
        },

        {
          title:
            "10. Minori",

          paragraphs: [
            "Il sito non è progettato per raccogliere intenzionalmente dati personali di minori attraverso moduli o sistemi di registrazione pubblica.",
          ],
        },

        {
          title:
            "11. Sicurezza",

          paragraphs: [
            "L'accesso all'area amministrativa è riservato ad account autorizzati. Il sistema utilizza controlli applicativi e regole di autorizzazione a livello di database per limitare l'accesso e la modifica dei dati.",
            "Nessun sistema informatico può tuttavia garantire un livello di sicurezza assoluto.",
          ],
        },

        {
          title:
            "12. Modifiche all'informativa",

          paragraphs: [
            "La presente informativa può essere aggiornata in seguito a modifiche normative, tecniche, organizzative o all'introduzione di nuovi fornitori e servizi.",
            "La versione e la data di ultimo aggiornamento sono indicate nella relativa finestra informativa.",
          ],
        },
      ],
    },

    cookies: {
      intro:
        "Questa Cookie Policy descrive cookie, local storage e tecnologie analoghe utilizzati dal sito.",

      technologies: [
        {
          name:
            "regina-cookie-consent",

          type:
            "Local Storage tecnico",

          category:
            "Necessario",

          duration:
            "6 mesi",

          purpose:
            "Memorizza la scelta espressa nel pannello privacy e impedisce che venga richiesta nuovamente prima della relativa scadenza.",
        },

        {
          name:
            "regina-language",

          type:
            "Local Storage di preferenza",

          category:
            "Preferenze",

          duration:
            "Fino a 6 mesi o fino alla revoca",

          purpose:
            "Ricorda la lingua selezionata dall'utente. Viene utilizzato soltanto quando la categoria Preferenze è autorizzata.",
        },

        {
          name:
            "Sessione Supabase Auth · area amministrativa",

          type:
            "Storage tecnico di autenticazione",

          category:
            "Necessario per gli amministratori",

          duration:
            "Fino al logout, alla revoca o alla scadenza della sessione",

          purpose:
            "Mantiene la sessione autenticata degli amministratori autorizzati e consente l'accesso all'area di gestione degli eventi.",
        },
      ],

      sections: [
        {
          title:
            "1. Tecnologie necessarie",

          paragraphs: [
            "Le tecnologie necessarie permettono di conservare la scelta privacy e, per gli utenti amministratori, di mantenere una sessione autenticata sicura nell'area riservata.",
            "Queste tecnologie non vengono utilizzate per finalità pubblicitarie o di profilazione.",
          ],
        },

        {
          title:
            "2. Tecnologie di preferenza",

          paragraphs: [
            "La categoria Preferenze consente di ricordare la lingua selezionata nelle visite successive.",
            "Se la categoria non viene autorizzata, la lingua può comunque essere cambiata durante la visita corrente ma non viene memorizzata come preferenza persistente.",
          ],
        },

        {
          title:
            "3. Analisi e marketing",

          paragraphs: [
            "Al momento il sito non utilizza tecnologie analitiche, pubblicitarie, di profilazione o remarketing.",
            "Se in futuro verranno introdotte tecnologie di questo tipo, la relativa configurazione e la presente informativa dovranno essere aggiornate prima della loro attivazione.",
          ],
        },

        {
          title:
            "4. Risorse e servizi esterni",

          paragraphs: [
            googleFonts.enabled
              ? "Nella configurazione attuale il sito effettua richieste a Google Fonts per caricare i caratteri tipografici. Tale servizio non viene utilizzato dal sito per finalità pubblicitarie o analitiche, ma comporta comunque una connessione tecnica al fornitore."
              : "I caratteri tipografici utilizzati dal sito sono ospitati localmente.",
            "I semplici collegamenti a social network, mappe, WhatsApp, prenotazioni, locandine o altri siti esterni diventano attivi soltanto quando l'utente decide di selezionarli.",
          ],
        },

        {
          title:
            "5. Modifica o revoca delle scelte",

          paragraphs: [
            "Le preferenze possono essere modificate in qualsiasi momento attraverso il collegamento “Preferenze cookie” presente nel footer.",
            "La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della modifica.",
          ],
        },

        {
          title:
            "6. Impostazioni del browser",

          paragraphs: [
            "L'utente può cancellare cookie e dati locali attraverso le impostazioni del proprio browser.",
            "La cancellazione del local storage utilizzato per registrare la scelta privacy comporterà la nuova visualizzazione del pannello relativo alle preferenze.",
          ],
        },
      ],
    },
  };
}

function getEnglishContent() {
  const {
    controller,
    hosting,
    supabase,
    googleFonts,
  } = LEGAL_CONFIG;

  const supabaseParagraph =
    supabase.enabled
      ? `Event management and publishing use Supabase. The primary project is configured in ${supabase.region.en} (${supabase.regionCode}). Requests required to load public events reach the Supabase infrastructure and may involve the processing of technical connection data such as IP address, request date and time and browser information. The administration area also uses Supabase Auth and may process administrator email addresses, user identifiers, authentication information and technical or security logs.`
      : "";

  const hostingParagraph =
    `The website is hosted and delivered through ${hosting.provider}, which provides hosting, CDN and traffic protection and may process technical data required to deliver and secure the website, including IP address, request date and time, requested resource and client information.`;

  const googleFontsParagraph =
    googleFonts.enabled
      ? "In the current technical configuration, the website fonts are requested through Google Fonts. Loading them establishes a connection with the provider's servers and transmits the technical data required for the request. Local font hosting will also be considered before final publication."
      : "The fonts used by the website are hosted locally and do not require connections to external services for loading.";

  return {
    privacy: {
      intro:
        "This notice describes the processing of personal data carried out through the Regina Caffè website.",

      sections: [
        {
          title:
            "1. Data controller",

          paragraphs: [
            `Controller: ${controller.name}.`,
            `Registered office: ${controller.registeredOffice}.`,
            `VAT number: ${controller.vatNumber}.`,
            `Privacy contact: ${controller.privacyEmail}.`,
            `Certified email (PEC): ${controller.pec}.`,
          ],
        },

        {
          title:
            "2. Personal data processed",

          paragraphs: [
            "The following categories of data may be processed in connection with use of the website:",
          ],

          bullets: [
            "technical and browsing data such as IP address, request date and time, browser, device, requested page or resource and technical or security logs;",
            "language preferences and preferences concerning cookies, local storage or similar technologies;",
            "technical data required to retrieve public events through the Supabase infrastructure;",
            "email address, user identifier and technical information relating to authorised administration accounts;",
            "telephone number, name, message content and communication metadata when a user voluntarily contacts the venue by telephone, WhatsApp or another channel displayed on the website;",
            "data provided to third-party services when a user voluntarily selects social, map, booking, poster or other external event links.",
          ],
        },

        {
          title:
            "3. Purposes and legal bases",

          bullets: [
            "providing, operating and protecting the website and its technical infrastructure, based on the controller's legitimate interest in operating and securing the service;",
            "displaying and maintaining the venue's published events;",
            "remembering the selected language when the user authorises the relevant preference category;",
            "managing authentication, authorisation and security of the administration area;",
            "responding to enquiries, availability or booking requests voluntarily submitted by the user;",
            "complying with applicable legal, accounting or administrative obligations.",
          ],
        },

        {
          title:
            "4. Hosting and technical infrastructure",

          paragraphs: [
            hostingParagraph,
            supabaseParagraph,
            googleFontsParagraph,
          ].filter(Boolean),
        },

        {
          title:
            "5. External links and platforms",

          paragraphs: [
            "The website contains links to external services including Instagram, Facebook, TikTok, WhatsApp and Google Maps and may include third-party links associated with individual events, for example social posts, booking pages or online posters.",
            "Those external contents are not directly embedded in the website. When the user voluntarily selects a link, the user is transferred to the relevant third-party service, which applies its own privacy notice and terms of use.",
          ],
        },

        {
          title:
            "6. Recipients",

          paragraphs: [
            "Data may be processed, to the extent required for their activities, by infrastructure, hosting, CDN/DNS, backend, authentication and technical maintenance providers and by persons authorised by the controller.",
            "Supabase is used as the backend infrastructure provider for event management and administrator authentication.",
            googleFonts.enabled
              ? "In the current configuration, Google Fonts is used to load the website's fonts."
              : null,
            "Where required by law, data may also be disclosed to the competent public authorities.",
          ].filter(Boolean),
        },

        {
          title:
            "7. International transfers",

          paragraphs: [
            `The primary Supabase project is configured in ${supabase.region.en} (${supabase.regionCode}).`,
            "The use of international providers or their subprocessors may nevertheless involve processing or transfers outside the European Economic Area. Before final publication, the controller must verify the applicable agreements, any adequacy decisions and the other safeguards required by applicable data protection law.",
          ],
        },

        {
          title:
            "8. Retention",

          bullets: [
            "the privacy preference choice is stored for six months unless withdrawn earlier;",
            "the selected language is remembered until withdrawal or expiry of the privacy choice when the Preferences category is authorised;",
            "administrator sessions are maintained according to the authentication system's duration and configuration and may be terminated by logout, expiry or revocation;",
            "administrator accounts are retained for as long as access remains authorised and may be disabled when no longer required;",
            "technical and security logs are retained according to the settings and terms applicable to the relevant providers;",
            "communication data are retained for the period necessary to deal with the relevant request and for any additional period required by law.",
          ],
        },

        {
          title:
            "9. Data subject rights",

          paragraphs: [
            "Where provided by applicable law, data subjects may request access, rectification, erasure, restriction, portability and objection to processing.",
            "Where processing is based on consent, consent may be withdrawn at any time without affecting the lawfulness of processing carried out before withdrawal.",
            `Requests may be sent to ${controller.privacyEmail}. Data subjects may also lodge a complaint with the competent data protection authority.`,
          ],
        },

        {
          title:
            "10. Children",

          paragraphs: [
            "The website is not designed to intentionally collect children's personal data through public forms or public registration systems.",
          ],
        },

        {
          title:
            "11. Security",

          paragraphs: [
            "Access to the administration area is restricted to authorised accounts. Application-level controls and database-level authorisation rules are used to restrict access to and modification of data.",
            "No information system can, however, guarantee absolute security.",
          ],
        },

        {
          title:
            "12. Changes to this notice",

          paragraphs: [
            "This notice may be updated following legal, technical or organisational changes or when new providers or services are introduced.",
            "The relevant notice displays its version number and last updated date.",
          ],
        },
      ],
    },

    cookies: {
      intro:
        "This Cookie Policy describes cookies, local storage and similar technologies used by the website.",

      technologies: [
        {
          name:
            "regina-cookie-consent",

          type:
            "Necessary Local Storage",

          category:
            "Necessary",

          duration:
            "6 months",

          purpose:
            "Stores the choice made through the privacy panel and prevents the choice from being requested again before expiry.",
        },

        {
          name:
            "regina-language",

          type:
            "Preference Local Storage",

          category:
            "Preferences",

          duration:
            "Up to 6 months or until withdrawal",

          purpose:
            "Remembers the language selected by the user. It is used only when the Preferences category has been authorised.",
        },

        {
          name:
            "Supabase Auth session · administration area",

          type:
            "Technical authentication storage",

          category:
            "Necessary for administrators",

          duration:
            "Until logout, revocation or session expiry",

          purpose:
            "Maintains an authenticated session for authorised administrators and enables access to event management functions.",
        },
      ],

      sections: [
        {
          title:
            "1. Necessary technologies",

          paragraphs: [
            "Necessary technologies allow the website to remember the privacy choice and, for administrator users, maintain a secure authenticated session in the restricted administration area.",
            "These technologies are not used for advertising or profiling.",
          ],
        },

        {
          title:
            "2. Preference technologies",

          paragraphs: [
            "The Preferences category allows the selected language to be remembered on future visits.",
            "If this category is not authorised, the language may still be changed during the current visit but will not be stored as a persistent preference.",
          ],
        },

        {
          title:
            "3. Analytics and marketing",

          paragraphs: [
            "The website currently does not use analytics, advertising, profiling or remarketing technologies.",
            "If technologies of this kind are introduced in the future, the relevant configuration and this notice must be updated before they are activated.",
          ],
        },

        {
          title:
            "4. External resources and services",

          paragraphs: [
            googleFonts.enabled
              ? "In the current configuration, the website requests fonts from Google Fonts. The website does not use this service for advertising or analytics purposes, but loading the fonts nevertheless establishes a technical connection with the provider."
              : "The fonts used by the website are hosted locally.",
            "Simple links to social networks, maps, WhatsApp, booking services, posters or other external websites become active only when the user voluntarily selects them.",
          ],
        },

        {
          title:
            "5. Changing or withdrawing choices",

          paragraphs: [
            "Preferences may be changed at any time through the “Cookie preferences” link in the footer.",
            "Withdrawal does not affect the lawfulness of processing carried out before the change.",
          ],
        },

        {
          title:
            "6. Browser settings",

          paragraphs: [
            "Users may delete cookies and locally stored data through their browser settings.",
            "Deleting the local storage used to record the privacy choice will cause the privacy preference panel to appear again.",
          ],
        },
      ],
    },
  };
}

function getFrenchContent() {
  const {
    controller,
    hosting,
    supabase,
    googleFonts,
  } = LEGAL_CONFIG;

  const supabaseParagraph =
    supabase.enabled
      ? `La gestion et la publication des événements reposent sur Supabase. Le projet principal est configuré dans la région ${supabase.region.fr} (${supabase.regionCode}). Les requêtes nécessaires au chargement des événements publics atteignent l'infrastructure Supabase et peuvent impliquer le traitement de données techniques de connexion, telles que l'adresse IP, la date et l'heure de la requête et les informations techniques du navigateur. L'espace d'administration utilise en outre Supabase Auth et peut traiter les adresses e-mail des administrateurs, les identifiants utilisateur, les informations d'authentification et les journaux techniques ou de sécurité.`
      : "";

  const hostingParagraph =
    `Le site est hébergé et diffusé par ${hosting.provider}, qui fournit l'hébergement, le réseau CDN et la protection du trafic et peut traiter les données techniques nécessaires à la diffusion et à la sécurité du site, y compris l'adresse IP, la date et l'heure de la requête, la ressource demandée et les informations techniques du client.`;

  const googleFontsParagraph =
    googleFonts.enabled
      ? "Dans la configuration technique actuelle, les polices de caractères du site sont chargées via Google Fonts. Ce chargement implique une connexion aux serveurs du fournisseur et la transmission des données techniques nécessaires à la requête. Avant la publication définitive, la possibilité d'héberger les polices localement sera également évaluée."
      : "Les polices de caractères utilisées par le site sont hébergées localement et ne nécessitent aucune connexion à des services externes pour leur chargement.";

  return {
    privacy: {
      intro:
        "La présente politique décrit le traitement des données personnelles effectué par l'intermédiaire du site de Regina Caffè.",

      sections: [
        {
          title:
            "1. Responsable du traitement",

          paragraphs: [
            `Responsable du traitement : ${controller.name}.`,
            `Siège social : ${controller.registeredOffice}.`,
            `Numéro de TVA : ${controller.vatNumber}.`,
            `Contact protection des données : ${controller.privacyEmail}.`,
            `E-mail certifiée (PEC) : ${controller.pec}.`,
          ],
        },

        {
          title:
            "2. Données personnelles traitées",

          paragraphs: [
            "Dans le cadre de l'utilisation du site, les catégories de données suivantes peuvent être traitées :",
          ],

          bullets: [
            "données techniques et de navigation, telles que l'adresse IP, la date et l'heure de la requête, le navigateur, l'appareil, la page ou la ressource demandée et les journaux techniques ou de sécurité ;",
            "préférence linguistique et préférences relatives aux cookies, au local storage ou aux technologies analogues ;",
            "données techniques nécessaires au chargement des événements publics via l'infrastructure Supabase ;",
            "adresse e-mail, identifiant utilisateur et informations techniques relatives aux administrateurs de l'espace réservé ;",
            "numéro de téléphone, nom, contenu et métadonnées des communications lorsque l'utilisateur contacte volontairement l'établissement par téléphone, WhatsApp ou les autres canaux indiqués sur le site ;",
            "données éventuellement communiquées aux plateformes externes lorsque l'utilisateur sélectionne volontairement des liens vers les réseaux sociaux, les cartes, les réservations, les affiches ou d'autres liens associés aux événements.",
          ],
        },

        {
          title:
            "3. Finalités et bases juridiques",

          bullets: [
            "fournir, maintenir opérationnels et protéger le site et son infrastructure technique, sur la base de l'intérêt légitime du responsable du traitement à la sécurité et au fonctionnement du service ;",
            "afficher et mettre à jour les événements publiés par l'établissement ;",
            "mémoriser la préférence linguistique lorsque l'utilisateur autorise la catégorie de préférence correspondante ;",
            "gérer l'authentification, les autorisations et la sécurité de l'espace d'administration ;",
            "répondre aux demandes d'informations, de disponibilité ou de réservation effectuées volontairement par l'utilisateur ;",
            "respecter les obligations légales, comptables ou administratives éventuellement applicables.",
          ],
        },

        {
          title:
            "4. Hébergement et infrastructure technique",

          paragraphs: [
            hostingParagraph,
            supabaseParagraph,
            googleFontsParagraph,
          ].filter(Boolean),
        },

        {
          title:
            "5. Liens et plateformes externes",

          paragraphs: [
            "Le site contient des liens vers des services externes tels qu'Instagram, Facebook, TikTok, WhatsApp et Google Maps, et peut contenir des liens externes associés à chaque événement, par exemple vers des réseaux sociaux, des pages de réservation ou des affiches en ligne.",
            "Ces contenus ne sont pas intégrés directement dans le site. Lorsque l'utilisateur sélectionne volontairement un lien, il est redirigé vers le service externe correspondant, qui applique sa propre politique de confidentialité et ses propres conditions d'utilisation.",
          ],
        },

        {
          title:
            "6. Destinataires des données",

          paragraphs: [
            "Les données peuvent être traitées, dans la limite de ce qui est nécessaire à leurs activités respectives, par des fournisseurs d'infrastructure, d'hébergement, de CDN/DNS, de backend, d'authentification et de maintenance technique, ainsi que par les personnes autorisées par le responsable du traitement.",
            "Supabase est utilisé en tant que fournisseur de l'infrastructure backend pour la gestion des événements et l'authentification des administrateurs.",
            googleFonts.enabled
              ? "Dans la configuration actuelle, Google Fonts est utilisé pour le chargement des polices de caractères."
              : null,
            "Lorsque la loi l'exige, les données peuvent également être communiquées aux autorités compétentes.",
          ].filter(Boolean),
        },

        {
          title:
            "7. Transferts internationaux",

          paragraphs: [
            `Le projet principal Supabase est configuré dans la région ${supabase.region.fr} (${supabase.regionCode}).`,
            "Le recours à des fournisseurs internationaux ou à leurs sous-traitants peut néanmoins entraîner des traitements ou des transferts de données en dehors de l'Espace économique européen. Avant la publication définitive, le responsable du traitement devra vérifier les accords applicables, les éventuelles décisions d'adéquation et les autres garanties prévues par la réglementation.",
          ],
        },

        {
          title:
            "8. Conservation",

          bullets: [
            "le choix relatif aux préférences de confidentialité est conservé pendant six mois, sauf révocation anticipée ;",
            "la langue sélectionnée est mémorisée jusqu'à la révocation ou à l'expiration du choix de confidentialité lorsque la catégorie Préférences est autorisée ;",
            "les sessions des administrateurs sont maintenues selon la durée et les paramètres prévus par le système d'authentification et peuvent être interrompues par déconnexion ou révocation ;",
            "les comptes des administrateurs sont conservés pendant la période durant laquelle l'accès est autorisé et peuvent être désactivés lorsqu'ils ne sont plus nécessaires ;",
            "les journaux techniques et de sécurité sont conservés selon les paramètres et les délais applicables aux fournisseurs utilisés ;",
            "les données des communications sont conservées pendant la durée nécessaire au traitement de la demande concernée et pendant les périodes supplémentaires éventuellement requises par la loi.",
          ],
        },

        {
          title:
            "9. Droits de la personne concernée",

          paragraphs: [
            "Dans les cas prévus par la réglementation, la personne concernée peut demander l'accès, la rectification, l'effacement, la limitation, la portabilité et s'opposer au traitement.",
            "Lorsque le traitement est fondé sur le consentement, celui-ci peut être retiré à tout moment sans porter atteinte à la licéité du traitement effectué avant le retrait.",
            `Les demandes peuvent être adressées à ${controller.privacyEmail}. Il est également possible d'introduire une réclamation auprès de l'autorité italienne de protection des données personnelles (Garante per la protezione dei dati personali).`,
          ],
        },

        {
          title:
            "10. Mineurs",

          paragraphs: [
            "Le site n'est pas conçu pour collecter intentionnellement des données personnelles de mineurs au moyen de formulaires ou de systèmes d'inscription publique.",
          ],
        },

        {
          title:
            "11. Sécurité",

          paragraphs: [
            "L'accès à l'espace d'administration est réservé aux comptes autorisés. Le système utilise des contrôles applicatifs et des règles d'autorisation au niveau de la base de données afin de limiter l'accès aux données et leur modification.",
            "Aucun système informatique ne peut toutefois garantir un niveau de sécurité absolu.",
          ],
        },

        {
          title:
            "12. Modifications de la présente politique",

          paragraphs: [
            "La présente politique peut être mise à jour à la suite de modifications réglementaires, techniques ou organisationnelles, ou de l'introduction de nouveaux fournisseurs et services.",
            "La version et la date de dernière mise à jour sont indiquées dans la fenêtre d'information correspondante.",
          ],
        },
      ],
    },

    cookies: {
      intro:
        "La présente politique en matière de cookies décrit les cookies, le local storage et les technologies analogues utilisés par le site.",

      technologies: [
        {
          name:
            "regina-cookie-consent",

          type:
            "Local storage technique",

          category:
            "Nécessaire",

          duration:
            "6 mois",

          purpose:
            "Mémorise le choix exprimé dans le panneau de confidentialité et évite qu'il soit demandé à nouveau avant son expiration.",
        },

        {
          name:
            "regina-language",

          type:
            "Local storage de préférence",

          category:
            "Préférences",

          duration:
            "Jusqu'à 6 mois ou jusqu'à la révocation",

          purpose:
            "Mémorise la langue sélectionnée par l'utilisateur. Il n'est utilisé que lorsque la catégorie Préférences est autorisée.",
        },

        {
          name:
            "Session Supabase Auth · espace d'administration",

          type:
            "Storage technique d'authentification",

          category:
            "Nécessaire pour les administrateurs",

          duration:
            "Jusqu'à la déconnexion, à la révocation ou à l'expiration de la session",

          purpose:
            "Maintient la session authentifiée des administrateurs autorisés et permet l'accès à l'espace de gestion des événements.",
        },
      ],

      sections: [
        {
          title:
            "1. Technologies nécessaires",

          paragraphs: [
            "Les technologies nécessaires permettent de conserver le choix de confidentialité et, pour les utilisateurs administrateurs, de maintenir une session authentifiée sécurisée dans l'espace réservé.",
            "Ces technologies ne sont pas utilisées à des fins publicitaires ou de profilage.",
          ],
        },

        {
          title:
            "2. Technologies de préférence",

          paragraphs: [
            "La catégorie Préférences permet de mémoriser la langue sélectionnée lors des visites suivantes.",
            "Si la catégorie n'est pas autorisée, la langue peut néanmoins être modifiée pendant la visite en cours, mais elle n'est pas enregistrée comme préférence persistante.",
          ],
        },

        {
          title:
            "3. Analyse et marketing",

          paragraphs: [
            "À ce jour, le site n'utilise aucune technologie d'analyse, de publicité, de profilage ou de remarketing.",
            "Si de telles technologies venaient à être introduites à l'avenir, leur configuration et la présente politique devront être mises à jour avant leur activation.",
          ],
        },

        {
          title:
            "4. Ressources et services externes",

          paragraphs: [
            googleFonts.enabled
              ? "Dans la configuration actuelle, le site effectue des requêtes vers Google Fonts pour charger les polices de caractères. Ce service n'est pas utilisé par le site à des fins publicitaires ou analytiques, mais il implique néanmoins une connexion technique au fournisseur."
              : "Les polices de caractères utilisées par le site sont hébergées localement.",
            "Les simples liens vers les réseaux sociaux, les cartes, WhatsApp, les réservations, les affiches ou d'autres sites externes ne deviennent actifs que lorsque l'utilisateur décide de les sélectionner.",
          ],
        },

        {
          title:
            "5. Modification ou révocation des choix",

          paragraphs: [
            "Les préférences peuvent être modifiées à tout moment via le lien « Préférences cookies » présent dans le pied de page.",
            "Le retrait du consentement ne porte pas atteinte à la licéité du traitement effectué avant la modification.",
          ],
        },

        {
          title:
            "6. Paramètres du navigateur",

          paragraphs: [
            "L'utilisateur peut supprimer les cookies et les données locales via les paramètres de son navigateur.",
            "La suppression du local storage utilisé pour enregistrer le choix de confidentialité entraînera un nouvel affichage du panneau relatif aux préférences.",
          ],
        },
      ],
    },
  };
}

/*
 * =======================================================
 * SELEZIONE DELLA LINGUA
 * =======================================================
 *
 * L'italiano resta il testo di riferimento
 * e viene usato come fallback per qualsiasi
 * lingua non ancora tradotta.
 */
const LEGAL_CONTENT_BY_LANGUAGE = {
  it: getItalianContent,
  en: getEnglishContent,
  fr: getFrenchContent,
};

export function getLegalContent(
  language
) {
  const getContent =
    LEGAL_CONTENT_BY_LANGUAGE[
      language
    ] ??
    LEGAL_CONTENT_BY_LANGUAGE.it;

  return getContent();
}