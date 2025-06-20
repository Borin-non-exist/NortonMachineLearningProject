import React from "react";
import Navbar from "../components/NavBar";
import HomePage from "./HomePage/HomePage";
import AboutPage from "./AboutAI/AboutAIPage";
import PrivacyPage from "./PrivacyPage/PrivacyPage";
import AboutUs from "./AboutUs/AboutUsPage";

export default function Home(){
  return(
    <div className="min-h-screen bg-[#EEF6FE] font-sans text-black relative dark:bg-gray-900">
      <Navbar />
      <section id="home">
        <HomePage />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="privacy">
        <PrivacyPage />
      </section>
      <section>
        < AboutUs/>
      </section>
    </div>
  );
}