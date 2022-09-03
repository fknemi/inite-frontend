import React from "react";
import { io } from "socket.io-client";
import { parseJSON } from "../statedrive/atoms";

export const socket = io("http://localhost:5000", {
  auth: {
    "x-token": localStorage.getItem("x-token") || "",
    "x-refresh-token": localStorage.getItem("x-refresh-token") || "",
  },
});

export const updateNotifications = async (data: any) => {
  if (!Object.keys(data).length) {
    socket.emit("status", 400);
    return false;
  }

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

  // localStorage.setItem("notifications", JSON.stringify(newNotifications));
  return newNotifications;
};
