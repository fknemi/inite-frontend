import React, { useState, useEffect } from "react";
import { getLogs } from "../../../api/owner/owner";
import { logsAtom } from "../../../statedrive/atoms";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import Log from "./Log";
import { useRecoilState } from "recoil";
import { LOG } from "../../../@types/types";

const Logs = ({ timeFormat }: { timeFormat: boolean }) => {
  const [logs, setLogs] = useRecoilState(logsAtom);
  

  React.useEffect(() => {
    (async () => {
      const { isSuccess, wasAuthorized, data } = await getLogs();
      if (!isSuccess && !wasAuthorized) {
        alert("UNAUTHORIZED ACTION");
      }
      return setLogs(data);
    })();
  }, []);

  
  return (
    <div>
      <h1 className="bold">Logs</h1>
      {logs.length > 0 ? (
        <PaginatedItems
          itemsPerPage={10}
          items={logs}
          Component={Log}
          timeFormat={timeFormat}
        />
      ) : null}
    </div>
  );
};

export default Logs;
