import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/">Landing</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Route for LandingPage (Main Page) */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for HomePage */}
          <Route path="/home" element={<HomePage />} />

          {/* Redirect to LandingPage if path doesn't match */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;