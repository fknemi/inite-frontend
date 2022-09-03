import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom} from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";
import Users from "../../../components/Admin/Users/Users";
import InstagramUsers from "../../../components/Admin/InstagramUsers/InstagramUsers";
import Reports from "../../../components/Admin/Reports/Reports";
import Logs from "../../../components/Admin/Logs/Logs";
import PaginatedItems from "../../../components/PaginatedItems/PaginatedItems";
import ReadReports from "../../../components/Admin/ReadReports/ReadReports";



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
        <Users timeFormat={timeFormat} />
        {/* <InstagramUsers timeFormat={timeFormat} /> */}
        {/* <Reports  timeFormat={timeFormat} /> */}
        {/* <ReadReports timeFormat={timeFormat} /> */}
        {/* <Logs timeFormat={timeFormat} /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
