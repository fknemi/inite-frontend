import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { fetchInstagramUser } from "../../api/instagram/instagram";
import { useRecoilState } from "recoil";
import { instagramUserAtom } from "../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InstagramProfileCard from "../../components/InstagramProfileCard/InstagramProfileCard";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffff;

    h1 {
      font-size: 3rem;
      margin-bottom: -1rem;
      font-weight: 500;
    }
    p {
      font-family: "DM Sans";
      font-size: 2rem;
    }
    @media only screen and (max-width: 768px) {
      h1 {
        font-size: 3rem;
      }
      p {
        font-size: 1.6rem;
      }
    }
  }
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    @media only screen and (max-width: 768px) {
      svg {
        display: none;
      }
    }

    svg {
      z-index: 11;
      position: absolute;
      width: 4rem;
      left: 28.5%;

      path {
        fill: #a29d9d;
        opacity: 0.5;
      }
    }
  }

  input {
    position: relative;
    z-index: 10;
    font-family: inherit;
    width: 40vw;
    height: 4rem;
    padding: 0 0 0 4rem; //top right bottom left
    background: #ffffff;
    box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
      0px 0px 3px rgba(27, 31, 35, 0.25);
    border-radius: 5px;
    font-size: 1.6rem;
    &::placeholder {
      color: #a29d9d;
    }
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    input {
      padding: 0 0 0 0.5rem; // top right bottom left
      width: 60vw;
    }
  }
  @media only screen and (max-width: 480px) {
     input {
      width: 80vw;
     } 
    }
  > h1:last-child {
    font-size: 3rem;
    position: absolute;
    font-weight: 500;
    top: 50%;
    color: #ffff;
  }
`;

const SearchInstagramUsers = () => {
  const [username, setUsername] = useState("");
  const [instagramUser, setInstagramUser] = useRecoilState(instagramUserAtom);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleSearch = async () => {
    const { isSuccess, data } = await fetchInstagramUser(username);
    if (isSuccess) {
      setInstagramUser(data);
      localStorage.setItem("instagramUser", JSON.stringify(data));
      setShowProfileCard(true);
    } else {
      setUserNotFound(true);
    }
  };

  return (
    <Layout>
      <SearchContainer>
        <div>
          <h1>Search Instagram Users</h1>
          <p>Find and Follow your Favourite Instagram Creators</p>
        </div>

        <span>
          <input
            type="text"
            value={username}
            placeholder="Search"
            onChange={(e) => {
              setUsername(e.target.value);
              setShowProfileCard(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <svg
            width="80%"
            height="70%"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7071 14.7929C15.3166 14.4024 14.6834 14.4024 14.2929 14.7929C13.9024 15.1834 13.9024 15.8166 14.2929 16.2071L15.7071 14.7929ZM20.2929 22.2071C20.6834 22.5976 21.3166 22.5976 21.7071 22.2071C22.0976 21.8166 22.0976 21.1834 21.7071 20.7929L20.2929 22.2071ZM10 16.5C6.68629 16.5 4 13.8137 4 10.5H2C2 14.9183 5.58172 18.5 10 18.5V16.5ZM4 10.5C4 7.18629 6.68629 4.5 10 4.5V2.5C5.58172 2.5 2 6.08172 2 10.5H4ZM10 4.5C13.3137 4.5 16 7.18629 16 10.5H18C18 6.08172 14.4183 2.5 10 2.5V4.5ZM16 10.5C16 13.8137 13.3137 16.5 10 16.5V18.5C14.4183 18.5 18 14.9183 18 10.5H16ZM14.2929 16.2071L20.2929 22.2071L21.7071 20.7929L15.7071 14.7929L14.2929 16.2071Z"
              fill="black"
            />
          </svg>
        </span>
        {showProfileCard ? (
          <InstagramProfileCard
            name={instagramUser.name}
            username={instagramUser.username}
            avatar={instagramUser.avatar}
          />
        ) : null}
        {userNotFound ? <h1>No User Found</h1> : null}
      </SearchContainer>
    </Layout>
  );
};

export default SearchInstagramUsers;
