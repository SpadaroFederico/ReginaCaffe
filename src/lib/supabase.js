import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim();

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const isSupabaseConfigured =
  Boolean(
    supabaseUrl &&
      supabasePublishableKey
  );

export const supabase =
  isSupabaseConfigured
    ? createClient(
        supabaseUrl,
        supabasePublishableKey,
        {
          auth: {
            /*
             * Mantiene la sessione admin
             * anche dopo refresh o chiusura
             * e riapertura del browser.
             */
            persistSession: true,

            /*
             * Supabase rinnova
             * automaticamente il token
             * prima della scadenza.
             */
            autoRefreshToken: true,

            /*
             * Necessario per intercettare
             * correttamente i redirect Auth,
             * compreso il recupero password.
             */
            detectSessionInUrl: true,
          },
        }
      )
    : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase non configurato: controlla VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return supabase;
}