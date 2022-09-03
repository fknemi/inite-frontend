import React, { useEffect, useState } from "react";
import { REPORT } from "../../../@types/types";
import { getReadReports } from "../../../api/owner/owner";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import Report from "./Report";
const ReadReports = ({ timeFormat }: { timeFormat: boolean }) => {
  const [readReports, setReadReports] = useState<REPORT[] | []>([]);

  useEffect(() => {
    (async () => {
      const { isSuccess, data } = await getReadReports();
      if (isSuccess) {
        return setReadReports(data);
      }
      return setReadReports([]);
    })();
  }, []);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-1">
        <h1>Reports</h1>

        <div className="flex flex-col gap-4">
          {readReports.length > 0 ? (
            <PaginatedItems
              itemsPerPage={10}
              items={readReports}
              Component={Report}
              timeFormat={timeFormat}
            />
          ) : null}
        </div>

        
      </div>
    </div>
  );
};

export default ReadReports;
