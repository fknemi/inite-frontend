import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminLogin } from "../../../api/admin/admin";
import { adminAtom } from "../../../statedrive/atoms";

const ADMIN_LOGIN_FAIL_TIMEOUT = 5 * 60 * 10 ** 3;
const MAX_ADMIN_LOGIN_TRY_COUNT = 10;

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
    <div className="ml-5">
      <h1 className="font-bold">AdminLogin</h1>
      <div className={`flex flex-col gap-2 w-3/4 ${timeout ? "hidden" : ""}`}>
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
        className="disabled:bg-gray-400 w-20 h-7 rounded-md bg-green-400"
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
  );
};

export default AdminLogin;
