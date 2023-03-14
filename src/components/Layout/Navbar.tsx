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

  > a:first-child {
    width: 7rem;
  }
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

const Navbar = () => {
  const location = useLocation();
  const [user] = useRecoilState(userAtom);
  const [showMenu, setShowMenu] = useState(false);
  let reg =
    /\/dashboard|\/notifications|\/settings|\/faq|\/account\/verify\/email|\/instagram\/search|\/instagram\/profile*/;

  return (
    <Nav>
      <NavLink to="/">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.4695 10C40.7851 10 44.7686 11.3753 47.9934 13.699C52.7358 11.8495 56.0554 11.2804 58.0472 11.7072C60.2761 12.1815 61.272 13.5568 61.0823 15.596C60.9874 16.9238 60.2287 18.5836 58.8534 20.3857C55.1544 25.2229 46.381 32.0993 33.9561 38.2643C41.8284 37.221 49.2264 34.6127 56.1028 30.1549C55.8183 40.7304 47.1398 49.2192 36.4695 49.2192C31.2055 49.2192 26.4158 47.1325 22.9065 43.718C18.7332 45.283 15.7929 45.7098 13.9909 45.3304C11.762 44.8562 10.7661 43.4809 10.9083 41.4417C11.0032 40.0664 11.8094 38.454 13.1847 36.6045C16.8837 31.8148 25.6096 24.8909 38.0819 18.7259C30.6839 19.7218 23.7126 22.093 17.2156 26.0765C18.8755 16.9238 26.89 10 36.4695 10ZM20.2507 40.5881C19.4445 39.4025 18.7806 38.1221 18.2115 36.7468C17.4528 37.553 16.7888 38.3118 16.2672 38.9757C15.461 40.0664 14.9393 40.9201 14.8445 41.5366C15.8404 41.7263 17.6425 41.4417 20.2507 40.5881ZM51.2182 16.6393C52.1667 17.7774 53.0203 18.963 53.7317 20.2909C54.5379 19.4847 55.2018 18.7259 55.7709 18.0146C56.5771 16.9238 57.0987 16.0702 57.1936 15.5011C56.1028 15.264 54.1585 15.596 51.2182 16.6393Z"
            fill="white"
          />
        </svg>
      </NavLink>

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
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4838 28.9846C19.242 29.4014 18.895 29.7473 18.4776 29.9877C18.0601 30.2282 17.5868 30.3547 17.105 30.3547C16.6232 30.3547 16.1499 30.2282 15.7324 29.9877C15.315 29.7473 14.968 29.4014 14.7263 28.9846M25.355 11.1096C25.355 8.92158 24.4858 6.82316 22.9386 5.27599C21.3914 3.72881 19.293 2.85962 17.105 2.85962C14.9169 2.85962 12.8185 3.72881 11.2713 5.27599C9.72417 6.82316 8.85498 8.92158 8.85498 11.1096C8.85498 20.7346 4.72998 23.4846 4.72998 23.4846H29.48C29.48 23.4846 25.355 20.7346 25.355 11.1096Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NavLink>
            <span
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className={showMenu ? "active" : ""}
            >
              <img src={user.avatar} alt="" />
            </span>

            {showMenu ? (
              <div>
                <Link to="/user/account/settings#profile">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4168 19.4691C17.4168 15.9253 14.544 13.0524 11.0002 13.0524C7.45634 13.0524 4.5835 15.9253 4.5835 19.4691M11.0002 10.3024C8.97512 10.3024 7.3335 8.66083 7.3335 6.63578C7.3335 4.61074 8.97512 2.96912 11.0002 2.96912C13.0252 2.96912 14.6668 4.61074 14.6668 6.63578C14.6668 8.66083 13.0252 10.3024 11.0002 10.3024Z"
                      stroke="#484F58"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Account
                </Link>
                <Link to="/dashboard">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.583 9.3857H17.4163C19.2497 9.3857 20.1663 8.46903 20.1663 6.6357V4.80237C20.1663 2.96903 19.2497 2.05237 17.4163 2.05237H15.583C13.7497 2.05237 12.833 2.96903 12.833 4.80237V6.6357C12.833 8.46903 13.7497 9.3857 15.583 9.3857Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.58301 20.3857H6.41634C8.24967 20.3857 9.16634 19.469 9.16634 17.6357V15.8024C9.16634 13.969 8.24967 13.0524 6.41634 13.0524H4.58301C2.74967 13.0524 1.83301 13.969 1.83301 15.8024V17.6357C1.83301 19.469 2.74967 20.3857 4.58301 20.3857Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.49967 9.3857C7.52472 9.3857 9.16634 7.74408 9.16634 5.71903C9.16634 3.69399 7.52472 2.05237 5.49967 2.05237C3.47463 2.05237 1.83301 3.69399 1.83301 5.71903C1.83301 7.74408 3.47463 9.3857 5.49967 9.3857Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.4997 20.3857C18.5247 20.3857 20.1663 18.7441 20.1663 16.719C20.1663 14.694 18.5247 13.0524 16.4997 13.0524C14.4746 13.0524 12.833 14.694 12.833 16.719C12.833 18.7441 14.4746 20.3857 16.4997 20.3857Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/notifications">
                  {" "}
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5859 19.4692C12.4247 19.747 12.1934 19.9776 11.9151 20.1379C11.6367 20.2982 11.3212 20.3826 11 20.3826C10.6788 20.3826 10.3633 20.2982 10.085 20.1379C9.80666 19.9776 9.57534 19.747 9.41418 19.4692M16.5 7.55249C16.5 6.0938 15.9205 4.69485 14.8891 3.6634C13.8576 2.63195 12.4587 2.05249 11 2.05249C9.54131 2.05249 8.14236 2.63195 7.11091 3.6634C6.07946 4.69485 5.5 6.0938 5.5 7.55249C5.5 13.9692 2.75 15.8025 2.75 15.8025H19.25C19.25 15.8025 16.5 13.9692 16.5 7.55249Z"
                      stroke="#484F58"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Inbox
                </Link>
                <Link to="/faq">
                  {" "}
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.2191C13.6569 15.2191 15 13.876 15 12.2191C15 10.5623 13.6569 9.21912 12 9.21912C10.3431 9.21912 9 10.5623 9 12.2191C9 13.876 10.3431 15.2191 12 15.2191Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 13.0992V11.3392C2 10.2992 2.85 9.43918 3.9 9.43918C5.71 9.43918 6.45 8.15917 5.54 6.58917C5.02 5.68917 5.33 4.51917 6.24 3.99917L7.97 3.00917C8.76 2.53917 9.78 2.81917 10.25 3.60917L10.36 3.79917C11.26 5.36917 12.74 5.36917 13.65 3.79917L13.76 3.60917C14.23 2.81917 15.25 2.53917 16.04 3.00917L17.77 3.99917C18.68 4.51917 18.99 5.68917 18.47 6.58917C17.56 8.15917 18.3 9.43918 20.11 9.43918C21.15 9.43918 22.01 10.2892 22.01 11.3392V13.0992C22.01 14.1392 21.16 14.9992 20.11 14.9992C18.3 14.9992 17.56 16.2792 18.47 17.8492C18.99 18.7592 18.68 19.9192 17.77 20.4392L16.04 21.4292C15.25 21.8992 14.23 21.6192 13.76 20.8292L13.65 20.6392C12.75 19.0692 11.27 19.0692 10.36 20.6392L10.25 20.8292C9.78 21.6192 8.76 21.8992 7.97 21.4292L6.24 20.4392C5.33 19.9192 5.02 18.7492 5.54 17.8492C6.45 16.2792 5.71 14.9992 3.9 14.9992C2.85 14.9992 2 14.1392 2 13.0992Z"
                      stroke="#484F58"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Settings
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

{
  /* <Link
                  to="/account/login"
                  state={{ loggedOut: true }}
                  onClick={() => {
                    return logout();
                  }}
                >
                  Logout
                </Link> */
}
