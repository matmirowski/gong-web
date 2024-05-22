import { BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

import './App.css';
import Sign from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import BranchesListPage from './pages/owner/BranchesListPage';
import AuthGuard from './components/general/AuthGuard';
import NewBranchInformationPage from './pages/owner/newBranchInformationPage';
import NewBranchFormPage from './pages/owner/NewBranchFormPage';

function App() {
  return (
    <div className='font-sans tracking-wider'>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AuthGuard allowedRoles={['owner']} />}>
            <Route path="/home" element={<HomePage/>} />
          </Route>
          <Route path="/sign" element={<Sign/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route element={<AuthGuard allowedRoles={['owner']} />}>
            <Route path="/owner/branches" element={<BranchesListPage />} />
          </Route>
          <Route element={<AuthGuard allowedRoles={['owner']} />}>
            <Route path="/information" element={<NewBranchInformationPage/>} />
          </Route>
          <Route element={<AuthGuard allowedRoles={['owner']} />}>
            <Route path="/form" element={<NewBranchFormPage/>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;