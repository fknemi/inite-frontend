import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LOG } from "../../../@types/types";
import { deleteLog, socket } from "../../../common/socket";
import { getTimestampDateTime } from "../../../common/utils";
import { deleteMultipleLogsIdsAtom, logsAtom } from "../../../statedrive/atoms";

const Log = ({
  item,
  timeFormat,
  selectedItems,
}: {
  item: LOG;
  timeFormat: boolean;
  selectedItems: Set<string>;
}) => {
  let { timestamp, _id } = item;
  const [deletedLog, setDeletedLog] = useState<LOG | undefined>(undefined);
  const [logs, setLogs] = useRecoilState(logsAtom);
  const [isChecked, setIsChecked] = useState(selectedItems.has(_id));
  const setDeleteMultipleLogsIds = useSetRecoilState(deleteMultipleLogsIdsAtom);
  useEffect(() => {
    socket.on("LOG_DELETED", (status: number, id: string) => {
      if (status === 200) {
        setDeletedLog(undefined);
      } else {
        if (deletedLog) {
          return setLogs([...logs, deletedLog]);
        }
      }
    });
  }, [deletedLog]);

  React.useEffect(() => {
    if (selectedItems.has(_id)) {
      return setIsChecked(true);
    }
    setIsChecked(false);
  }, [selectedItems]);

  return (
    <div>
      {/* <h1>_id: {log._id}</h1> */}
      {/* <h1>text: {log.text}</h1> */}
      {/* <h1>timestamp: {log.timestamp}</h1> */}
      <h1>Log Time: {getTimestampDateTime(timestamp, timeFormat)}</h1>
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
            setDeleteMultipleLogsIds(new Set(selectedItems));
          }}
        />
      </span>
      <button
        onClick={() => {
          deleteLog(_id);
          setDeletedLog(item);
          setLogs(logs.filter((log) => log._id !== _id));
        }}
      >
        ❌
      </button>
    </div>
  );
};

export default Log;
