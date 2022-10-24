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
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
  }
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      position: absolute;
      right: calc(35% - 9.8%);
      transform: rotate(10deg);
    }
    width: 100%;
  }
  input {
    font-family: inherit;
    width: 50%;
    height: 4rem;
    padding: 0 0 0 1rem;
    background: #ffffff;
    border: 2px solid #306ee6;
    box-shadow: 0px 0px 20px 2px rgba(48, 110, 230, 0.25);
    border-radius: 5px;
    font-size: 1.6rem;
    &::placeholder {
      color: #5c6877;
    }
    outline: none;
  }
  > h1:last-child {
    margin-top: 3rem;
    font-size: 3rem;
    color: #f84747;
    font-weight: 500;
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
        <h1>Search</h1>

        <span>
          <input
            type="text"
            value={username}
            placeholder="Search Instagram User"
            className="border border-t-1 border-blue-400"
            onChange={(e) => {
              setUsername(e.target.value);
              setShowProfileCard(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <svg
            width="24"
            height="25"
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
{
  /* <button
          className="bg-blue-500 ml-10"
          onClick={async () => {
            const { isSuccess, data } = await fetchInstagramUser(username);
            if (isSuccess) {
              setInstagramUser(data);
              localStorage.setItem("instagramUser", JSON.stringify(data));
              return navigate(`/instagram/profile/${data.username}`);
            }
          }}
        >
          Search
        </button> */
}
