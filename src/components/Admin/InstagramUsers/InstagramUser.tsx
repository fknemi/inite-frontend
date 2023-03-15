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
  let { name, username, avatar, timestamp, isBanned } = instagramUser;
  const [showActionButtons, setShowActionButtons] = useState(false);
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
    <tr>
      <th>
        <img src={avatar} alt="" />
      </th>
      <th>{name}</th>
      <th>{accountCreatedAt}</th>
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
            _isOwner={isOwner || false}
            username={username}
          />
        )}
      </th>
    </tr>
  );
};

export default InstagramUser;

// <div className="flex flex-col font-bold border-4 border-green-500 w-5/6 ">
//   <span>NAME: {name}</span>
//   <span>USERNAME: {username}</span>
//   <span className="flex flex-row gap-2">
//     AVATAR:{" "}
//     <div className="w-10 h-10">
//       <svg width="100%" height="100%">
//         <image xlinkHref={avatar} width="100%" height="100%" />
//       </svg>
//     </div>
//   </span>
//   <span>ACCOUNT CREATED AT: {accountCreatedAt}</span>
//   <ActionButtons _isBanned={instagramUser.isBanned} _isOwner={isOwner || false} username={instagramUser.username} />
// </div>
