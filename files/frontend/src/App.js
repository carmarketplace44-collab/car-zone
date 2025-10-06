import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrowseCars from './pages/BrowseCars';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarDetail from './components/CarDetail';
import DealerDashboard from './components/DealerDashboard';
import DealerPage from './components/DealerPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<BrowseCars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DealerDashboard />} />
        <Route path="/dealers/:id" element={<DealerPage />} />
      </Routes>
    </Router>
  );
}
export default App;