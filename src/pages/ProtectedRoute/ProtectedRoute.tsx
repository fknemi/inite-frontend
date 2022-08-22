import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Props } from "../../@types/types";
import { fetchUser } from "../../api/user/user";
import {
  userAtom,
  tokensAtom,
  followingAtom,
  notificationSettingsAtom,
} from "../../statedrive/atoms";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const setUser = useSetRecoilState(userAtom);
  const [{ token, refreshToken }, setTokens] = useRecoilState(tokensAtom);
  const setNotificationSettings = useSetRecoilState(notificationSettingsAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);
  const navigate = useNavigate();
  const updateUser = () => {
    if (token && refreshToken) {
      (async () => {
        const { isSuccess, data } = await fetchUser();
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

  return <Component {...rest} />;
};

export default ProtectedRoute;
