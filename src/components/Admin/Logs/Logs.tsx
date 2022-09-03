import React from "react";
import { LOG } from "../../../@types/types";
import useState from "react";
import { getLogs } from "../../../api/owner/owner";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import Log from "./Log";

const Logs = ({ timeFormat }: { timeFormat: boolean }) => {
  const [logs, setLogs] = React.useState<LOG[] | []>([]);
  

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
        <PaginatedItems itemsPerPage={10} items={logs} Component={Log} timeFormat={timeFormat} />
      ) : null}
    </div>
  );
};

export default Logs;
