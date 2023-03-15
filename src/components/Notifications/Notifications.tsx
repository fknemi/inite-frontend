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
import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  padding-top: 1rem;
  padding-left: 5rem;
  > div:first-child {
    width: 100%;
    h1 {
      font-size: 3rem;
      font-weight: 500;
    }
  }
`;

const NotificationCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const READ_NOTIFICATION_AGE = 720 * 60 * 1000; // 12 hours
// const READ_NOTIFICATION_AGE = 10 * 1000; // 10 seconds
const Notifications = () => {
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  useEffect(() => {
    if (localStorage.getItem("newNotificationsAlert")) {
      localStorage.removeItem("newNotificationsAlert");
    }
    // if (newNotificationsAlert) {
    //   setNewNotificationsAlert(false);
    // }
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
      <Container>
        <div>
          <h1>Notifications</h1>
        </div>
        <NotificationCardsContainer>
          {notifications.map((notification: NOTIFICATION_CHANGED_USER, i) => {
            return (
              <Notification key={notification.id} notification={notification} />
            );
          })}
        </NotificationCardsContainer>
      </Container>
    </Layout>
  );
};

export default Notifications;

// {notifications.map((notification: NOTIFICATION_CHANGED_USER, i) => {
//   return (
//     <Notification
//       key={notification.id}
//       className="flex flex-col gap-1"
//     >
//       <span className="self-start w-56 h-10 border-2 border-blue-300">
//         {notification.id.slice(0, 10)}
//       </span>
//       <button
// onClick={() => {
//   if (showNotifications.has(notification.id)) {
//     showNotifications.delete(notification.id);
//   } else {
//     showNotifications.add(notification.id);
//     notification = {
//       ...notification,
//       read: true,
//       readTimestamp: new Date().getTime(),
//     };

//             setNotifications(
//               notifications.map((notif) => {
//                 if (notif.id === notification.id) {
//                   return notification;
//                 }
//                 return notif;
//               })
//             );
//           }

//           return setShowNotifications(new Set(showNotifications));
//         }}
//       >
//         show
//       </button>
//       {showNotifications.has(notification.id as any) ? (
//         <Notification
//           notification={notification}
//           notifications={notifications}
//           setNotifications={setNotifications}
//         />
//       ) : null}
//     </Notification>
//   );
// })}

// const [showNotifications, setShowNotifications] = useRecoilState(
//   showNotificationsAtom
// );
// const [newNotificationsAlert, setNewNotificationsAlert] = useRecoilState(
//   newNotificationsAlertAtom
// );

// useEffect(() => {
//   if (localStorage.getItem("newNotificationsAlert")) {
//     localStorage.removeItem("newNotificationsAlert");
//   }
//   if (newNotificationsAlert) {
//     setNewNotificationsAlert(false);
//   }
// }, []);

// React.useEffect(() => {
//   localStorage.setItem("notifications", JSON.stringify(notifications));
// }, [notifications]);

// React.useEffect(() => {
//   let tempNotifications = notifications.filter((notification) => {
//     if (
//       notification.read &&
//       new Date().getTime() - notification.readTimestamp >=
//         READ_NOTIFICATION_AGE
//     ) {
//       return;
//     }
//     return notification;
//   });
//   setNotifications(tempNotifications);
// }, []);

// useEffect(() => {
//   setNotifications([
//     {
//       type: "CHANGED_USER",
//       username: "loser",
//       name: {
//         didChange: true,
//         oldValue: "apple",
//         newValue: "Hi IDK",
//       },
//       biography: {
//         didChange: true,
//         oldValue: "pooper",
//         newValue: "OOOOOOOOOOOOOOO",
//       },
//       isPrivate: {
//         didChange: true,
//         oldValue: false,
//         newValue: true,
//       },
//       followedByCount: {
//         didChange: true,
//         oldValue: 178,
//         newValue: 745,
//       },
//       followingCount: {
//         didChange: true,
//         oldValue: 200,
//         newValue: 524,
//       },
//       avatar: {
//         didChange: true,
//         oldValue:
//           "https://avatars.githubusercontent.com/u/64571343?s=400&u=333faad5070566e4b0a2b436bc0e5f4187f5607b&v=4",
//         newValue:
//           "https://avatars.githubusercontent.com/u/64571343?s=400&u=333faad5070566e4b0a2b436bc0e5f4187f5607b&v=4",
//       },

//       timestamp: 1678898640948,
//       id: "adjjdjdhjhdkkhdh37739",
//     },
//   ]);
// }, []);
