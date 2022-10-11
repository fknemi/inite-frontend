import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.4rem;
  line-height: 150%;
  text-align: center;
  letter-spacing: 0.15px;
  font-weight: 500;
`;
const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const NavButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  line-height: 24px;
  letter-spacing: 0.4px;
  
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9rem;
    height: 3rem;
    font-size: 1.2rem;
    box-shadow: 0 1px 20px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    text-align: center;
    &:hover {
      scale: 1.1;
      position: relative;
      top: -1px;
    }
  }
  a:first-child {
    background-color: #1976d2;
    color: #fff;
    border: 1.2px solid #1976d2;
  }
  a:last-child {
    background: none;
    border: 1.2px solid #fff;
  }
`;

const Navbar = () => {
  const location = useLocation();
  let Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 1rem;
    background-color: #1e003c;
    > a:first-child {
      font-size: 2.8rem;
      font-weight: 500;
    }
    ${location.pathname === "/"
      ? `background-color: #fff; 
    a{
      color: #000;
    }
    div:last-child > a:last-child {
      color: #000;
      background: none;
      border: 1.2px solid #000;
    }

    `
      : ""}
  `;

  return (
    <Nav>
      <NavLink to="/">Inite</NavLink>

      <NavLinksContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">About</NavLink>
        <NavLink to="/">Contact Us</NavLink>
        <NavLink to="/">FAQ</NavLink>
      </NavLinksContainer>
      <NavButtonsContainer>
        <NavLink to="/account/register">Register</NavLink>
        <NavLink to="/account/login">Login</NavLink>
      </NavButtonsContainer>
    </Nav>
  );
};

export default Navbar;

//      <Link to="/account/register">Register</Link>
//   <Link to="/account/login">Login</Link>
//   <Link to="/instagram/search">Instagram Search</Link>

//   <Link to="/notifications">Notifications</Link>

//   <Link to="/dashboard">Dashboard</Link>
//   <Link to="/instagram/search">Instagram Search</Link>
//   <Link to="/">Home</Link>
//   <Link to="/login">Login</Link>
//   <Link to="/user/account/settings">Settings</Link>
//   <Link to="/admin/dashboard">Admin Dashboard</Link>
// <Link to="/admin/login">Admin Login</Link>
