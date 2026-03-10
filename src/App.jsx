
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
