import React from "react";
import { LOG } from "../../../@types/types";

const Log = ({ item }: { item: LOG }) => {
  let log = item
  

  
  return (
    <div>
      <h1>_id: {log._id}</h1>
      <h1>text: {log.text}</h1>
      <h1>timestamp: {log.timestamp}</h1>
    </div>
  );
};

export default Log;
