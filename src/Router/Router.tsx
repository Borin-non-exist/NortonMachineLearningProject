import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/App";
import PrivacyPage from "../Pages/PrivacyPage/PrivacyPage";
import About from "../Pages/AboutAI/AboutAIPage";
import SignUpPage from "../Pages/Auth/SignUpPage";
import ChatPage from "../Pages/ChatPage/ChatPage";
import LoginPage from "@/Pages/Auth/login";
import WelcomePage from "@/Pages/WelcomePage/WelcomePage";
import SettingsPage from "@/Pages/SettingPage/SettingPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/setting" element={<SettingsPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default AppRouter;
