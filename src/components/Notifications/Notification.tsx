import React, { useState } from "react";
import useEffect from "react";
import { useRecoilState } from "recoil";
import {
  notificationsAtom,
  showNotificationsAtom,
} from "../../statedrive/atoms";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NOTIFICATION_CHANGED_USER } from "../../@types/types";
import styled from "styled-components";

const NotificationCardContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  color: #000;
  padding: 1rem;
  width: 40%;

  p {
    font-size: 1.6rem;
  }

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 200px;
  }
  .avatar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;

    svg {
      width: 3rem;
      height: 2.5rem;
    }
    svg:first-child {
      position: relative;
    }

    > div:first-child {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      gap: 2rem;
      line-height: 1.5;
    }
    > div:last-child {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      gap: 4rem;
    }
  }
`;

const Notification = ({
  notification,
}: {
  notification: NOTIFICATION_CHANGED_USER;
}) => {
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const [showNotifications, setShowNotifications] = useRecoilState(
    showNotificationsAtom
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const changesList = [
    { change: "avatar", word: "Updated their avatar from" },
    { change: "name", word: "Updated their name from" },
    { change: "biography", word: "Updated their biography from" },
    {
      change: "isPrivate",
      word: "Made their account private",
      alt: "Made their account public",
    },
    { change: "followedByCount", word: "Followers Increased from" },
    {
      change: "followingCount",
      word: "Started following more people",
      alt: "Started following less people",
    },
  ];

  React.useEffect(() => {
    let changesMessage: string[] = [];
    changesList.forEach(({ change }) => {
      if (notification[change as keyof NOTIFICATION_CHANGED_USER]) {
        changesMessage.push(change);
      }
    });
    setNotificationMessage(changesMessage.join(", "));
  }, []);

  return (
    <NotificationCardContainer>
      <div>
        <div>
          <img src={notification.originalAvatar} alt="" />
          <p>
            {notification.username} updated their {notificationMessage}
          </p>
        </div>

        <div>
          <svg
            width="31"
            height="27"
            viewBox="0 0 31 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowDetails(!showDetails)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.6974 26.0543L0.394763 0.549927L31 0.549927L15.6974 26.0543Z"
              fill="black"
            />
          </svg>
          <svg
            onClick={() => {
              setNotifications(
                notifications.filter(
                  (notif: NOTIFICATION_CHANGED_USER) =>
                    notification.id !== notif.id
                )
              );
              showNotifications.delete(notification.id);
            }}
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.2824 4.68259C28.2392 3.72576 28.2392 2.17444 27.2824 1.21762C26.3256 0.260794 24.7742 0.260794 23.8174 1.21762L14 11.035L4.18262 1.21762C3.22579 0.260796 1.67447 0.260795 0.717649 1.21762C-0.239176 2.17444 -0.239175 3.72576 0.717649 4.68259L10.535 14.5L0.717618 24.3174C-0.239206 25.2742 -0.239207 26.8256 0.717618 27.7824C1.67444 28.7392 3.22576 28.7392 4.18259 27.7824L14 17.965L23.8174 27.7824C24.7743 28.7392 26.3256 28.7392 27.2824 27.7824C28.2392 26.8256 28.2392 25.2742 27.2824 24.3174L17.465 14.5L27.2824 4.68259Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div style={{ display: showDetails ? "" : "none" }}>
        {changesList.map(
          ({
            change,
            word,
            alt,
          }: {
            change: string;
            word: string;
            alt?: string;
          }) => {
            let changeObject: any =
              notification[change as keyof NOTIFICATION_CHANGED_USER];
            let message = null;

            if (changeObject && changeObject.didChange) {
              if (change === "avatar") {
                return (
                  <p key={change} className={change}>
                    {word}
                    <img src={changeObject.oldValue} alt="" />
                    -&gt;
                    <img src={changeObject.newValue} alt="" />
                  </p>
                );
              }
              if (change === "isPrivate") {
                return <p key={change}>{changeObject.newValue ? word : alt}</p>;
              }
              message = `${word} ${changeObject.oldValue} -> ${changeObject.newValue}`;
            }

            return <p key={change}>{message}</p>;
          }
        )}
      </div>
    </NotificationCardContainer>
  );
};

export default Notification;
