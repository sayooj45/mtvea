
import './App.css'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import AdminDashboard from './page/AdminDashboard';
import Login from './page/Login';
import HomePage from "./page/Home";
import RegistrationPage from "./page/Registration";
import ResetPassword from './component/forgotPassword/ResetPassword';
import ForgotPassword from './component/forgotPassword/ForgotPassword';
import PaymentPage from './component/payment/PaymentPage';
import ZellePaymentPage from './component/payment/ZellePaymentPage';
import AboutPage from './page/AboutPage';

function App() {

  return (
    <Router>
      <Routes>

        {/* pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/payment-page' element={<PaymentPage/>}/>
        <Route path="/zelle-payment" element={<ZellePaymentPage />} />
      </Routes>
    </Router>
  )

}

export default App;