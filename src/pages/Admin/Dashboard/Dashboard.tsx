import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";

const AdminDashboard = () => {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();

  return (
    <div>
      <h1>AdminDashboard</h1>
      <div>
        {/* Ban User */}
        {/* Unban User */}
        {/* Ban InstagramUser */}
        {/* Unban InstagramUser */}
        {/* <Reports /> */}
        {/* <ViewInstagramUser /> */}
        {/* <ListInstagramUser /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
