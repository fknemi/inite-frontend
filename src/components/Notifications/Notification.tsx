import React, { useState } from "react";
import useEffect from "react";
import { useRecoilState } from "recoil";
import {
  notificationsAtom,
  showNotificationsAtom,
} from "../../statedrive/atoms";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NOTIFICATION_CHANGED_USER } from "../../@types/types";

const Notification = ({ notification }: any) => {
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const [showNotifications, setShowNotifications] = useRecoilState(
    showNotificationsAtom
  );

  return (
    <>
      <div className="flex flex-col gap-1 border-2">Notification</div>
      <button
        onClick={() => {
          setNotifications(
            notifications.filter(
              (notif: NOTIFICATION_CHANGED_USER) => notification.id !== notif.id
            )
          );
          showNotifications.delete(notification.id);

          setShowNotifications(new Set(showNotifications));
        }}
      >
        ❌
      </button>
    </>
  );
};

export default Notification;
