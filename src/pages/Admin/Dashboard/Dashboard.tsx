import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom, timeFormatAtom } from '../../../statedrive/atoms';
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../../../@types/types";
import Users from "../../../components/Admin/Users/Users";
import InstagramUsers from "../../../components/Admin/InstagramUsers/InstagramUsers";
import Reports from "../../../components/Admin/Reports/Reports";
import Logs from "../../../components/Admin/Logs/Logs";
import PaginatedItems from "../../../components/PaginatedItems/PaginatedItems";

const AdminDashboard = () => {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  const [timeFormat, setTimeFormat] = useRecoilState(timeFormatAtom);

  // TODO Pass the timeFormat to ItemsComponent via Props
  
  

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
        {/* <Reports/> */}
        {/* <Logs timeFormat={timeFormat}/> */}
        
      </div>
    </div>
  );
};

export default AdminDashboard;
