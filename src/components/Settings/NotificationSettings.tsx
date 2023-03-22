import React, { useEffect } from "react";
import {
  NotificationSettings,
  NotificationsDescriptions,
} from "../../@types/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, notificationSettingsAtom } from "../../statedrive/atoms";
import { updateNotificationSettings } from "../../api/user/user";
import DetailsCard from "../DetailsCard/DetailsCard";
import styled from "styled-components";

export const NotificationSettingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  button {
    background: #017aff;
    width: 12rem;
    height: 3rem;
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
    font-size: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    align-self: center;
    margin-right: 20rem;
    border: none;
  }
  button:disabled {
    display: none;
  }
`;

const NotificationSettingsComponent = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [notificationSettings, setNotificationSettings] =
    useRecoilState<NotificationSettings>(notificationSettingsAtom);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const notifs: NotificationsDescriptions = {
    newAccountNameChange: { name: "Followed Account Name Change" },
    newPosts: { name: "Followed Account New Posts" },
    newFollowers: { name: "Followed Account New Followers" },
    startedFollowingNewUsers: { name: "Followed Account Following New Users" },
    newBiography: { name: "Followed Account New Biography" },
    newAvatar: { name: "Followed Account New Avatar" },
    newAccountPrivacyChange: {
      name: "Followed Account Status",
    },
  };

  useEffect(() => {
    if (
      JSON.stringify(notificationSettings) !==
      JSON.stringify(user.notifications)
    ) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }, [notificationSettings]);

  return (
    <NotificationSettingsContainer>
      <DetailsCard>
        {Object.keys(notifs).map((notif) => {
          return (
            <p key={notif} className="bold">
              {notifs[notif].name}

              <span
                onClick={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    [notif]: !notificationSettings[notif],
                  })
                }
              >
                {notificationSettings[notif] ? (
                  <svg
                    width="44"
                    height="24"
                    viewBox="0 0 44 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="24" rx="12" fill="#1F2937" />
                    <circle cx="12" cy="12" r="10" fill="white" />
                  </svg>
                ) : (
                  <svg
                    width="44"
                    height="24"
                    viewBox="0 0 44 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="24" rx="12" fill="#017AFF" />
                    <circle cx="32" cy="12" r="10" fill="white" />
                  </svg>
                )}
              </span>
            </p>
          );
        })}
      </DetailsCard>
      <button
        disabled={disableButton}
        onClick={async () => {
          if (await updateNotificationSettings(notificationSettings)) {
            setUser({ ...user, notifications: notificationSettings });
          }
          setDisableButton(true);
        }}
      >
        Save
      </button>
    </NotificationSettingsContainer>
  );
};

export default NotificationSettingsComponent;

// <div className="ml-10  mt-5">
//       <div className="flex flex-col gap-2">
//         {Object.keys(notifs).map((notif) => {
//           return (
//             <div className="flex flex-col" key={notif}>
//               <div className="gap-2 flex flex-row">
//                 <input
//                   type="checkbox"
//                   name={notif}
//                   checked={notificationSettings[notif]}
// onChange={() =>
//   setNotificationSettings({
//     ...notificationSettings,
//     [notif]: !notificationSettings[notif],
//   })
//                   }
//                 />
//                 {notifs[notif].name}
//               </div>

//               <span className="">{notifs[notif].desc}</span>
//             </div>
//           );
//         })}
//       </div>
//       <button
// disabled={disableButton}
// onClick={async () => {
//   if (await updateNotificationSettings(notificationSettings)) {
//     setUser({ ...user, notifications: notificationSettings });
//   }
//   setDisableButton(true);
// }}
//         className="disabled:bg-gray-400 w-20 h-7 rounded-md bg-green-400"
//       >
//         Update
//       </button>
//     </div>
