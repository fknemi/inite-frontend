import React from "react";
import { Props } from "../../@types/types";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  background: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

}

`;
const Layout = ({ children }: Props) => {
  const location = useLocation();
  return (
    <div>
      <GlobalStyles />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
