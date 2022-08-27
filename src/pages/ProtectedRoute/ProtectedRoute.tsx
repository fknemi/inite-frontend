import React, { useEffect, useState } from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Props } from "../../@types/types";
import { fetchUser, logout } from "../../api/user/user";
import {
  userAtom,
  tokensAtom,
  followingAtom,
  notificationSettingsAtom,
} from "../../statedrive/atoms";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [{ token, refreshToken }, setTokens] = useRecoilState(tokensAtom);
  const setNotificationSettings = useSetRecoilState(notificationSettingsAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);
  const [didLogin, setDidLogin] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const parseJSON = (item: string) => {
    try {
      return JSON.parse(localStorage.getItem(item) as string);
    } catch {
      return false;
    }
    return false;
  };
  useEffect(() => {
    let locationState = location.state as Location & {
      didLogin: boolean | undefined;
    };
    setDidLogin((locationState && locationState.didLogin) || false);
  }, []);

  const updateUser = () => {
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

        if (!Object.keys(user).length && !data.emailVerified) {
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

  // useEffect(() => {
  // const interval = setInterval(() => {
  //   {
  //     updateUser();
  //   }
  // }, 60000);
  // return () => {
  //   clearInterval(interval);
  // };
  // }, []);

  return <>{token && refreshToken ? <Component {...rest} /> : <>404 page</>}</>;
};

export default ProtectedRoute;
