import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import Logs from "../../../components/Admin/Logs/Logs";


// TODO Add Delete Log Route for Owner

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
        {/* <ReadReports timeFormat={timeFormat} /> */}
        <Logs timeFormat={timeFormat} />
      </div>
    </div>
  );
};

export default AdminDashboard;
