import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchUser } from "../../api/user/user";
import Layout from "../../components/Layout/Layout";
import { followingAtom, tokensAtom, userAtom } from "../../statedrive/atoms";
import styled from "styled-components";
import DashboardProfileCard from "../../components/DashboardProfileCard/DashboardProfileCard";
import { INSTAGRAM_USER } from "../../@types/types";

export const DashboardContainer = styled.div`
  color: #fff;
  padding-top: 1rem;
  > div:first-child {
    width: 100%;
    h1 {
      font-size: 3rem;
      font-weight: 500;
      text-align: center;
    }
  }
`;
export const DashboardCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Layout>
      <DashboardContainer>
        <div>
          <h1>Dashboard</h1>
        </div>

        <DashboardCardsContainer>
          {user.following.map((followedUser: INSTAGRAM_USER) => {
            return (
              <DashboardProfileCard
                key={followedUser.avatar}
                {...followedUser}
              />
            );
          })}
        </DashboardCardsContainer>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
