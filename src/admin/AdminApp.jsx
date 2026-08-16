import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  KeyRound,
  ShieldAlert,
} from "lucide-react";

import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

import {
  isSupabaseConfigured,
  requireSupabase,
} from "../lib/supabase";

import {
  getAdminPath,
} from "./admin-utils";

const ADMIN_RECHECK_INTERVAL =
  5 * 60 * 1000;

const MIN_NEW_PASSWORD_LENGTH = 12;

/*
 * =========================================================
 * SCHERMATA DI CARICAMENTO
 * =========================================================
 */

function LoadingScreen({
  label = "Verifica accesso",
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F1EC] px-4 text-[#2F2A21]">
      <div className="text-center">
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border border-[#CDBF9F] border-t-[#2F2A21]" />

        <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.18em] text-[#635B4E]">
          {label}
        </p>
      </div>
    </main>
  );
}

/*
 * =========================================================
 * ERRORE CONFIGURAZIONE
 * =========================================================
 */

function ConfigurationError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F1EC] px-4 text-[#2F2A21]">
      <div className="w-full max-w-[520px] rounded-[20px] border border-[#CDBF9F] bg-[#F3EDDE] p-6 sm:p-8">
        <ShieldAlert
          className="h-7 w-7 text-[#AD9060]"
          strokeWidth={1.4}
        />

        <h1 className="mt-5 font-serif text-[36px] leading-none">
          Supabase non configurato
        </h1>

        <p className="mt-3 font-sans text-[12px] leading-[1.6] text-[#635B4E]">
          Controlla che il file .env.local
          contenga VITE_SUPABASE_URL e
          VITE_SUPABASE_PUBLISHABLE_KEY,
          quindi riavvia Vite.
        </p>
      </div>
    </main>
  );
}

/*
 * =========================================================
 * ACCESSO NEGATO
 * =========================================================
 */

function AccessDenied({
  onLogout,
}) {
  const [loading, setLoading] =
    useState(false);

  const handleLogout = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await onLogout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F1EC] px-4 text-[#2F2A21]">
      <div className="w-full max-w-[520px] rounded-[20px] border border-[#CDBF9F] bg-[#F3EDDE] p-6 sm:p-8">
        <ShieldAlert
          className="h-7 w-7 text-[#AD9060]"
          strokeWidth={1.4}
        />

        <h1 className="mt-5 font-serif text-[38px] leading-none">
          Accesso non autorizzato
        </h1>

        <p className="mt-4 font-sans text-[12px] leading-[1.6] text-[#635B4E]">
          L'account è autenticato ma non
          risulta attualmente abilitato come
          amministratore di Regina Caffè.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="mt-6 min-h-[42px] rounded-full border-0 bg-[#2F2A21] px-5 font-sans text-[11px] text-[#F3EEE5] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3EDDE] disabled:cursor-wait disabled:opacity-50"
        >
          {loading
            ? "Uscita..."
            : "Esci dall'account"}
        </button>
      </div>
    </main>
  );
}

/*
 * =========================================================
 * RECUPERO PASSWORD
 * =========================================================
 */

function PasswordRecovery() {
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setErrorMessage("");

    if (
      password.length <
      MIN_NEW_PASSWORD_LENGTH
    ) {
      setErrorMessage(
        `La nuova password deve contenere almeno ${MIN_NEW_PASSWORD_LENGTH} caratteri.`
      );

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "Le due password non coincidono."
      );

      return;
    }

    setLoading(true);

    try {
      const client =
        requireSupabase();

      const { error } =
        await client.auth.updateUser({
          password,
        });

      if (error) {
        throw error;
      }

      /*
       * Dopo un recupero password
       * chiudiamo tutte le sessioni
       * dell'account.
       *
       * È utile se la vecchia password
       * fosse stata compromessa.
       */
      const {
        error: globalLogoutError,
      } = await client.auth.signOut({
        scope: "global",
      });

      if (globalLogoutError) {
        console.warn(
          "Logout globale dopo cambio password non riuscito:",
          globalLogoutError
        );

        /*
         * Fallback:
         * eliminiamo almeno la sessione
         * corrente dal browser.
         */
        await client.auth.signOut({
          scope: "local",
        });
      }

      /*
       * Ripulisce eventuali parametri
       * del link di recupero dall'URL.
       */
      window.history.replaceState(
        {},
        "",
        getAdminPath()
      );
    } catch (error) {
      console.error(
        "Update password error:",
        error
      );

      setErrorMessage(
        "Non è stato possibile aggiornare la password. Il link potrebbe essere scaduto oppure non più valido."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F1EC] px-4 py-8 text-[#2F2A21]">
      <form
        onSubmit={submit}
        className="w-full max-w-[520px] rounded-[20px] border border-[#CDBF9F] bg-[#F3EDDE] p-6 shadow-[0_20px_70px_rgba(47,42,33,0.07)] sm:p-8"
      >
        <KeyRound
          aria-hidden="true"
          className="h-7 w-7 text-[#AD9060]"
          strokeWidth={1.4}
        />

        <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.24em] text-[#7C644A]">
          Recupero account
        </p>

        <h1 className="mt-3 font-serif text-[40px] leading-none">
          Nuova password
        </h1>

        <p className="mt-4 font-sans text-[12px] leading-[1.6] text-[#635B4E]">
          Imposta una nuova password
          amministratore di almeno{" "}
          {MIN_NEW_PASSWORD_LENGTH} caratteri.
          Al termine verranno chiuse le
          sessioni attive e dovrai accedere
          nuovamente.
        </p>

        <div className="mt-6 space-y-4">
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => {
              setPassword(
                event.target.value
              );

              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder="Nuova password"
            minLength={
              MIN_NEW_PASSWORD_LENGTH
            }
            disabled={loading}
            required
            autoFocus
            className="min-h-[48px] w-full rounded-[10px] border border-[#CDBF9F] bg-[#FAF6ED] px-4 font-sans text-[13px] outline-none transition-colors focus:border-[#AD9060] disabled:opacity-60"
          />

          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(
                event.target.value
              );

              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder="Ripeti password"
            minLength={
              MIN_NEW_PASSWORD_LENGTH
            }
            disabled={loading}
            required
            className="min-h-[48px] w-full rounded-[10px] border border-[#CDBF9F] bg-[#FAF6ED] px-4 font-sans text-[13px] outline-none transition-colors focus:border-[#AD9060] disabled:opacity-60"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="mt-4 rounded-[10px] border border-[#A95454]/30 bg-[#A95454]/5 px-4 py-3 font-sans text-[12px] leading-[1.5] text-[#8C4545]"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="mt-6 min-h-[46px] w-full rounded-full border-0 bg-[#2F2A21] px-5 font-serif text-[18px] text-[#F3EEE5] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-40"
        >
          {loading
            ? "Salvataggio..."
            : "Salva nuova password"}
        </button>
      </form>
    </main>
  );
}

/*
 * =========================================================
 * APP ADMIN
 * =========================================================
 */

export default function AdminApp() {
  const [
    session,
    setSession,
  ] = useState(null);

  const [
    adminProfile,
    setAdminProfile,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    passwordRecovery,
    setPasswordRecovery,
  ] = useState(false);

  /*
   * Evita che una richiesta asincrona
   * vecchia sovrascriva uno stato
   * più recente durante login/logout.
   */
  const verificationSequence =
    useRef(0);

  const verifyAdmin =
    useCallback(
      async (
        nextSession,
        {
          showLoading = false,
        } = {}
      ) => {
        const requestId =
          ++verificationSequence.current;

        if (showLoading) {
          setLoading(true);
        }

        if (!nextSession?.user) {
          setSession(null);
          setAdminProfile(null);
          setLoading(false);

          return;
        }

        setSession(nextSession);

        try {
          const client =
            requireSupabase();

          const {
            data,
            error,
          } = await client
            .from("admin_profiles")
            .select(
              "user_id, email"
            )
            .eq(
              "user_id",
              nextSession.user.id
            )
            .maybeSingle();

          if (error) {
            throw error;
          }

          /*
           * Ignora il risultato se nel
           * frattempo è partita una verifica
           * più recente.
           */
          if (
            requestId !==
            verificationSequence.current
          ) {
            return;
          }

          setAdminProfile(
            data ?? null
          );
        } catch (error) {
          console.error(
            "Admin verification error:",
            error
          );

          if (
            requestId ===
            verificationSequence.current
          ) {
            setAdminProfile(null);
          }
        } finally {
          if (
            requestId ===
            verificationSequence.current
          ) {
            setLoading(false);
          }
        }
      },
      []
    );

  /*
   * =======================================================
   * SESSIONE SUPABASE AUTH
   * =======================================================
   */

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);

      return undefined;
    }

    const client =
      requireSupabase();

    let mounted = true;

    const {
      data: { subscription },
    } =
      client.auth.onAuthStateChange(
        (
          event,
          nextSession
        ) => {
          if (!mounted) {
            return;
          }

          if (
            event ===
            "PASSWORD_RECOVERY"
          ) {
            setPasswordRecovery(
              true
            );
          }

          if (
            event === "SIGNED_OUT"
          ) {
            setPasswordRecovery(
              false
            );
          }

          /*
           * Le chiamate Supabase asincrone
           * vengono spostate fuori dal
           * callback Auth.
           */
          window.setTimeout(() => {
            if (!mounted) {
              return;
            }

            verifyAdmin(
              nextSession
            );
          }, 0);
        }
      );

    client.auth
      .getSession()
      .then(
        ({ data, error }) => {
          if (!mounted) {
            return;
          }

          if (error) {
            console.error(
              "Get session error:",
              error
            );

            setLoading(false);

            return;
          }

          verifyAdmin(
            data.session,
            {
              showLoading: true,
            }
          );
        }
      )
      .catch((error) => {
        if (!mounted) {
          return;
        }

        console.error(
          "Session initialization error:",
          error
        );

        setLoading(false);
      });

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, [verifyAdmin]);

  /*
   * =======================================================
   * RICONTROLLO PERIODICO DEI PERMESSI
   * =======================================================
   *
   * Le RLS rimangono la protezione reale.
   *
   * Questo controllo serve anche a
   * rimuovere rapidamente la dashboard
   * se un amministratore viene disabilitato
   * mentre la pagina è già aperta.
   */

  useEffect(() => {
    if (
      !session?.user ||
      !adminProfile
    ) {
      return undefined;
    }

    const revalidate = () => {
      verifyAdmin(session);
    };

    const handleFocus = () => {
      revalidate();
    };

    const handleVisibility =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          revalidate();
        }
      };

    const intervalId =
      window.setInterval(
        revalidate,
        ADMIN_RECHECK_INTERVAL
      );

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      window.clearInterval(
        intervalId
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [
    session,
    adminProfile,
    verifyAdmin,
  ]);

  /*
   * =======================================================
   * LOGOUT
   * =======================================================
   */

  const logout =
    useCallback(async () => {
      const client =
        requireSupabase();

      try {
        const { error } =
          await client.auth.signOut({
            scope: "local",
          });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(
          "Admin logout error:",
          error
        );

        try {
          await client.auth.signOut({
            scope: "local",
          });
        } catch {
          // Nessun altro intervento.
        }
      }
    }, []);

  /*
   * =======================================================
   * RENDER
   * =======================================================
   */

  if (!isSupabaseConfigured) {
    return (
      <ConfigurationError />
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return <AdminLogin />;
  }

  /*
   * Verifichiamo sempre l'autorizzazione
   * amministratore prima di montare
   * la dashboard.
   */
  if (!adminProfile) {
    return (
      <AccessDenied
        onLogout={logout}
      />
    );
  }

  /*
   * Il recupero password viene mostrato
   * soltanto a una sessione che appartiene
   * a un amministratore autorizzato.
   */
  if (passwordRecovery) {
    return <PasswordRecovery />;
  }

  return (
    <AdminDashboard
      user={session.user}
      onLogout={logout}
    />
  );
}