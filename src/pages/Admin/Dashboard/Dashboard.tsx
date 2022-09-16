import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import Logs from "../../../components/Admin/Logs/Logs";
import Reports from "../../../components/Admin/Reports/Reports";
import InstagramUsers from "../../../components/Admin/InstagramUsers/InstagramUsers";
import Users from "../../../components/Admin/Users/Users";

const AdminDashboard = () => {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  const [timeFormat, setTimeFormat] = useState(false);

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
        {/* <Users timeFormat={timeFormat} /> */}
        {/* <InstagramUsers timeFormat={timeFormat} /> */}
        {/* <Reports isOwner={admin.isOwner as boolean} timeFormat={timeFormat} /> */}

        <Logs isOwner={admin.isOwner as boolean} timeFormat={timeFormat} />
      </div>
    </div>
  );
};

export default AdminDashboard;
