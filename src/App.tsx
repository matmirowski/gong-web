import React, { useEffect, useState } from "react";
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
import OwnerBranchPage from "./pages/owner/OwnerBranchPage";
import EditBranchPage from "./pages/owner/EditBranchPage";
import Verify from "./pages/owner/Verify";
import Icon from "./components/general/Icon";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000 || window.innerHeight < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-4">
          <Icon name="logo-white" size={150} className="mb-4"/>
          <h1 className="text-3xl font-bold mb-2">Uwaga!</h1>
          <p className="text-lg">Proszę skorzystać z większego urządzenia, aby uzyskać najlepsze wrażenia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="font-sans tracking-wider">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route element={<AuthGuard allowedRoles={["owner"]} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/owner/branches" element={<BranchesListPage />} />
              <Route path="/information" element={<NewBranchInformationPage />} />
              <Route path="/form" element={<NewBranchFormPage />} />
              <Route path="/summary" element={<FormSummaryPage />} />
              <Route path="/owner/branches/coupons/:branchId" element={<CouponsPage />} />
              <Route path="/owner/branches/coupons/:branchId/new" element={<NewCouponPage />} />
              <Route path="/owner/branches/details/:branchId" element={<OwnerBranchPage />} />
              <Route path="/owner/branches/details/edit/:branchId" element={<EditBranchPage />} />
              <Route path="/owner/branches/coupons-verify/:branchId" element={<Verify />} />
            </Route>
            <Route element={<AuthGuard allowedRoles={["admin"]} />}>
              <Route path="/admin/branches/coupons/:branchId" element={<CouponsPage />} />
              <Route path="/admin/branches" element={<AdminBranchesPage />} />
              <Route path="/admin/branches/:branchId" element={<AdminBranchPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
