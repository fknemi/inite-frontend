import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { fetchInstagramUser } from "../../api/instagram/instagram";
import { useRecoilState } from "recoil";
import { instagramUserAtom } from "../../statedrive/atoms";
import { useNavigate } from "react-router-dom";

const SearchInstagramUsers = () => {
  const [username, setUsername] = useState("");
  const [instagramUser, setInstagramUser] = useRecoilState(instagramUserAtom);
  const navigate = useNavigate();

  return (
    <Layout>
      <div>SearchInstagramUsers</div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        className="border border-t-1 border-blue-400"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
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
      </button>
    </Layout>
  );
};

export default SearchInstagramUsers;
