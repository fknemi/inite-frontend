import React, { useEffect, useState } from "react";
import { REPORT } from "../../../@types/types";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  deleteMultipleReportIdsAtom,
  readReportsAtom,
  readReportsIDsAtom,
  reportsAtom,
} from "../../../statedrive/atoms";
import { deleteReport, socket } from "../../../common/socket";
import { getTimestampDateTime } from "../../../common/utils";
import styled from "styled-components";
import ActionButtons from "./ActionButtons";

const ReportContainer = styled.tr`
  border: 1px solid red;

  svg {
    width: 3rem;
    height: 3rem;
  }
  th svg:nth-child(1) {
    margin-left: 2rem;
    /* border: 2px solid red; */
  }
  th svg:nth-child(2) {
    margin-left: 2rem;
    /* border: 2px solid blue; */
  }
`;

const Report = ({
  item,
  selectedItems,
}: {
  item: REPORT;
  selectedItems: Set<string>;
}) => {
  let {
    _id,
    name,
    reportedBy,
    reason,
    description,
    accountReported,
    readStatus,
    timestamp,
  } = item;
  const [readReportsIDs, setReadReportsIDs] =
    useRecoilState(readReportsIDsAtom);
  const [reports, setReports] = useRecoilState(reportsAtom);
  const [readReports, setReadReports] = useRecoilState(readReportsAtom);
  const [deletedReport, setDeletedReport] = useState<REPORT | undefined>(
    undefined
  );
  const [showActionButtons, setShowActionButtons] = useState(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const setDeleteMultipleReportIds: any = useSetRecoilState(
    deleteMultipleReportIdsAtom
  );

  useEffect(() => {
    socket.on("REPORT_DELETED", (status, id) => {
      if (status === 200) {
        setDeletedReport(undefined);
      } else {
        if (deletedReport && deletedReport.readStatus) {
          return setReadReports([...readReports, deletedReport]);
        }
        return setReports([...reports, deletedReport as REPORT]);
      }
    });
  }, [deletedReport]);

  useEffect(() => {
    if (selectedItems.has(_id)) {
      return setIsChecked(true);
    }
    setIsChecked(false);
  }, [selectedItems]);

  function deleteReport(id: string) {
    setDeletedReport(item);
  }

  function updateReadStatus(id: string, read: boolean) {
    if (readReportsIDs.has(_id)) {
      return readReportsIDs.delete(_id);
    }
    readReportsIDs.add(_id);
    return setReadReportsIDs(readReportsIDs);
  }

  return (
    <ReportContainer>
      <th className="user">
        <h2>{name}</h2>
        <span>@{accountReported.username}</span>
      </th>
      <th className="user">
        <h2>{name}</h2>
        <span>@{reportedBy}</span>
      </th>
      <th>{getTimestampDateTime(timestamp, false)}</th>
      <th className="reason">
        <span>Spam & Threat </span>
      </th>
      <th style={{ border: "2px solid red" }}>
        <span
          onClick={() => {
            if (selectedItems.has(_id)) {
              selectedItems.delete(_id);
              setIsChecked(false);
            } else {
              selectedItems.add(_id);
              setIsChecked(true);
            }
            // setDeleteMultipleReportIds(new Set(selectedItems));
          }}
        >
          {isChecked ? (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22.0252H15C20 22.0252 22 20.0252 22 15.0252V9.02521C22 4.02521 20 2.02521 15 2.02521H9C4 2.02521 2 4.02521 2 9.02521V15.0252C2 20.0252 4 22.0252 9 22.0252Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.75 12.0252L10.58 14.8552L16.25 9.19521"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 22.5126H15C20 22.5126 22 20.5126 22 15.5126V9.5126C22 4.5126 20 2.5126 15 2.5126H9C4 2.5126 2 4.5126 2 9.5126V15.5126C2 20.5126 4 22.5126 9 22.5126Z"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowActionButtons(!showActionButtons)}
        >
          <path
            d="M10 19.5126C10 20.6126 10.9 21.5126 12 21.5126C13.1 21.5126 14 20.6126 14 19.5126C14 18.4126 13.1 17.5126 12 17.5126C10.9 17.5126 10 18.4126 10 19.5126Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M10 5.5126C10 6.6126 10.9 7.5126 12 7.5126C13.1 7.5126 14 6.6126 14 5.5126C14 4.4126 13.1 3.5126 12 3.5126C10.9 3.5126 10 4.4126 10 5.5126Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
          <path
            d="M10 12.5126C10 13.6126 10.9 14.5126 12 14.5126C13.1 14.5126 14 13.6126 14 12.5126C14 11.4126 13.1 10.5126 12 10.5126C10.9 10.5126 10 11.4126 10 12.5126Z"
            stroke="#111111"
            strokeWidth="1.5"
          />
        </svg>
        {showActionButtons && (
          <ActionButtons
            _isBanned={false}
            _isOwner={true}
            username={"Owner"}
            deleteReport={deleteReport}
            updateReadStatus={updateReadStatus}
            report={item}
          />
        )}
      </th>
    </ReportContainer>
  );
};

export default Report;

// <div>
//       <span className="flex flex-row border-4 gap-2">
//         <h1>Select</h1>
//         <input
//           type="checkbox"
//           checked={isChecked}
// onChange={() => {
//   if (selectedItems.has(_id)) {
//     selectedItems.delete(_id);
//     setIsChecked(false);
//   } else {
//     selectedItems.add(_id);
//     setIsChecked(true);
//   }
//   setDeleteMultipleReportIds(new Set(selectedItems));
// }}
//         />
//       </span>

//       {!readStatus ? (
//         <input
//           type="checkbox"
//           name="read"
// onChange={() => {
// if (readReportsIDs.has(_id)) {
//   return readReportsIDs.delete(_id);
// }
// readReportsIDs.add(_id);
// return setReadReportsIDs(readReportsIDs);
// }}
//         />
//       ) : null}

//       <div className="flex flex-col gap-1 font-medium">
//         <h1>_id: {_id || "N/A"}</h1>
//         <h1>name: {name || "N/A"}</h1>
//         <h1>Reported By: {reportedBy || "N/A"}</h1>
//         <h1>Reason: {reason || "N/A"}</h1>
//         <h1>Description: {description || "N/A"}</h1>
//         <h1>Account Reported: {accountReported.username || "N/A"}</h1>
//         <h1>Read Status: {readStatus ? "Read" : "Not Read"}</h1>
//         <h1>Timestamp: {timestamp || "N/A"}</h1>

//         <button
//           onClick={() => {

//             deleteReport(_id);
//             if (!readStatus) {
//               return setReports(
//                 reports.filter((report) => {
//                   if (report._id === _id) {
//                     setDeletedReport(report);
//                   } else {
//                     return report;
//                   }
//                 })
//               );
//             }
//             return setReadReports(
//               readReports.filter((report) => {
//                 if (report._id === _id) {
//                   setDeletedReport(report);
//                 } else {
//                   return report;
//                 }
//               })
//             );
//           }}

//           className="border-4"
//         >
//           ❌
//         </button>
//       </div>
//     </div>
