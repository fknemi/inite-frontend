import React, { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";

interface USER_PROPS {
  isOwner: boolean | undefined;
  instagramUser: {
    name: string;
    username: string;
    avatar: string;
    timestamp: string;
    isBanned: boolean;
  };
  timeFormat: boolean;
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const InstagramUser = ({ isOwner, instagramUser, timeFormat }: USER_PROPS) => {
  let { name, username, avatar, timestamp, isBanned} =
    instagramUser;

  const getAccountCreatedAt = () => {
    let date = new Date(parseInt(timestamp));
    let hours = date.getHours() - (timeFormat ? 12 : 0);
    // default true/checked then 12 hours else 24 hours
    return `${
      timeFormat
        ? hours < 10
          ? hours === 0
            ? 12
            : "0" + hours
          : hours
        : hours < 10
        ? "0" + hours
        : hours
    }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    } ${date.getDay()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const [accountCreatedAt, setAccountCreatedAt]: any = useState("N/A");

  useEffect(() => {
    setAccountCreatedAt(getAccountCreatedAt());
  }, [timeFormat]);

  return (
    <div className="flex flex-col font-bold border-4 border-green-500 w-5/6 ">
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
      <span>ACCOUNT CREATED AT: {accountCreatedAt}</span>
      <ActionButtons _isBanned={instagramUser.isBanned} _isOwner={isOwner || false} username={instagramUser.username} />
    </div>
  );
};

export default InstagramUser;
