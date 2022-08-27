import React, { useEffect } from "react";
import { REPORT } from "../../../@types/types";
import { useRecoilState } from "recoil";
import { readReportsAtom } from "../../../statedrive/atoms";

const Report = ({ report }: { report: REPORT }) => {
  let {
    _id,
    name,
    reportedBy,
    reason,
    description,
    accountReported,
    readStatus,
    timestamp,
  } = report;
  const [readReports, setReadReports] = useRecoilState(readReportsAtom);

  useEffect(() => {}, []);

  return (
    <div>
      {
!readStatus ?
        <input
        type="checkbox"
        name="read"
        onChange={() => {
          if (readReports.has(_id)) {
            return readReports.delete(_id);
          }
          readReports.add(_id);
          return setReadReports(readReports);
        }}
        />
      : null}
      
      <div className="flex flex-col gap-1 font-medium">
        <h1>_id: {_id}</h1>
        <h1>name: {name}</h1>
        <h1>Reported By: {reportedBy}</h1>
        <h1>Reason: {reason}</h1>
        <h1>Description: {description}</h1>
        <h1>Account Reported: {accountReported.username}</h1>
        <h1>Read Status: {readStatus ? "Read" : "Not Read"}</h1>
        <h1>Timestamp: {timestamp}</h1>
      </div>
    </div>
  );
};

export default Report;
