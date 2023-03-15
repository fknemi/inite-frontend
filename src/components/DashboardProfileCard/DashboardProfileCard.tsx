import React from "react";
import { INSTAGRAM_USER } from "../../@types/types";
import styled from "styled-components";
import { instagramUserAtom } from "../../statedrive/atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const DashboardProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  width: 20rem;
  color: #000;
  padding: 1rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 10rem;
      height: 10rem;
      border-radius: 200px;
    }
    h1,
    span {
      font-weight: 500;
    }
    span {
      margin-top: -1rem;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15rem;
    height: 4rem;
    padding: 0.2rem;
    background: #000000;
    border-radius: 5px;
    color: #fff;
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: inherit;
    text-decoration: none;
  }
`;

function DashboardProfileCard(followedUser: INSTAGRAM_USER) {
  let { name, username, avatar } = followedUser;
  const setInstagramUser = useSetRecoilState(instagramUserAtom);
  let navigate = useNavigate();
  return (
    <DashboardProfileCardContainer>
      <div>
        <img src={avatar} alt="" />
        <h1>{name}</h1>
        <span>{username}</span>
      </div>
      <button
        onClick={() => {
          setInstagramUser(followedUser);
          localStorage.setItem("instagramUser", JSON.stringify(followedUser));
          return navigate(`/instagram/profile/${username}`);
        }}
      >
        View Profile
      </button>
    </DashboardProfileCardContainer>
  );
}

export default DashboardProfileCard;
