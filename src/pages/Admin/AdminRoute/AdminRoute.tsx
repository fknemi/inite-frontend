import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";
import { fetchAdmin, logout } from "../../../api/admin/admin";

// const MAX_ADMIN_LOGGED_IN_TIME = 216 ** 4 * 10 ** 5;
const MAX_ADMIN_LOGGED_IN_TIME = 2000;

const AdminRoute = ({ component: Component, ...rest }: any) => {
  let [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (Object.keys(admin).length === 0) {
        logout();
        return;
      }
      const { isSuccess, data } = await fetchAdmin();
      if (!isSuccess || Object.keys(data).length === 0) {
        localStorage.removeItem("admin");
        return setAdmin({} as ADMIN);
      }
      let timestamp = parseInt(localStorage.getItem("loggedInAt") as string);
      if (!timestamp) {
        timestamp = new Date().getTime();
        localStorage.setItem("loggedInAt", timestamp.toString());
      }
      setAdmin({
        ...data,
        loginTimestamp: timestamp,
      });
      localStorage.setItem("admin", JSON.stringify(admin));
      if (admin.loginTimestamp) {
        if (
          new Date().getTime() - admin.loginTimestamp >=
          MAX_ADMIN_LOGGED_IN_TIME
        ) {
          logout();
          setAdmin({} as ADMIN);
          return navigate("/admin/login", {state: {sessionExpired: true}});
        }
      }
    })();
  }, []);

  return (
    <>{Object.keys(admin).length !== 0 ? <Component {...rest} /> : <>404</>}</>
  );
};

export default AdminRoute;
