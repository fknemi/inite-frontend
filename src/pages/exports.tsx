import { lazy } from "react";

const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const AdminLogin = lazy(() => import("./Admin/Login/Login"));
const AdminDashboard = lazy(() => import("./Admin/Dashboard/Dashboard"));
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
const Notification = lazy(
  () => import("../components/Notifications/Notification")
);
const Notifications = lazy(
  () => import("../components/Notifications/Notifications")
);



export {
  Home,
  About,
  AdminLogin,
  AdminDashboard,
  Login,
  Register,
  SearchInstagramUsers,
  ForgotPassword,
  Settings,
  Dashboard,
  VerifyEmail,
  InstagramUserProfile,
  ResetPassword,
  Notification,
  Notifications,

};
