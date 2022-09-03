import React, { useEffect } from "react";
import { useState } from "react";
import { getTimestampDateTime } from "../../../common/utils";
import ActionButtons from "./ActionButtons";

interface USER_PROPS {
  _isOwner: boolean | undefined;
  user: {
    name: string;
    username: string;
    avatar: string;
    timestamp: string;
    isBanned: boolean;
    isAdmin: boolean;
    isOwner: boolean;
  };
  timeFormat: boolean;
}

const User = ({ _isOwner, user, timeFormat }: USER_PROPS) => {
  let { name, username, avatar, timestamp, isBanned, isAdmin, isOwner } = user;

  const [accountCreatedAt, setAccountCreatedAt]: any = useState("N/A");

  useEffect(() => {
    setAccountCreatedAt(getTimestampDateTime(timestamp, timeFormat));
  }, [timeFormat]);

  return (
    <div className="flex flex-col font-bold border-4 border-green-500 w-5/6">
      <span>NAME: {name}</span>
      <span>USERNAME: {username}</span>
      <span className="flex flex-row gap-2">
        AVATAR:{" "}
        <div className="w-10 h-10">
          <svg width="100%" height="100%">
            <image xlinkHref={avatar} width="100%" height="100%" />
          </svg>
        </div>
      </span>
      <span>IS ADMIN: {isAdmin ? "ADMIN" : ""}</span>
      <span>ACCOUNT CREATED AT: {accountCreatedAt}</span>
      <ActionButtons
        _isBanned={isBanned}
        _isOwner={_isOwner}
        username={username}
      />
    </div>
  );
};

export default User;
