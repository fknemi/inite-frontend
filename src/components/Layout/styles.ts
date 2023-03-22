import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

export const MobileNavMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    width: 6rem;
    &.dropdown {
      transform: rotate(180deg);
    }
    &:last-child {
      width: 4rem;
    }
  }
`;

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  &.show .mobileLinks {
    display: flex;
  }
  &.show {
    height: 100vh;
    background: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
  }
  color: #fff;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;
export const MobileNavLinksContainer = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 3rem;
  margin-top: 10rem;
`;

export const Nav: any = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 1rem;

  > a:first-child {
    width: 7rem;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  line-height: 150%;
  text-align: center;
  letter-spacing: 0.15px;
  font-weight: 500;
`;
export const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;

  gap: 8rem;
  a {
    font-size: 1.8rem;
    font-weight: 400;
    display: inline-block;
    position: relative;
  }
  a::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  a:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  line-height: 24px;
  letter-spacing: 0.4px;

  a:not(.profile a) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9rem;
    height: 3rem;
    font-size: 1.4rem;
    border-radius: 5px;
    text-align: center;
    &:hover {
      scale: 1.1;
      position: relative;
      top: -1px;
    }
  }
  a:first-child:not(.profile a) {
    background-color: #1d1b1b;
    color: #fff;
    border: 1.2px solid #1d1b1b;
  }
  a:last-child:not(.profile a) {
    background: none;
    border: 1.2px solid #1d1b1b;
    color: #1d1b1b;
    font-weight: 600;
  }

  .active {
    background: rgba(246, 246, 246, 0.3);
    backdrop-filter: blur(10px);
    background-size: 2rem;
  }
  .profile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    /* border: 2px solid red; */
    position: relative;
    left: -5rem;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;

      svg {
        position: relative;
        top: 0.5px;
      }
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      img {
        width: 3rem;
        height: 3rem;
      }
      svg {
        width: 2rem;
        height: 2rem;
        position: relative;
        top: 1px;
      }
    }
  }

  .profile div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    right: 0.6rem;
    top: 5rem;
    width: 18rem;
    height: auto;
    background: #ffffff;

    box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
      0px 0px 3px rgba(27, 31, 35, 0.25);
    border-radius: 10px;
    padding: 1rem 1rem;
    gap: 1rem;

    span {
      width: 100%;
      height: 1px;
      background: #ececec;
      margin: 1rem 0;
    }
    a {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
      display: flex;
      text-decoration: none;
      font-size: 1.4rem;
      letter-spacing: 0.4px;
      gap: 1rem;
      color: #111111;
    }
  }
`;
