import "./styles/tailwind.css";
import "./styles/custom.css";
import "./styles/app.css";
import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import {
  Home,
  Register,
  Login,
  InstagramUserProfile,
  SearchInstagramUsers,
  Dashboard,
  VerifyEmail,
} from "./pages/exports";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

/**
 * TODO User Things to add
 * TODO Add Email Input in VerifyEmail Page
 * TODO Add ForgotPassword && UpdatePassword Page
 * TODO Save Maybe Recent Changes in DB and add them to User
 */

const App = () => {
  return (
    <Router>
      <RecoilRoot>
        <Suspense fallback={"Loading"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute component={Dashboard} />}
            />

            <Route
              path="/instagram/profile/:username"
              element={<ProtectedRoute component={InstagramUserProfile} />}
            />
            <Route
              path="/instagram/search"
              element={<ProtectedRoute component={SearchInstagramUsers} />}
            />
            <Route path="/account/verify/email/" element={<VerifyEmail />} />
            <Route
              path="/account/verify/email/:token"
              element={<VerifyEmail />}
            />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </Router>
  );
};

export default App;
