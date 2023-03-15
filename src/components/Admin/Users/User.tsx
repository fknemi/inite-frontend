import React, { useEffect } from "react";
import { useState } from "react";
import { getTimestampDateTime } from "../../../common/utils";
import ActionButtons from "./ActionButtons";
import styled from "styled-components";

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
  let role = isAdmin && !isOwner ? "Admin" : "Owner" || "User";

  const [accountCreatedAt, setAccountCreatedAt] = useState<string>("N/A");

  useEffect(() => {
    setAccountCreatedAt(getTimestampDateTime(timestamp, timeFormat));
  }, [timeFormat]);
  const [showActionButtons, setShowActionButtons] = useState(false);

  return (
    <tr>
      <th>
        <img src={avatar} alt="" />
      </th>
      <th>{name}</th>
      <th>{accountCreatedAt}</th>
      <th>{role}</th>
      <th>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowActionButtons(!showActionButtons)}
        >
          <path
            d="M10.5 19C10.5 20.1 11.4 21 12.5 21C13.6 21 14.5 20.1 14.5 19C14.5 17.9 13.6 17 12.5 17C11.4 17 10.5 17.9 10.5 19Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 5C10.5 6.1 11.4 7 12.5 7C13.6 7 14.5 6.1 14.5 5C14.5 3.9 13.6 3 12.5 3C11.4 3 10.5 3.9 10.5 5Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M10.5 12C10.5 13.1 11.4 14 12.5 14C13.6 14 14.5 13.1 14.5 12C14.5 10.9 13.6 10 12.5 10C11.4 10 10.5 10.9 10.5 12Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
        </svg>
        {showActionButtons && (
          <ActionButtons
            _isBanned={isBanned}
            _isOwner={_isOwner}
            username={username}
          />
        )}
      </th>
    </tr>
  );
};

export default User;

