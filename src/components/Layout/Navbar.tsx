import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userAtom } from "../../statedrive/atoms";
import { logout } from "../../api/user/user";

const Nav: any = styled.nav`
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

  ${(props: any) => props.dynamicStyles}
`;

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

  a:not(.profile a) {
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
  a:first-child:not(.profile a) {
    background-color: #1976d2;
    color: #fff;
    border: 1.2px solid #1976d2;
  }
  a:last-child:not(.profile a) {
    background: none;
    border: 1.2px solid #fff;
  }

  // .profile a {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: 3rem;
  //   height: 3rem;
  //   svg {
  //     position: relative;
  //     top: 1px;
  //   }
  // }

  .profile {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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
    height: 20rem;
    background: #ffffff;
    border: 1px solid #efefef;
    box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.25);
    padding-left: 1rem;

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
      color: #858585;
      text-decoration: none;
      font-size: 1.4rem;
      letter-spacing: 0.4px;
    }
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [user] = useRecoilState(userAtom);
  const [showMenu, setShowMenu] = useState(false);
  let reg =
    /\/dashboard|\/notifications|\/settings|\/faq|\/account\/verify\/email|\/instagram\/search|\/instagram\/profile*/;

  return (
    <Nav
      dynamicStyles={
        location.pathname === "/"
          ? "background-color: #ffffff;a{color: #000;}div:last-child > a:last-child {color: #000;background: none;border: 1.2px solid #000;}"
          : ""
      }
    >
      <NavLink to="/">Inite</NavLink>

      <NavLinksContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contactus">Contact Us</NavLink>
        <NavLink to="/faq">FAQ</NavLink>

        {!reg.test(location.pathname) ? null : (
          <>
            <NavLink to="/instagram/search">Search</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}
      </NavLinksContainer>
      <NavButtonsContainer>
        {!reg.test(location.pathname) ? (
          <>
            <NavLink to="/account/register">Register</NavLink>
            <NavLink to="/account/login">Login</NavLink>
          </>
        ) : (
          <div className="profile">
            <NavLink to="/notifications">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2.5V1.5V2.5ZM6.5 8.5H5.5H6.5ZM3.5 17.5L2.9453 16.6679C2.57864 16.9124 2.41521 17.368 2.54291 17.7898C2.67061 18.2115 3.05933 18.5 3.5 18.5V17.5ZM21.5 17.5V18.5C21.9407 18.5 22.3294 18.2115 22.4571 17.7898C22.5848 17.368 22.4214 16.9124 22.0547 16.6679L21.5 17.5ZM15.095 22.0018C15.3721 21.524 15.2095 20.9121 14.7318 20.635C14.2541 20.3579 13.6421 20.5205 13.365 20.9982L15.095 22.0018ZM11.635 20.9982C11.3579 20.5205 10.746 20.3579 10.2682 20.635C9.79052 20.9121 9.6279 21.524 9.90502 22.0018L11.635 20.9982ZM19.5 8.5C19.5 6.64349 18.7625 4.86301 17.4497 3.55025L16.0355 4.96447C16.9732 5.90215 17.5 7.17392 17.5 8.5H19.5ZM17.4497 3.55025C16.137 2.2375 14.3565 1.5 12.5 1.5V3.5C13.8261 3.5 15.0979 4.02678 16.0355 4.96447L17.4497 3.55025ZM12.5 1.5C10.6435 1.5 8.86301 2.2375 7.55025 3.55025L8.96447 4.96447C9.90215 4.02678 11.1739 3.5 12.5 3.5V1.5ZM7.55025 3.55025C6.2375 4.86301 5.5 6.64348 5.5 8.5H7.5C7.5 7.17392 8.02678 5.90215 8.96447 4.96447L7.55025 3.55025ZM5.5 8.5C5.5 11.8527 4.78293 13.9346 4.1221 15.1461C3.79031 15.7544 3.46723 16.1535 3.2428 16.3904C3.13032 16.5091 3.04194 16.5878 2.98872 16.6322C2.9621 16.6544 2.94425 16.668 2.93655 16.6737C2.9327 16.6766 2.93139 16.6775 2.93279 16.6765C2.93349 16.676 2.93486 16.675 2.93694 16.6736C2.93798 16.6729 2.9392 16.6721 2.94059 16.6711C2.94128 16.6706 2.94202 16.6701 2.94281 16.6696C2.9432 16.6694 2.94382 16.6689 2.94402 16.6688C2.94465 16.6684 2.9453 16.6679 3.5 17.5C4.0547 18.3321 4.05537 18.3316 4.05605 18.3312C4.05629 18.331 4.05698 18.3305 4.05746 18.3302C4.05843 18.3296 4.05945 18.3289 4.0605 18.3282C4.06262 18.3267 4.06492 18.3252 4.06741 18.3235C4.07237 18.3201 4.07805 18.3161 4.08443 18.3116C4.09718 18.3026 4.11271 18.2915 4.13084 18.278C4.16708 18.251 4.21368 18.2148 4.26909 18.1686C4.37994 18.0762 4.52593 17.944 4.6947 17.7659C5.03277 17.409 5.45969 16.8706 5.8779 16.1039C6.71707 14.5654 7.5 12.1473 7.5 8.5H5.5ZM3.5 18.5H21.5V16.5H3.5V18.5ZM21.5 17.5C22.0547 16.6679 22.0553 16.6684 22.056 16.6688C22.0562 16.6689 22.0568 16.6694 22.0572 16.6696C22.058 16.6701 22.0587 16.6706 22.0594 16.6711C22.0608 16.6721 22.062 16.6729 22.0631 16.6736C22.0651 16.675 22.0665 16.676 22.0672 16.6765C22.0686 16.6775 22.0673 16.6766 22.0635 16.6737C22.0558 16.668 22.0379 16.6544 22.0113 16.6322C21.9581 16.5878 21.8697 16.5091 21.7572 16.3904C21.5328 16.1535 21.2097 15.7544 20.8779 15.1461C20.2171 13.9346 19.5 11.8527 19.5 8.5H17.5C17.5 12.1473 18.2829 14.5654 19.1221 16.1039C19.5403 16.8706 19.9672 17.409 20.3053 17.7659C20.4741 17.944 20.6201 18.0762 20.7309 18.1686C20.7863 18.2148 20.8329 18.251 20.8692 18.278C20.8873 18.2915 20.9028 18.3026 20.9156 18.3116C20.922 18.3161 20.9276 18.3201 20.9326 18.3235C20.9351 18.3252 20.9374 18.3267 20.9395 18.3282C20.9406 18.3289 20.9416 18.3296 20.9425 18.3302C20.943 18.3305 20.9437 18.331 20.944 18.3312C20.9446 18.3316 20.9453 18.3321 21.5 17.5ZM13.365 20.9982C13.2771 21.1498 13.1509 21.2756 12.9991 21.363L13.9974 23.0961C14.4528 22.8337 14.8313 22.4564 15.095 22.0018L13.365 20.9982ZM12.9991 21.363C12.8473 21.4504 12.6752 21.4965 12.5 21.4965V23.4965C13.0256 23.4965 13.5419 23.3584 13.9974 23.0961L12.9991 21.363ZM12.5 21.4965C12.3248 21.4965 12.1527 21.4504 12.0009 21.363L11.0027 23.0961C11.4581 23.3584 11.9745 23.4965 12.5 23.4965V21.4965ZM12.0009 21.363C11.8491 21.2756 11.7229 21.1498 11.635 20.9982L9.90502 22.0018C10.1687 22.4564 10.5473 22.8337 11.0027 23.0961L12.0009 21.363Z"
                  fill="white"
                />
              </svg>
            </NavLink>
            <span
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <img src={user.avatar} alt="" />
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2071 10.2071C20.5976 9.81658 20.5976 9.18342 20.2071 8.79289C19.8166 8.40237 19.1834 8.40237 18.7929 8.79289L20.2071 10.2071ZM12.5 16.5L11.7929 17.2071C11.9804 17.3946 12.2348 17.5 12.5 17.5C12.7652 17.5 13.0196 17.3946 13.2071 17.2071L12.5 16.5ZM6.20711 8.79289C5.81658 8.40237 5.18342 8.40237 4.79289 8.79289C4.40237 9.18342 4.40237 9.81658 4.79289 10.2071L6.20711 8.79289ZM18.7929 8.79289L11.7929 15.7929L13.2071 17.2071L20.2071 10.2071L18.7929 8.79289ZM13.2071 15.7929L6.20711 8.79289L4.79289 10.2071L11.7929 17.2071L13.2071 15.7929Z"
                  fill="white"
                />
              </svg>
            </span>

            {showMenu ? (
              <div>
                <Link to="/user/account/settings#profile">Profile</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/notifications">Inbox</Link>
                <Link to="/account/settings">Settings</Link>
                <span></span>
                <Link to="/faq">Need Help?</Link>
                <Link
                  to="/account/login"
                  state={{ loggedOut: true }}
                  onClick={() => {
                    return logout();
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : null}
          </div>
        )}
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
