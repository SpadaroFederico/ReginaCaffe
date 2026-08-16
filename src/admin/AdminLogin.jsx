import { useState } from "react";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { requireSupabase } from "../lib/supabase";
import {
  getAdminUrl,
  getPublicHomeUrl,
} from "./admin-utils";

function normalizeEmail(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function Field({
  label,
  icon: Icon,
  ...props
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#635B4E]">
        {label}
      </span>

      <span className="flex items-center gap-3 rounded-[12px] border border-[#CDBF9F] bg-[#F8F4EA] px-4 transition-colors focus-within:border-[#AD9060]">
        <Icon
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[#AD9060]"
          strokeWidth={1.5}
        />

        <input
          {...props}
          className="min-h-[48px] min-w-0 flex-1 border-0 bg-transparent font-sans text-[14px] text-[#2F2A21] outline-none placeholder:text-[#8C8170]"
        />
      </span>
    </label>
  );
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const resetFeedback = () => {
    setMessage("");
    setErrorMessage("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (message || errorMessage) {
      resetFeedback();
    }
  };

  const handlePasswordChange = (
    event
  ) => {
    setPassword(event.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    resetFeedback();

    const normalizedEmail =
      normalizeEmail(email);

    if (!normalizedEmail || !password) {
      setErrorMessage(
        "Inserisci email e password."
      );

      return;
    }

    setLoading(true);

    try {
      const client =
        requireSupabase();

      const { error } =
        await client.auth.signInWithPassword(
          {
            email: normalizedEmail,
            password,
          }
        );

      if (error) {
        throw error;
      }

      /*
       * Non serve effettuare redirect
       * manualmente.
       *
       * AdminApp ascolterà il cambio
       * di sessione e mostrerà
       * automaticamente l'area protetta.
       */
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      /*
       * Messaggio volutamente generico:
       * non confermiamo se una specifica
       * email amministratore esiste.
       */
      setErrorMessage(
        "Accesso non riuscito. Verifica le credenziali e riprova."
      );

      /*
       * Non lasciamo la password nel
       * form dopo un tentativo fallito.
       */
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset =
    async () => {
      if (loading) {
        return;
      }

      resetFeedback();

      const normalizedEmail =
        normalizeEmail(email);

      if (!normalizedEmail) {
        setErrorMessage(
          "Inserisci prima l'email amministratore."
        );

        return;
      }

      setLoading(true);

      try {
        const client =
          requireSupabase();

        const { error } =
          await client.auth.resetPasswordForEmail(
            normalizedEmail,
            {
              redirectTo:
                getAdminUrl(),
            }
          );

        if (error) {
          throw error;
        }

        /*
         * Messaggio generico per evitare
         * di rivelare se l'indirizzo
         * appartiene realmente a un admin.
         */
        setMessage(
          "Se l'indirizzo è associato a un account amministratore, riceverai un'email con le istruzioni per reimpostare la password."
        );

        setPassword("");
      } catch (error) {
        console.error(
          "Admin password reset error:",
          error
        );

        setErrorMessage(
          "Non è stato possibile completare la richiesta di recupero. Riprova tra qualche minuto."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-[#F2F1EC] px-4 py-8 text-[#2F2A21] sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[520px]">
        <a
          href={getPublicHomeUrl()}
          className="inline-flex items-center gap-2 font-sans text-[12px] text-[#635B4E] no-underline transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F2F1EC]"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.4}
          />

          Torna al sito
        </a>

        <section className="mt-8 rounded-[24px] border border-[#CDBF9F] bg-[#F3EDDE] p-5 shadow-[0_20px_70px_rgba(47,42,33,0.07)] sm:p-8">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#7C644A]">
            Regina Caffè
          </p>

          <h1 className="mt-4 font-serif text-[42px] font-normal leading-[0.9] sm:text-[50px]">
            Area{" "}
            <span className="italic text-[#635B4E]">
              amministratore
            </span>
          </h1>

          <p className="mt-5 max-w-[390px] font-sans text-[13px] leading-[1.6] text-[#635B4E]">
            Gestisci le serate pubblicate
            sul sito. L'accesso è consentito
            esclusivamente agli
            amministratori autorizzati.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <Field
              label="Email"
              icon={Mail}
              type="email"
              inputMode="email"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={email}
              onChange={handleEmailChange}
              placeholder="nome@dominio.it"
              disabled={loading}
              required
            />

            <Field
              label="Password"
              icon={LockKeyhole}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={
                handlePasswordChange
              }
              placeholder="Password"
              disabled={loading}
              required
            />

            {errorMessage && (
              <p
                role="alert"
                className="rounded-[10px] border border-[#A95454]/30 bg-[#A95454]/5 px-4 py-3 font-sans text-[12px] leading-[1.5] text-[#7A3434]"
              >
                {errorMessage}
              </p>
            )}

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-[10px] border border-[#7C644A]/25 bg-[#7C644A]/5 px-4 py-3 font-sans text-[12px] leading-[1.5] text-[#635B4E]"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border-0 bg-[#2F2A21] px-5 font-serif text-[19px] text-[#F3EEE5] transition-[opacity,transform] hover:-translate-y-[1px] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3EDDE] disabled:cursor-wait disabled:transform-none disabled:opacity-50"
            >
              {loading
                ? "Accesso in corso..."
                : "Accedi"}
            </button>
          </form>

          <button
            type="button"
            disabled={loading}
            onClick={
              handlePasswordReset
            }
            className="mt-5 border-0 bg-transparent p-0 font-sans text-[11px] text-[#635B4E] underline decoration-[#B9A37A] underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD9060] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3EDDE] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Password dimenticata?
          </button>
        </section>
      </div>
    </main>
  );
}