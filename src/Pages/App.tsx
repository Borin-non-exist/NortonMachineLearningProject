// App.tsx
import React from "react";
import Navbar from "../components/NavBar";
import Hero from "./HomePage/HomePage";
import AboutPage from "./AboutAI/AboutAIPage";
import PrivacyPolicy from "./PrivacyPage/PrivacyPage";

const App: React.FC = () => (
  <div className="min-h-screen bg-[#EEF6FE] font-sans text-black relative dark:bg-gray-900">
    <Navbar />
    <section id="home">
      <Hero />
    </section>
    <section id="about">
      <AboutPage />
    </section>
    <section id="privacy">
      <PrivacyPolicy />
    </section>
  </div>
);

export default App;
