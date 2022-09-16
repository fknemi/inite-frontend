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
} from "./pages/exports";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./pages/Admin/AdminRoute/AdminRoute";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <Router>
      <RecoilRoot>
        <ChakraProvider>
          <Suspense fallback={"Loading"}>
            <Routes>
              <Route path="/" element={<Home />} />
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
        </ChakraProvider>
      </RecoilRoot>
    </Router>
  );
};

export default App;
