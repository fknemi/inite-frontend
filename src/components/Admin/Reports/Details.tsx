import React, { useEffect, useState } from "react";
import { REPORT } from "../../../@types/types";
import styled from "styled-components";
import { getTimestampDateTime } from "../../../common/utils";
let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";

const DetailsContainer = styled.div`
  position: absolute;
  left: -44rem;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  width: 40rem;
  padding: 1rem;
  tr {
    width: 100%;
    th:last-child {
      font-weight: 500;
    }
  }

  th,
  td {
    border-bottom: none !important;
  }

  p {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 500;
    background: rgba(90, 254, 63, 0.4);
    border-radius: 5px;
    padding: 1rem;
  }
`;

const Details = ({
  reportedBy,
  accountReported,
  timestamp,
  reason,
  description,
  name,
}: REPORT) => {
  return (
    <DetailsContainer>
      <table>
        <tr>
          <th>Reported By</th>
          <th>
            {name} ({reportedBy})
          </th>
        </tr>

        <tr>
          <th>Reported User</th>
          <th>
            {name} ({accountReported.username})
          </th>
        </tr>
        <tr>
          <th>Reported At</th>
          <th>{getTimestampDateTime(timestamp, false)}</th>
        </tr>
        <tr>
          <th>Reason</th>
          <th className="reason">
            <span>{reason}</span>
          </th>
        </tr>
      </table>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
        magna a faucibus malesuada, mi lacus tincidunt est, at euismod risus
        ligula eu risus. Sed euismod, nisl id tempor tincidunt, augue nulla
        malesuada velit, vel euismod velit velit id velit. Nam suscipit gravida
        odio, id malesuada nisl malesuada eu.
      </p>
    </DetailsContainer>
  );
};

export default Details;
