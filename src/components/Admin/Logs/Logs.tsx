import React, { useState, useEffect } from "react";
import { deleteMultipleLogs, getLogs } from "../../../api/owner/owner";
import { logsAtom, deleteMultipleLogsIdsAtom } from "../../../statedrive/atoms";
import PaginatedItems from "../../PaginatedItems/PaginatedItems";
import Log from "./Log";
import { useRecoilState } from "recoil";
import { LOG } from "../../../@types/types";

const Logs = ({
  isOwner,
  timeFormat,
}: {
  isOwner: boolean;
  timeFormat: boolean;
}) => {
  const [logs, setLogs] = useRecoilState(logsAtom);
  const [deleteMultipleLogsIds, setDeleteMultipleLogsIds] = useRecoilState(
    deleteMultipleLogsIdsAtom
  );

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
      <div className="flex flex-col gap-2">
        {isOwner ? (
          <button
            onClick={async () => {
              if (!deleteMultipleLogsIds) {
                return;
              }
              const { isSuccess, wasAuthorized } = await deleteMultipleLogs(
                isOwner,
                [...deleteMultipleLogsIds]
              );
              if (!isSuccess && !wasAuthorized) {
                alert("UNAUTHORIZED ACTION");
              }
              if (!isSuccess) {
                return alert("Something went wrong");
              }
              setLogs(
                logs.filter((log: LOG) => !deleteMultipleLogsIds.has(log._id))
              );
            }}
          >
            Delete Multiple ❌❌
          </button>
        ) : null}
        {isOwner ? (
          <button
            onClick={() => {
              if (deleteMultipleLogsIds.size === logs.length) {
                return setDeleteMultipleLogsIds(new Set([]));
              }
              for (let i = 0; i < logs.length; i++) {
                deleteMultipleLogsIds.add(logs[i]._id);
              }

              setDeleteMultipleLogsIds(new Set(deleteMultipleLogsIds));
            }}
          >
            <h2>📝 Select All</h2>
          </button>
        ) : null}
      </div>
      {logs.length > 0 ? (
        <PaginatedItems
          itemsPerPage={10}
          items={logs}
          Component={Log}
          timeFormat={timeFormat}
          selectedItems={deleteMultipleLogsIds}
        />
      ) : null}
    </div>
  );
};

export default Logs;
