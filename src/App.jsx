import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./page/AdminDashboard";
import Login from "./page/Login";
import HomePage from "./page/Home";
import RegistrationPage from "./page/RegistrationPage";
import ResetPassword from "./component/forgotPassword/ResetPassword";
import ForgotPassword from "./component/forgotPassword/ForgotPassword";
import AboutPage from "./page/AboutPage";
import SpeakersPage from "./page/SpeakersPage";
import StripSuccess from "./page/StripSuccess";
import StripCancel from "./page/StripCancel";
import OurTeam from "./page/OurTeam";
import Souvenir from "./page/Souvenir";
import Accommodation from "./page/Accommodation";
import ProgramInformation from "./page/ProgramInformation";
import ErrorPage from "./page/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/success" element={<StripSuccess />} />
        <Route path="/cancel" element={<StripCancel />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/souvenir" element={<Souvenir />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/program-Information" element={<ProgramInformation />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
