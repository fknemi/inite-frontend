import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchUser } from "../../api/user/user";
import Layout from "../../components/Layout";
import { followingAtom, tokensAtom, userAtom } from "../../statedrive/atoms";

const Dashboard = () => {
  const [user, setUser] = useRecoilState(userAtom);
  // const [{ token, refreshToken }, setTokens] = useRecoilState(tokensAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);
  // const navigate = useNavigate();

  return (
    <Layout>
      <div className="ml-5">
        <h1>Dashboard</h1>
        {JSON.stringify(user)}
        <br />
        {JSON.stringify(following)}
      </div>
    </Layout>
  );
};

export default Dashboard;
