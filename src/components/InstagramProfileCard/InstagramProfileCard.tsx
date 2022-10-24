import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 50%;
  height: 29rem;
  padding-bottom: 5rem;
  margin-top: 5rem;
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 200px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    span {
      font-size: 1.5rem;
      font-weight: 400;

    }

    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
  }
  a{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 4rem;
    background: #000000;
    border-radius: 5px;
    color: #fff;
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    top: 5rem;
  }
`;

const InstagramProfileCard = ({
  name,
  username,
  avatar,
}: {
  name: string;
  username: string;
  avatar: string;
}) => {
  return (
    <CardContainer>
      <div>
        <img src={avatar} alt="" />
        <span>{username}</span>
        <h1>{name}</h1>
      </div>
      <Link to={`/instagram/profile/${username}`}>View Profile</Link>
    </CardContainer>
  );
};

export default InstagramProfileCard;
