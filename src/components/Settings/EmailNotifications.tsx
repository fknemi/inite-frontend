import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { updateEmailSettings } from "../../api/user/user";
import { notifyEmailAtom, userAtom } from "../../statedrive/atoms";

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
    <div>
      <h1>EmailNotifications</h1>

      <div>
        <input
          checked={notifyEmail}
          type="checkbox"
          onChange={() => setNotifyEmail(!notifyEmail)}
        />
        <button
          className="disabled:bg-gray-400 w-20 h-7 rounded-md bg-green-400"
          disabled={disableButton}
          onClick={async () => {
            const isSuccess = await updateEmailSettings(notifyEmail);
            if (isSuccess) {
              setUser({ ...user, notifyEmail: notifyEmail });
              setDisableButton(true);
            }
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EmailNotifications;
