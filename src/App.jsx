
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from './page/AdminDashboard';
import Login from './page/Login';
import HomePage from "./page/Home";
import RegistrationPage from "./page/Registration";
function App() {

  return (
    <Router>
      <Routes>
        {/* redirect root */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  )

}

export default App;