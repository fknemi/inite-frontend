import { io } from "socket.io-client";
import { parseJSON } from "./utils";

export const socket = io(process.env.REACT_APP_API_ENDPOINT as string, {
  auth: {
    "x-token": localStorage.getItem("x-token") || "",
    "x-refresh-token": localStorage.getItem("x-refresh-token") || "",
  },
  transports: ["websocket"],
});

export const updateNotifications = async (data: any) => {
  // if (!Object.keys(data).length) {
  //   socket.emit("status", 400);
  //   return [];
  // }
  

  const oldNotifications: any[] =
    parseJSON(localStorage.getItem("notifications") as string) || [];

  let newNotifications = [...oldNotifications, ...data];
  for (let i = 0; i < newNotifications.length; i++) {
    for (let j = 0; j < newNotifications.length; j++) {
      if (newNotifications[i].id === newNotifications[j].id && i !== j) {
        newNotifications.splice(j, 1);
      }
    }
  }

  localStorage.setItem("notifications", JSON.stringify(newNotifications));
  return newNotifications;
  return [];
};

export const deleteReport = async (id: string) => {
  socket.emit("DELETE_REPORT", id);
};
export const deleteLog = async (id: string) => {
  socket.emit("DELETE_LOG", id);
};
