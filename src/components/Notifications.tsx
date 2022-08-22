import React, { useEffect } from "react";
import {
  NotificationSettings,
  NotificationsDescriptions,
} from "../@types/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom, notificationSettingsAtom } from "../statedrive/atoms";
import { updateNotificationSettings } from "../api/user/user";

const Notifications = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [notificationSettings, setNotificationSettings] =
    useRecoilState<NotificationSettings>(notificationSettingsAtom);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const notifs: NotificationsDescriptions = {
    newAccountNameChange: { name: "Account Name Change", desc: "..." },
    newPosts: { name: "New Posts", desc: "..." },
    newFollowers: { name: "New Followers", desc: "..." },
    startedFollowingNewUsers: { name: "Following New Users", desc: "..." },
    newBiography: { name: "New Biography", desc: "..." },
    newAvatar: { name: "New Avatar", desc: "..." },
    newAccountPrivacyChange: {
      name: "Account Privacy Status Change",
      desc: "...",
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
    <div className="ml-10  mt-5">
      <div className="flex flex-col gap-2">
        {Object.keys(notifs).map((notif) => {
          return (
            <div className="flex flex-col" key={notif}>
              <div className="gap-2 flex flex-row">
                <input
                  type="checkbox"
                  name={notif}
                  checked={notificationSettings[notif]}
                  onChange={(e) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      [notif]: e.target.checked,
                    })
                  }
                />
                {notifs[notif].name}
              </div>

              <span className="">{notifs[notif].desc}</span>
            </div>
          );
        })}
      </div>
      <button
        disabled={disableButton}
        onClick={async () => {
          if (await updateNotificationSettings(notificationSettings)) {
            setUser({ ...user, notifications: notificationSettings });
          }
          setDisableButton(true);
        }}
        className="disabled:bg-gray-400 w-20 h-7 rounded-md bg-green-400"
      >
        Update
      </button>
    </div>
  );
};

export default Notifications;
