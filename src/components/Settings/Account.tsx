import React, { useEffect } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { USER } from "../../@types/types";
import { userAtom } from "../../statedrive/atoms";

const Account = () => {
  const [user, setUser]: [USER, SetterOrUpdater<USER>] =
    useRecoilState(userAtom);

  

  return (
    <div className="ml-5">
      <h1>Account</h1>

      <div className="flex flex-col gap-1">
        <span className="flex flex-row gap-2">
          AVATAR:{" "}
          <div className="w-10 h-10 rounded-full">
            <svg width="100%" height="100%">
              <image xlinkHref={user.avatar} width="100%" height="100%" />
            </svg>
          </div>
        </span>
        <span>USERNAME: {user.username}</span>
        <span>NAME: {user.name}</span>
        <span>EMAIL: {user.email}</span>
        <span>GENDER: {user.gender.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default Account;
