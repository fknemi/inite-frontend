import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminAtom } from "../../../statedrive/atoms";
import { useNavigate } from "react-router-dom";
import Logs from "../../../components/Admin/Logs/Logs";
import Reports from "../../../components/Admin/Reports/Reports";
import InstagramUsers from "../../../components/Admin/InstagramUsers/InstagramUsers";
import Users from "../../../components/Admin/Users/Users";
import styled from "styled-components";
import { GlobalStyles } from "../../../components/Layout/Layout";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  height: 70vh;

  h1 {
    font-weight: 500;
    font-size: 4rem;
    color: #ffff;
  }
`;
const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 3rem;

  h2 {
    border-radius: 5px;
    padding: 1rem;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
    color: #ffff;
    text-transform: capitalize;
    cursor: pointer;
  }
  h2.selected {
    background: rgba(246, 246, 246, 0.3);
    backdrop-filter: blur(10px);
  }
  span {
    width: 3px;
    height: 6rem;
    background: #fff;
    position: relative;
  }
`;
const ListContainer = styled.div`
  width: 80%;

  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    border-radius: 10px;
    overflow: hidden;
    font-size: 1.6rem;

    table {
      border-collapse: collapse;
    }

    th,
    td {
      border-bottom: 1px solid black;
      padding: 1rem;
      text-align: left;
      img {
        width: 5rem;
        height: 5rem;
        border-radius: 200px;
      }
    }
    tr th:not(tr:first-child th) {
      font-weight: 400;
    }
  }
`;

const AdminDashboard = () => {
  const [admin, setAdmin] = useRecoilState(adminAtom);
  const navigate = useNavigate();
  const [timeFormat, setTimeFormat] = useState(false);
  const [selected, setSelected] = useState("users");
  const featuresList = ["users", "instagram-users", "logs", "reports"];

  return (
    <DashboardContainer>
      <GlobalStyles />
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <FeaturesContainer>
        {featuresList.map((feature) => {
          return (
            <h2
              key={feature}
              className={selected === feature ? "selected" : ""}
              onClick={() => setSelected(feature)}
            >
              {feature.replace("-", " ")}
            </h2>
          );
        })}
      </FeaturesContainer>

      <ListContainer>
        <table>
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Account Created At</th>
              {selected === "users" && <th>Role</th>}
              <th></th>
            </tr>
            {selected === "users" && <Users timeFormat={timeFormat} />}
            {selected === "instagram-users" && (
              <InstagramUsers timeFormat={timeFormat} />
            )}
            {selected === "reports" && (
              <Reports
                isOwner={admin.isOwner as boolean}
                timeFormat={timeFormat}
              />
            )}
            {selected === "logs" && (
              <Logs
                isOwner={admin.isOwner as boolean}
                timeFormat={timeFormat}
              />
            )}
          </tbody>
        </table>
      </ListContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;

{
  /* <h1>AdminDashboard</h1>

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
  <InstagramUsers timeFormat={timeFormat} />
  <Reports isOwner={admin.isOwner as boolean} timeFormat={timeFormat} />

  <Logs isOwner={admin.isOwner as boolean} timeFormat={timeFormat} />
</div> */
}
