import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminLogin } from "../../../api/admin/admin";
import { adminAtom } from "../../../statedrive/atoms";
import styled from "styled-components";
import { GlobalStyles } from "../../../components/Layout/Layout";

const ADMIN_LOGIN_FAIL_TIMEOUT = 5 * 60 * 10 ** 3;
const MAX_ADMIN_LOGIN_TRY_COUNT = 10;

const AdminLoginContainer = styled.div`
  font-family: "Inter", "sans-serif";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
  border: 2px solid red;
  h1 {
    font-weight: 500;
    font-size: 4rem;
    color: #ffff;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    gap: 1.2rem;
  }
  div div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    gap: 1.2rem;
    input {
      font-family: inherit;
      width: 100%;
      height: 4rem;
      /* padding: 0 0 0 1rem; */
      background: #ffffff;
      font-size: 1.6rem;
      outline-color: transparent;
      border-radius: 5px;
      border-color: transparent;
      box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
        0px 0px 3px rgba(27, 31, 35, 0.25);

      &::placeholder {
        color: #a29d9d;
      }
      outline: none;
    }
  }
  button {
    width: 12rem;
    height: 4rem;
    border-radius: 5px;
    border-color: transparent;
    color: #fff;
    font-family: inherit;
    font-weight: 500;
    background: #152e4d;
    align-self: flex-end;
    padding: 0 0 0 1rem;
    position: relative;
    cursor: pointer;
    left: 0.7%;
  }
`;

const AdminLogin = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({
    username: "",
    password: "",
  });

  const [disableButton, setDisableButton] = useState(true);
  const setAdmin = useSetRecoilState(adminAtom);
  const [loginTryCount, setLoginTryCount] = useState(0);
  const [timeout, setTimeout] = useState<number | undefined>(
    parseInt(localStorage.getItem("timeout") as string)
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (timeout && new Date().getTime() - timeout > ADMIN_LOGIN_FAIL_TIMEOUT) {
      setLoginTryCount(0);
      localStorage.removeItem("timeout");
      setTimeout(undefined);
    }
    if (!adminLoginForm.username || !adminLoginForm.password) {
      return setDisableButton(true);
    }
    return setDisableButton(false);
  }, [adminLoginForm]);

  useEffect(() => {
    if (timeout) {
      const interval = setInterval(() => {
        if (new Date().getTime() - timeout > ADMIN_LOGIN_FAIL_TIMEOUT) {
          setLoginTryCount(0);
          localStorage.removeItem("timeout");
          setTimeout(undefined);
        }
      }, ADMIN_LOGIN_FAIL_TIMEOUT - (new Date().getTime() - timeout));
      return () => {
        clearInterval(interval);
      };
    }
  }, [timeout]);

  useEffect(() => {
    let locationState = location.state as Location & {
      sessionExpired: boolean | undefined;
    };
    setSessionExpired((locationState && locationState.sessionExpired) || false);
  }, []);

  return (
    <AdminLoginContainer>
      <div>
        <GlobalStyles />
        <h1>Admin Login</h1>
        <div>
          <div>{sessionExpired ? "Admin Session Expired" : ""}</div>
          <input
            className="border-2"
            type="text"
            name=""
            placeholder="Username"
            value={adminLoginForm.username}
            onChange={(e: React.SyntheticEvent) =>
              setAdminLoginForm({
                ...adminLoginForm,
                username: (e.target as HTMLInputElement).value,
              })
            }
          />
          <input
            type="password"
            name=""
            className="border-2"
            placeholder="Password"
            value={adminLoginForm.password}
            onChange={(e: React.SyntheticEvent) =>
              setAdminLoginForm({
                ...adminLoginForm,
                password: (e.target as HTMLInputElement).value,
              })
            }
          />
        </div>
        <button
          disabled={disableButton}
          onClick={async () => {
            let { username, password } = adminLoginForm;
            if (!username || !password) {
              return setDisableButton(true);
            }
            const { isSuccess, data } = await adminLogin(username, password);
            if (!isSuccess) {
              if (loginTryCount >= MAX_ADMIN_LOGIN_TRY_COUNT) {
                if (!timeout) {
                  localStorage.setItem(
                    "timeout",
                    new Date().getTime().toString()
                  );
                  setTimeout(new Date().getTime());
                }
                return navigate("/");
              }
              setLoginTryCount(loginTryCount + 1);
            }
            if (isSuccess) {
              if (data.isAdmin) {
                localStorage.setItem("admin", JSON.stringify(data));
                setAdmin(data);
                localStorage.setItem(
                  "loggedInAt",
                  new Date().getTime().toString()
                );
                return navigate("/admin/dashboard", {
                  state: { didLogin: true },
                });
              }
              if (data.isBanned) {
                return navigate("/user/banned");
              }
            }
            setAdminLoginForm({ username: "", password: "" });
            setDisableButton(true);
          }}
        >
          Login
        </button>
      </div>
    </AdminLoginContainer>
  );
};

export default AdminLogin;
