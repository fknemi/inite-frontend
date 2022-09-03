import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex flex-row gap-5 underline underline-offset-1 ">
      {/* <Link to="/admin/dashboard">Admin Dashboard</Link>
<Link to="/admin/login">Admin Login</Link>

<Link to="/account/register">Register</Link> */}
<Link to="/account/login">Login</Link>
<Link to="/instagram/search">Instagram Search</Link>
      
      <Link to="/notifications">Notifications</Link>

      {/* <Link to="/dashboard">Dashboard</Link> */}
      {/* <Link to="/instagram/search">Instagram Search</Link> */}
      {/* <Link to="/">Home</Link> */}
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/user/account/settings">Settings</Link> */}
    </nav>
  );
};

export default Navbar;
