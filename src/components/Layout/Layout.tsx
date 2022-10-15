import React from "react";
import { Props } from "../../@types/types";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { createGlobalStyle } from "styled-components";

const GlobalStyles: any = createGlobalStyle`${(props: any) => props.dynamicStyles}`;
const Layout = ({ children }: Props) => {
  const location = useLocation();
  return (
    <div>
      <GlobalStyles
        dynamicStyles={
          location.pathname === "/" ? "body{background-color: #1E003C;}" : ""
        }
      />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
