import {
  lazy,
  Suspense,
} from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import NavTabs from "./components/NavTabs";

import EventsSection from "./components/events/EventsSection";
import RecommendedSection from "./components/recommended/RecommendedSection";
import OpeningHoursSection from "./components/hours/OpeningHoursSection";
import BarSection from "./components/bar/BarSection";
import SocialSection from "./components/social/SocialSection";
import Footer from "./components/Footer";

import LegalCenter from "./components/legal/LegalCenter";

/*
 * Le sezioni che non servono alla home
 * vengono caricate solo quando richieste.
 *
 * In questo modo:
 *
 * /admin
 * → carica il codice amministrativo
 *
 * /menu
 * → carica il codice della pagina menu
 *
 * /
 * → non scarica nessuno dei due.
 */
const AdminApp = lazy(
  () => import("./admin/AdminApp")
);

const MenuPage = lazy(
  () => import("./pages/MenuPage")
);

function getAppPathname() {
  const pathname =
    window.location.pathname || "/";

  const rawBase =
    import.meta.env.BASE_URL || "/";

  const base =
    rawBase === "/"
      ? ""
      : rawBase.replace(/\/+$/, "");

  let relativePathname =
    pathname;

  if (base) {
    if (pathname === base) {
      relativePathname = "/";
    } else if (
      pathname.startsWith(
        `${base}/`
      )
    ) {
      relativePathname =
        pathname.slice(
          base.length
        ) || "/";
    }
  }

  relativePathname =
    relativePathname.replace(
      /\/{2,}/g,
      "/"
    );

  if (
    relativePathname.length > 1
  ) {
    relativePathname =
      relativePathname.replace(
        /\/+$/,
        ""
      );
  }

  return relativePathname || "/";
}

function PublicSite() {
  return (
    <>
      <Header />

      <Hero />

      <NavTabs />

      <EventsSection />

      <RecommendedSection />

      <OpeningHoursSection />

      <BarSection />

      <SocialSection />

      <Footer />

      <LegalCenter />
    </>
  );
}

function MenuSite() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <MenuLoading />
        }
      >
        <MenuPage />
      </Suspense>

      <Footer />

      <LegalCenter />
    </>
  );
}

function AdminLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F1EC] text-[#2F2A21]">
      <div
        role="status"
        aria-live="polite"
        className="text-center"
      >
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border border-[#CDBF9F] border-t-[#2F2A21] motion-reduce:animate-none" />

        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#635B4E]">
          Area amministrativa
        </p>
      </div>
    </main>
  );
}

function MenuLoading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F2F1EC] text-[#2F2A21]">
      <div
        role="status"
        aria-live="polite"
        className="text-center"
      >
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border border-[#CDBF9F] border-t-[#2F2A21] motion-reduce:animate-none" />

        <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#635B4E]">
          Menu
        </p>
      </div>
    </main>
  );
}

function App() {
  const pathname =
    getAppPathname();

  const isAdminPath =
    pathname === "/admin" ||
    pathname.startsWith(
      "/admin/"
    );

  const isMenuPath =
    pathname === "/menu" ||
    pathname.startsWith(
      "/menu/"
    );

  if (isAdminPath) {
    return (
      <Suspense
        fallback={
          <AdminLoading />
        }
      >
        <AdminApp />
      </Suspense>
    );
  }

  if (isMenuPath) {
    return <MenuSite />;
  }

  return <PublicSite />;
}

export default App;