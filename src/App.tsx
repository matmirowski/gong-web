import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Sign from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import BranchesListPage from "./pages/owner/BranchesListPage";
import AuthGuard from "./components/general/AuthGuard";
import NewBranchInformationPage from "./pages/owner/NewBranchInformationPage";
import NewBranchFormPage from "./pages/owner/NewBranchFormPage";
import FormSummaryPage from "./pages/owner/FormSummaryPage";
import AdminBranchPage from "./pages/admin/AdminBranchPage";
import AdminBranchesPage from "./pages/admin/AdminBranchesPage";
import CouponsPage from "./pages/owner/CouponsPage";
import NewCouponPage from "./pages/owner/NewCouponPage";

function App() {
  return (
    <div className="font-sans tracking-wider">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthGuard allowedRoles={["owner"]} />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/owner/branches" element={<BranchesListPage />} />
            <Route path="/information" element={<NewBranchInformationPage />} />
            <Route path="/form" element={<NewBranchFormPage />} />
            <Route path="/summary" element={<FormSummaryPage />} />
            <Route path="/owner/branches/coupons/:branchId" element={<CouponsPage />} />
            <Route path="/owner/branches/coupons/:branchId/new" element={<NewCouponPage />} />
          </Route>
          <Route element={<AuthGuard allowedRoles={["admin"]} />}>
            <Route path="/admin/branches" element={<AdminBranchesPage />} />
            <Route path="/admin/branches/:branchId" element={<AdminBranchPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
