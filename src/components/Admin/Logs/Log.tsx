import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LOG } from "../../../@types/types";
import { deleteLog, socket } from "../../../common/socket";
import { getTimestampDateTime } from "../../../common/utils";
import { logsAtom } from "../../../statedrive/atoms";

const Log = ({ item, timeFormat }: { item: LOG; timeFormat: boolean }) => {
  let { timestamp, _id } = item;
  const [deletedLog, setDeletedLog] = useState<LOG | undefined>(undefined);
  const [logs, setLogs] = useRecoilState(logsAtom);
  useEffect(() => {
    socket.on("REPORT_DELETED", (status: number, id: string) => {
      if (status === 200) {
        setDeletedLog(undefined);
      } else {
        if (deletedLog) {
          return setLogs([...logs, deletedLog]);
        }
      }
    });
  }, [deletedLog]);

  return (
    <div>
      {/* <h1>_id: {log._id}</h1> */}
      {/* <h1>text: {log.text}</h1> */}
      {/* <h1>timestamp: {log.timestamp}</h1> */}
      <h1>Log Time: {getTimestampDateTime(timestamp, timeFormat)}</h1>
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
