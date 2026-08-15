import Header from "./components/Header";
import Hero from "./components/Hero";
import NavTabs from "./components/NavTabs";

import EventsSection from "./components/events/EventsSection";
import RecommendedSection from "./components/recommended/RecommendedSection";
import OpeningHoursSection from "./components/hours/OpeningHoursSection";
import BarSection from "./components/bar/BarSection";
import SocialSection from "./components/social/SocialSection";
import Footer from "./components/Footer";

function App() {
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
    </>
  );
}

export default App;