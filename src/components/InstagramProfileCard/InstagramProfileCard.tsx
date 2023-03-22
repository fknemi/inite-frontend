import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  width: 50%;
  height: 29rem;
  padding-bottom: 5rem;
  margin-top: 5rem;
  position: absolute;
  top: 45%;
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
    font-weight: 500;

    span {
      font-size: 1.5rem;
      font-weight: 400;
      margin-top: -1rem;
      font-weight: inherit;
    }

    h1 {
      font-size: 2rem;
      font-weight: inherit;
    }
  }
  
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 4rem;
    padding: .2rem;
    background: #000000;
    border-radius: 5px;
    color: #fff;
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: inherit;
    text-decoration: none;
    position: relative;
    top: 5rem;
  }
  @media only screen and (max-width: 640px) {
    a{width: 80%;}
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
  console.log(avatar)
  return (
    <CardContainer>
      <div>
        <img src={avatar} alt="" />
        <h1>{name}</h1>
        <span>{username}</span>
      </div>
      <Link to={`/instagram/profile/${username}`}>View Profile</Link>
    </CardContainer>
  );
};

export default InstagramProfileCard;
