import { BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

import './App.css';
import Sign from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import BranchesListPage from './pages/Owner/BranchesListPage';
import AuthGuard from './components/general/AuthGuard';
import AdminBranchesPage from './pages/admin/AdminBranchesPage';
import AdminBranchPage from './pages/admin/AdminBranchPage';

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
          <Route element={<AuthGuard allowedRoles={['admin']} />}>
            <Route path="/admin/branches" element={<AdminBranchesPage/>} />
            <Route path="/admin/branches/:branchId" element={<AdminBranchPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;