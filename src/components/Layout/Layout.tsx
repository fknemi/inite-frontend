import React from "react";
import { Props } from "../../@types/types";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { createGlobalStyle } from "styled-components";

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const GlobalStyles = createGlobalStyle`
  ${location.pathname === "/" ? "body{background-color: #1E003C;}": ""}
   
  
  `;
  return (
    <div>
      <GlobalStyles/>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
