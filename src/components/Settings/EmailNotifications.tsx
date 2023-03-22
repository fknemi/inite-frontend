import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { updateEmailSettings } from "../../api/user/user";
import { notifyEmailAtom, userAtom } from "../../statedrive/atoms";
import DetailsCard from "../DetailsCard/DetailsCard";
import styled from "styled-components";
import { NotificationSettingsContainer } from "./NotificationSettings";
import { Link } from "react-router-dom";

const EmailNotifications = () => {
  const [notifyEmail, setNotifyEmail] = useRecoilState(notifyEmailAtom);
  const [disableButton, setDisableButton] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (user.notifyEmail !== notifyEmail) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }, [notifyEmail]);

  return (
    <NotificationSettingsContainer>
      <DetailsCard>
        <p className="bold">
          Enable Email Notifications
          <span onClick={() => setNotifyEmail(!notifyEmail)}>
            {!notifyEmail ? (
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
        <Link to="" className="left">
          Same notifications will be received in your email as enabled in the
          Notifications Section
        </Link>
      </DetailsCard>
      <button
        disabled={disableButton}
        onClick={async () => {
          const isSuccess = await updateEmailSettings(notifyEmail);
          if (isSuccess) {
            setUser({ ...user, notifyEmail: notifyEmail });
            setDisableButton(true);
          }
        }}
      >
        Save
      </button>
    </NotificationSettingsContainer>
  );
};

export default EmailNotifications;

// <div>
//   <h1>EmailNotifications</h1>

//   <div>
//     <input
//       checked={notifyEmail}
//       type="checkbox"
//       onChange={() => setNotifyEmail(!notifyEmail)}
//     />
//     <button
//       className="disabled:bg-gray-400 w-20 h-7 rounded-md bg-green-400"
// disabled={disableButton}
// onClick={async () => {
//   const isSuccess = await updateEmailSettings(notifyEmail);
//   if (isSuccess) {
//     setUser({ ...user, notifyEmail: notifyEmail });
//     setDisableButton(true);
//   }
// }}
//     >
//       Update
//     </button>
//   </div>
// </div>
