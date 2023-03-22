import React from "react";
import { useRecoilState } from "recoil";
import { followingAtom, userAtom } from "../../statedrive/atoms";
import DetailsCard from "../DetailsCard/DetailsCard";

function FollowedAccounts() {
  const [user, setUser] = useRecoilState(userAtom);
  return (
    <>
      {user.following.map((following) => {
        return (
          <DetailsCard key={following.avatar}>
            <p className="top">
              <img src={following.avatar} alt="" />
              <span>Started following on 12 december 2022</span>
              <button>Remove</button>
            </p>
          </DetailsCard>
        );
      })}
    </>
  );
}

export default FollowedAccounts;
