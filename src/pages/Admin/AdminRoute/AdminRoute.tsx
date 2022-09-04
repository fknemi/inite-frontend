import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";
import { fetchAdmin, logout } from "../../../api/admin/admin";
import { socket } from "../../../common/socket";

const MAX_ADMIN_LOGGED_IN_TIME = 1440 * 60 * 1000; // 24 hours

const AdminRoute = ({ component: Component, ...rest }: any) => {
  let [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (Object.keys(admin).length === 0) {
        logout();
        return;
      }
      let { isSuccess, data } = await fetchAdmin();
      if (!isSuccess || Object.keys(data).length === 0) {
        localStorage.removeItem("admin");
        return setAdmin({} as ADMIN);
      }
      let timestamp = parseInt(localStorage.getItem("loggedInAt") as string);
      if (!timestamp) {
        timestamp = new Date().getTime();
        localStorage.setItem("loggedInAt", timestamp.toString());
      }

      setAdmin(data);
      localStorage.setItem("admin", JSON.stringify(data));
      if (timestamp) {
        if (new Date().getTime() - timestamp >= MAX_ADMIN_LOGGED_IN_TIME) {
          logout();
          setAdmin({} as ADMIN);
          return navigate("/admin/login", { state: { sessionExpired: true } });
        }
      }
    })();
  }, []);


  return (
    <>{Object.keys(admin).length !== 0 ? <Component {...rest} /> : <>404</>}</>
  );
};

export default AdminRoute;
