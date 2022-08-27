import React, { useEffect, useState } from "react";
let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";
const Details = ({ instagramUserDetails }: any) => {
  let {
    biography,
    isPrivate,
    postsCount,
    followingCount,
    followedByCount,
    recentlyAdded,
    isCollect,
    followedBy,
  } = instagramUserDetails;
  const [media, setMedia] = useState([]);
  const [viewFollowedByUsers, setViewFollowedByUsers] = useState(false);

  return (
    <div>
      <h1>Details</h1>
      <button
        className={`${
          followedBy && followedBy.length ? "" : "hidden"
        } ${BUTTON_STYLE}`}
        onClick={() => {
          setViewFollowedByUsers(!viewFollowedByUsers);
        }}
      >
        View Followed By Users
      </button>

      {viewFollowedByUsers ? (
        <FollowedByUsers followedByUsers={followedBy} />
      ) : null}
    </div>
  );
};

export const FollowedByUsers = ({ className, followedByUsers }: any) => {
  return (
    <div className="flex flex-col gap-1">
      {followedByUsers.map((user: any) => {
        return <div key={user.username}>{user.username}</div>;
      })}
    </div>
  );
};

export default Details;
