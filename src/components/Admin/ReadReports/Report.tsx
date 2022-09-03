import React, { useEffect } from "react";
import { REPORT } from "../../../@types/types";
import { useRecoilState } from "recoil";
import { readReportsIDsAtom } from "../../../statedrive/atoms";
let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";
const Report = ({ item }: { item: REPORT }) => {
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

  return (
    <div>
      {!readStatus ? (
        <input
          type="checkbox"
          name="read"
          onChange={() => {
            if (readReportsIDs.has(_id)) {
              return readReportsIDs.delete(_id);
            }
            readReportsIDs.add(_id);
            return setReadReportsIDs(readReportsIDs);
          }}
        />
      ) : null}

      <div className="flex flex-col gap-1 font-medium">
        <h1>_id: {_id || "N/A"}</h1>
        <h1>name: {name || "N/A"}</h1>
        <h1>Reported By: {reportedBy || "N/A"}</h1>
        <h1>Reason: {reason || "N/A"}</h1>
        <h1>Description: {description || "N/A"}</h1>
        <h1>Account Reported: {accountReported.username || "N/A"}</h1>
        <h1>Read Status: {readStatus ? "Read" : "Not Read"}</h1>
        <h1>Timestamp: {timestamp || "N/A"}</h1>
      </div>
      <button className={BUTTON_STYLE}>❌</button>
    </div>
  );
};

export default Report;
