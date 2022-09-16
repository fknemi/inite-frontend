import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { REPORT } from "../../../@types/types";
import Report from "./Report";
import { getReports } from "../../../api/admin/admin";
import {
  deleteMultipleReportIdsAtom,
  readReportsAtom,
  readReportsIDsAtom,
  reportsAtom,
} from "../../../statedrive/atoms";
import { parseJSON } from "../../../common/utils";
import { updateReadReports } from "../../../api/user/user";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import {
  getReadReports,
  deleteMultipleReports,
} from "../../../api/owner/owner";

const Reports = ({
  isOwner,
  timeFormat,
}: {
  isOwner: boolean;
  timeFormat: boolean;
}) => {
  const [reports, setReports] = useRecoilState(reportsAtom);
  const [readReports, setReadReports] = useRecoilState(readReportsAtom);
  const [readReportsIDs, setReadReportsIDs] =
    useRecoilState(readReportsIDsAtom);
  const [toggleReports, setToggleReports] = useState<boolean>(false);
  const [deleteMultipleReportIds, setDeleteMultipleReportIds] = useRecoilState(
    deleteMultipleReportIdsAtom
  );
  useEffect(() => {
    (async () => {
      if (isOwner && !toggleReports) {
        const { isSuccess, data } = await getReports();
        if (isSuccess) {
          setDeleteMultipleReportIds(new Set([]));
          return setReports(data);
        }
        return setReports([]);
      }
    })();
  }, [toggleReports]);

  useEffect(() => {
    (async () => {
      if (toggleReports) {
        const { isSuccess, data }: any = await getReadReports();
        if (isSuccess) {
          sessionStorage.setItem("readReports", JSON.stringify(data));
          setDeleteMultipleReportIds(new Set([]));
          return setReadReports(data);
        }
      }
    })();
  }, [toggleReports]);

  return (
    <div className="mb-10 flex flex-col gap-1">
      <h1>Reports</h1>
      {isOwner ? (
        <button
          onClick={async () => {
            const { isSuccess, wasAuthorized } = await deleteMultipleReports(
              isOwner,
              [...deleteMultipleReportIds]
            );
            if (!wasAuthorized) {
              return alert("Unauthorized User");
            }
            if (!isSuccess) {
              return alert("Failed Deleting Reports");
            }

            if (!toggleReports) {
              setReports(
                reports.filter(
                  (report) => !deleteMultipleReportIds.has(report._id)
                )
              );
            } else {
              setReadReports(
                readReports.filter(
                  (report) => !deleteMultipleReportIds.has(report._id)
                )
              );
            }

            setDeleteMultipleReportIds(new Set([]));
          }}
        >
          <h2>❌❌ delete Selected</h2>
        </button>
      ) : null}

      {isOwner ? (
        <button
          onClick={() => {
            if (
              !toggleReports &&
              deleteMultipleReportIds.size === reports.length
            ) {
              return setDeleteMultipleReportIds(new Set([]));
            }
            if (
              toggleReports &&
              deleteMultipleReportIds.size === readReports.length
            ) {
              return setDeleteMultipleReportIds(new Set([]));
            }
            if (!toggleReports) {
              for (let i = 0; i < reports.length; i++) {
                deleteMultipleReportIds.add(reports[i]._id);
              }
            } else {
              for (let i = 0; i < readReports.length; i++) {
                deleteMultipleReportIds.add(readReports[i]._id);
              }
            }
            setDeleteMultipleReportIds(new Set(deleteMultipleReportIds));
          }}
        >
          <h2>📝 Select All</h2>
        </button>
      ) : null}

      {isOwner ? (
        <button onClick={() => setToggleReports(!toggleReports)}>
          {toggleReports ? "Old" : "New"}
        </button>
      ) : null}
      <div className={`flex flex-col gap-4`}>
        {!toggleReports && reports.length > 0 ? (
          <PaginatedItems
            itemsPerPage={10}
            items={reports}
            Component={Report}
            timeFormat={timeFormat}
            selectedItems={deleteMultipleReportIds}
          />
        ) : null}

        {toggleReports && readReports.length > 0 ? (
          <PaginatedItems
            itemsPerPage={10}
            items={readReports}
            Component={Report}
            timeFormat={timeFormat}
            selectedItems={deleteMultipleReportIds}
          />
        ) : null}
      </div>

      <button
        onClick={async () => {
          const didSave = await updateReadReports(readReportsIDs);
          if (!didSave) {
            return;
          }

          setReports(
            reports.filter((report: REPORT) => {
              return !readReportsIDs.has(report._id);
            })
          );
        }}
      >
        save
      </button>
    </div>
  );
};

export default Reports;
