import React, { SetStateAction, useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { REPORT } from "../../../@types/types";
import Report from "./Report";
import { getReports } from "../../../api/admin/admin";
import { readReportsAtom, timeFormatAtom } from "../../../statedrive/atoms";
import { updateReadReports } from "../../../api/user/user";

const Reports = () => {
  const [reports, setReports] = useState<REPORT[] | []>([]);
  const [readReports, setReadReports] = useRecoilState(readReportsAtom);
  const [timeFormat, setTimeFormat] = useRecoilState(timeFormatAtom);
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
        {reports.map((report: REPORT) => {
          return <Report key={report._id} report={report} />;
        })}
      </div>

      <button
        onClick={async () => {
          const didSave = await updateReadReports(readReports);
          if (!didSave) {
            return;
          }

          setReports(
            reports.filter((report: REPORT) => {
              if (!readReports.has(report._id)) {
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
