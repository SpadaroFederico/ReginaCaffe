export const LEGAL_CONFIG = {
  /*
   * Rimane true finché non abbiamo:
   *
   * - ragione sociale definitiva
   * - sede legale
   * - P. IVA del titolare confermata
   * - email/PEC privacy
   * - dominio definitivo
   * - hosting/CDN definitivo
   *
   * Prima della pubblicazione questo valore
   * dovrà diventare false.
   */
  isDraft: true,

  policyVersion: "0.2",

  lastUpdated: {
    it: "16 agosto 2026",
    en: "16 August 2026",
  },

  controller: {
    name:
      "[RAGIONE SOCIALE DEL GESTORE]",

    registeredOffice:
      "[SEDE LEGALE]",

    /*
     * Non inseriamo una P. IVA non ancora
     * confermata come appartenente al
     * titolare effettivo di Regina Caffè.
     */
    vatNumber:
      "[P. IVA DEL TITOLARE]",

    privacyEmail:
      "[EMAIL O PEC PRIVACY]",
  },

  websiteUrl:
    "[URL DEFINITIVO DEL SITO]",

  hosting: {
    /*
     * Li compileremo quando avremo deciso
     * dove risiederanno realmente i file.
     *
     * Possibili esempi futuri:
     *
     * frontendProvider: "Aruba"
     * cdnDnsProvider: "Cloudflare"
     *
     * oppure Cloudflare anche come hosting.
     */
    frontendProvider:
      "[HOSTING FRONTEND DA DEFINIRE]",

    cdnDnsProvider:
      "[CDN / DNS DA DEFINIRE]",
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
    },
  },

  /*
   * Attualmente index.html carica
   * Instrument Serif e Work Sans tramite
   * Google Fonts.
   *
   * Se prima della produzione porteremo
   * i font in locale, imposteremo false.
   */
  googleFonts: {
    enabled: true,
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
    LEGAL_CONFIG.isDraft
      ? `Il sito non è ancora pubblicato nella configurazione definitiva. Prima della messa online saranno indicati il fornitore effettivo dell'hosting frontend e gli eventuali servizi CDN/DNS utilizzati. Configurazione attualmente da completare: ${hosting.frontendProvider}; ${hosting.cdnDnsProvider}.`
      : `Il frontend del sito è ospitato tramite ${hosting.frontendProvider}. I servizi CDN e/o DNS sono forniti tramite ${hosting.cdnDnsProvider}. Tali fornitori possono trattare dati tecnici necessari alla consegna e alla sicurezza del sito, inclusi indirizzo IP, data e ora della richiesta, risorsa richiesta e informazioni tecniche del client.`;

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
    LEGAL_CONFIG.isDraft
      ? `The website has not yet been published using its final production configuration. Before launch, the actual frontend hosting provider and any CDN/DNS services will be specified. Configuration still to be completed: ${hosting.frontendProvider}; ${hosting.cdnDnsProvider}.`
      : `The website frontend is hosted through ${hosting.frontendProvider}. CDN and/or DNS services are provided through ${hosting.cdnDnsProvider}. These providers may process technical data required to deliver and secure the website, including IP address, request date and time, requested resource and client information.`;

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

export function getLegalContent(
  language
) {
  return language === "en"
    ? getEnglishContent()
    : getItalianContent();
}