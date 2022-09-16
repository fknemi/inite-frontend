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

  return (
    <div>
      <span className="flex flex-row border-4 gap-2">
        <h1>Select</h1>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            if (selectedItems.has(_id)) {
              selectedItems.delete(_id);
              setIsChecked(false);
            } else {
              selectedItems.add(_id);
              setIsChecked(true);
            }
            setDeleteMultipleReportIds(new Set(selectedItems));
          }}
        />
      </span>

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

        <button
          onClick={() => {
            deleteReport(_id);
            if (!readStatus) {
              return setReports(
                reports.filter((report) => {
                  if (report._id === _id) {
                    setDeletedReport(report);
                  } else {
                    return report;
                  }
                })
              );
            }
            return setReadReports(
              readReports.filter((report) => {
                if (report._id === _id) {
                  setDeletedReport(report);
                } else {
                  return report;
                }
              })
            );
          }}
          className="border-4"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Report;
