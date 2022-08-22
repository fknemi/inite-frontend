import { lazy } from "react";

const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Admin = lazy(() => import("./Admin/Admin"));
const InstagramUserProfile = lazy(
  () => import("./InstagramUserProfile/InstagramUserProfile")
);
const SearchInstagramUsers = lazy(
  () => import("./SearchInstagramUsers/SearchInstagramUsers")
);
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));
const ForgotPassword = lazy(() => import("./ForgotPassword/ForgotPassword"));
const Settings = lazy(() => import("./Settings/Settings"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const VerifyEmail = lazy(() => import("./VerifyEmail/VerifyEmail"));
const ResetPassword = lazy(() => import("./ResetPassword/ResetPassword"));

export {
  Home,
  About,
  Admin,
  Login,
  Register,
  SearchInstagramUsers,
  ForgotPassword,
  Settings,
  Dashboard,
  VerifyEmail,
  InstagramUserProfile,
  ResetPassword,
};
