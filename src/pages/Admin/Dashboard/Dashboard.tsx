import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";
import Users from "../../../components/Admin/Users/Users";
import InstagramUsers from "../../../components/Admin/InstagramUsers/InstagramUsers";

const AdminDashboard = () => {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  const [timeFormat, setTimeFormat]: any = useState(true);

  // TODO Get  Reports
  // TODO Get Logs
  // TODO Remove Admin
  // TODO Reset User Password

  return (
    <div>
      <h1>AdminDashboard</h1>

      <div>
        <label>{timeFormat ? "24 Hours" : "12 Hours"}</label>
        <input
          type="checkbox"
          checked={timeFormat}
          onChange={() => setTimeFormat(!timeFormat)}
        />
      </div>

      <div>
        <Users timeFormat={timeFormat} />
        {/* <InstagramUsers timeFormat={timeFormat} /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
