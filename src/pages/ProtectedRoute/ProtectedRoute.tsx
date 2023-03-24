import React, { useEffect, useState, useContext, useRef } from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchUser, logout } from "../../api/user/user";
import { updateNotifications, socket } from "../../common/socket";
import {
  userAtom,
  tokensAtom,
  followingAtom,
  notificationSettingsAtom,
  notificationsAtom,
  newNotificationsAlertAtom,
} from "../../statedrive/atoms";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [tokens, setTokens] = useRecoilState(tokensAtom);
  const setNotificationSettings = useSetRecoilState(notificationSettingsAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);
  const [didLogin, setDidLogin] = useState(false);
  const location = useLocation();
  const setNotifications = useSetRecoilState(notificationsAtom);
  const setNewNotificationsAlert = useSetRecoilState(newNotificationsAlertAtom);

  const navigate = useNavigate();
  const parseJSON = (item: string) => {
    try {
      return JSON.parse(localStorage.getItem(item) as string);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    let locationState = location.state as Location & {
      didLogin: boolean | undefined;
    };
    setDidLogin((locationState && locationState.didLogin) || false);
  }, []);

  const updateUser = () => {
    let token = localStorage.getItem("x-token") as string;
    let refreshToken = localStorage.getItem("x-refresh-token") as string;
    if (token && refreshToken) {
      (async () => {
        const { isSuccess, data } = await fetchUser(); //nosonar
        if (!Object.keys(data).length) {
          return;
        }
        if (
          !Object.keys(user).length &&
          !isSuccess &&
          !Object.keys(data).length
        ) {
          logout();
          return navigate("/account/login");
        }
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        if (data.following) {
          setFollowing(
            data.following.map(({ username }: any) => {
              return username;
            })
          );
        }
        setNotificationSettings(data.notifications);
        setNewNotificationsAlert(true);

        if (Object.keys(user).length && !data.emailVerified) {
          return navigate("/account/verify/email");
        }
      })();
    } else {
      logout();
    }
  };
  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    socket.on("notifications", async (data: any) => {
      const newNotifications: any = await updateNotifications(data);
      if (!newNotifications) {
        return;
      }
      setNotifications(newNotifications);
      setNewNotificationsAlert(true);
      localStorage.setItem("newNotificationsAlert", "true");
    });
  }, []);

  return (
    <>
      {tokens.token && tokens.refreshToken ? (
        <Component {...rest} />
      ) : (
        <>404 page</>
      )}
    </>
  );
};

export default ProtectedRoute;
