import React, { SetStateAction, useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { REPORT } from "../../../@types/types";
import Report from "./Report";
import { getReports } from "../../../api/admin/admin";
import { readReportsIDsAtom } from "../../../statedrive/atoms";
import { updateReadReports } from "../../../api/user/user";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";

const Reports = ({timeFormat}: {timeFormat: boolean}) => {
  const [reports, setReports] = useState<REPORT[] | []>([]);
  const [readReportsIDs, setReadReportsIDs] = useRecoilState(readReportsIDsAtom);
  useEffect(() => {
    (async () => {
      const { isSuccess, data } = await getReports();
      if (isSuccess) {
        return setReports(data);
      }
      return setReports([]);
    })();
  }, []);

  return (
    <div className="mb-10 flex flex-col gap-1">
      <h1>Reports</h1>

      <div className="flex flex-col gap-4">
        {reports.length > 0 ? (
          <PaginatedItems
            itemsPerPage={10}
            items={reports}
            Component={Report}
            timeFormat={timeFormat}
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
              if (!readReportsIDs.has(report._id)) {
                return report;
              }
              return;
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
