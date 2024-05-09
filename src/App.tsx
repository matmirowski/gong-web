import { BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

import './App.css';
import Sign from './pages/SignInPage';

function App() {
  return (
    <div className='font-sans tracking-wider'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sign" element={<Sign/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;