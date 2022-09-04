import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { REPORT } from "../../../@types/types";
import Report from "./Report";
import { getReports } from "../../../api/admin/admin";
import {
  readReportsAtom,
  readReportsIDsAtom,
  reportsAtom,
} from "../../../statedrive/atoms";
import { parseJSON } from "../../../common/utils";
import { updateReadReports } from "../../../api/user/user";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import { getReadReports } from "../../../api/owner/owner";

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
  useEffect(() => {
    (async () => {
      if (isOwner && !toggleReports) {
        const { isSuccess, data } = await getReports();
        if (isSuccess) {
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
          return setReadReports(data);
        }
      }
    })();
  }, [toggleReports]);

  return (
    <div className="mb-10 flex flex-col gap-1">
      <h1>Reports</h1>
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
          />
        ) : null}

        {toggleReports && readReports.length > 0 ? (
          <PaginatedItems
            itemsPerPage={10}
            items={readReports}
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
