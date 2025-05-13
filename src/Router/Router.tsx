import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import PrivacyPage from '../Pages/PrivacyPage/PrivacyPage';
import About from '../Pages/AboutPage/AboutPage';
import SignUpPage from '../Pages/Auth/SignUpPage';
import ChatPage from '../Pages/ChatPage/ChatPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);





export default AppRouter;
