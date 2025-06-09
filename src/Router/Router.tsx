import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/App";
import PrivacyPage from "../Pages/PrivacyPage/PrivacyPage";
import About from "../Pages/AboutAI/AboutAIPage";
import SignUpPage from "../Pages/Auth/SignUpPage";
import ChatPage from "../Pages/ChatPage/ChatPage";
import LoginPage from "@/Pages/Auth/login";
import WelcomePage from "@/Pages/WelcomePage/WelcomePage";
import SettingsPage from "@/Pages/SettingPage/SettingPage";
import TermsPolicyPage from "@/Pages/TermsPolicyPage/TermsPolicyPage";
import HowToUsePage from "@/Pages/how-to-use/how-to-use";
import DashbordDoctorPage from "@/Pages/DoctorPage/Dashborddoctor/Dashboarddoctor";
import DiseaseKnowledgePage from "@/Pages/DoctorPage/KnowledgePage/DiseaseKnowledgePage";
import LoginDoctorPage from "@/Pages/DoctorPage/Auth/login_doctor";
import SettingDoctorPage from "@/Pages/DoctorPage/SettingdoctorPage/SettingdoctorPage";

import AdminPage from "@/Pages/AdminPage/Dashborddoctor/DashboardAdmin";
import DoctorPage from "@/Pages/AdminPage/DoctorPage/doctor";
import LoginAdminPage from "@/Pages/AdminPage/Auth/login_Admin";
import SettingAdminPage from "@/Pages/AdminPage/SettingAdminPage/SettingAdminPage";

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
      <Route path="/terms-policy" element={<TermsPolicyPage />} />
      <Route path="/how-to-use" element={<HowToUsePage />} />
                       {/* doctor */}
      <Route path="/doctor" element={<DashbordDoctorPage />} />
      <Route path="/disease-knowledge" element={<DiseaseKnowledgePage />} />
      <Route path="/login-doctor" element={<LoginDoctorPage />} />
      <Route path="/SettingDoctor" element={<SettingDoctorPage />} />
                         {/* Admin */}
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/doctor-list" element={<DoctorPage />} />
      <Route path="/login-Admin" element={<LoginAdminPage />} />
      <Route path="/SettingAdmin" element={<SettingAdminPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default AppRouter;
