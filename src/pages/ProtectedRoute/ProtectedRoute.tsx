import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const updateUser = () => {
    if (token && refreshToken) {
      (async () => {
        const { isSuccess, data } = await fetchUser();
        if (data.length === 0 || !isSuccess) {
            logout();
            return navigate("/account/login");
        }
        if (isSuccess) {
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            setFollowing(
              data.following.map(({ username }: any) => {
                return username;
              })
            );
            setNotificationSettings(data.notifications);

            if (!data.emailVerified) {
              return navigate("/account/verify/email");
            }
          }
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
