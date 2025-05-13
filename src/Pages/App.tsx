// App.tsx
import React from "react";
import Navbar from "../components/NavBar";
import Hero from "./HomePage/HomePage";
import AboutPage from "./AboutPage/AboutPage";
import PrivacyPolicy from "./PrivacyPage/PrivacyPage";

const App: React.FC = () => (
  <div className="min-h-screen bg-white font-sans text-black relative">
    <Navbar />
    <section id="home"><Hero /></section>
    <section id="about"><AboutPage /></section>
    <section id="privacy"><PrivacyPolicy /></section>
  </div>
);

export default App;
