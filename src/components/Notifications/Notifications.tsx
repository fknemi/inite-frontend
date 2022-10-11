import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useRecoilState, SetterOrUpdater, useSetRecoilState } from "recoil";
import {
  newNotificationsAlertAtom,
  notificationsAtom,
  showNotificationsAtom,
} from "../../statedrive/atoms";

import { NOTIFICATION_CHANGED_USER } from "../../@types/types";
import Notification from "./Notification";
import { Link } from "react-router-dom";
// const READ_NOTIFICATION_AGE = 720 * 60 * 1000; // 12 hours
const READ_NOTIFICATION_AGE = 10 * 1000; // 10 seconds
const Notifications = () => {
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const [showNotifications, setShowNotifications] = useRecoilState(
    showNotificationsAtom
  );
  const [newNotificationsAlert, setNewNotificationsAlert] = useRecoilState(
    newNotificationsAlertAtom
  );

  useEffect(() => {
    if (localStorage.getItem("newNotificationsAlert")) {
      localStorage.removeItem("newNotificationsAlert");
    }
    if (newNotificationsAlert) {
      setNewNotificationsAlert(false);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    let tempNotifications = notifications.filter((notification) => {
      if (
        notification.read &&
        new Date().getTime() - notification.readTimestamp >=
          READ_NOTIFICATION_AGE
      ) {
        return;
      }
      return notification;
    });

    setNotifications(tempNotifications);
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="mb-5 font-bold text-lg">Notifications</h1>

        <div className="flex flex-col gap-2">
          {notifications.map((notification: NOTIFICATION_CHANGED_USER, i) => {
            return (
              <div key={notification.id} className="flex flex-col gap-1">
                <span className="self-start w-56 h-10 border-2 border-blue-300">
                  {notification.id.slice(0, 10)}
                </span>
                <button
                  onClick={() => {
                    if (showNotifications.has(notification.id)) {
                      showNotifications.delete(notification.id);
                    } else {
                      showNotifications.add(notification.id);
                      notification = {
                        ...notification,
                        read: true,
                        readTimestamp: new Date().getTime(),
                      };

                      setNotifications(
                        notifications.map((notif) => {
                          if (notif.id === notification.id) {
                            return notification;
                          }
                          return notif;
                        })
                      );
                    }

                    return setShowNotifications(new Set(showNotifications));
                  }}
                >
                  show
                </button>
                {showNotifications.has(notification.id as any) ? (
                  <Notification
                    notification={notification}
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
