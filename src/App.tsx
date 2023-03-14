import React, { useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import {
  Home,
  Register,
  Login,
  InstagramUserProfile,
  SearchInstagramUsers,
  Dashboard,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
  Settings,
  AdminLogin,
  AdminDashboard,
  Notifications,
  About,
} from "./pages/exports";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./pages/Admin/AdminRoute/AdminRoute";
import { createGlobalStyle } from "styled-components";
import { useLocation } from "react-router-dom";

const App = () => {
  const GlobalStyles = createGlobalStyle`
  html,body{
    font-size: 10px;
    font-family: "Inter", 'sans-serif';
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  *, *::before, *::after{
    border-color: transparent;
    outline-color: transparent;
  }
  a, button{
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  `;

  return (
    <>
      <GlobalStyles />
      <Router>
        <RecoilRoot>
          <Suspense fallback={"Loading"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/account/register" element={<Register />} />
              <Route path="/account/login" element={<Login />} />
              <Route
                path="/admin/login"
                element={<ProtectedRoute component={AdminLogin} />}
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    component={() => <AdminRoute component={AdminDashboard} />}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={<ProtectedRoute component={Dashboard} />}
              />
              <Route
                path="/user/account/settings"
                element={<ProtectedRoute component={Settings} />}
              />

              <Route
                path="/instagram/profile/:username"
                element={<ProtectedRoute component={InstagramUserProfile} />}
              />
              <Route
                path="/instagram/search"
                element={<ProtectedRoute component={SearchInstagramUsers} />}
              />
              <Route
                path="/notifications"
                element={<ProtectedRoute component={Notifications} />}
              />

              <Route path="/account/verify/email/" element={<VerifyEmail />} />
              <Route
                path="/account/forgot/password"
                element={<ForgotPassword />}
              />
              <Route
                path="/account/update/password/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/account/verify/email/:token"
                element={<VerifyEmail />}
              />
            </Routes>
          </Suspense>
        </RecoilRoot>
      </Router>
    </>
  );
};

export default App;
