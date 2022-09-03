import React from "react";
import { LOG } from "../../../@types/types";
import { getTimestampDateTime } from "../../../common/utils";

const Log = ({ item, timeFormat }: { item: LOG; timeFormat: boolean }) => {
  let log = item;

  return (
    <div>
      {/* <h1>_id: {log._id}</h1> */}
      {/* <h1>text: {log.text}</h1> */}
      {/* <h1>timestamp: {log.timestamp}</h1> */}
      <h1>Log Time: {getTimestampDateTime(log.timestamp, timeFormat)}</h1>
    </div>
  );
};

export default Log;
