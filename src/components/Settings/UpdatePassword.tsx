import React, { useEffect, useState } from "react";
import { PASSWORD_REGEX } from "../../common/regex";
import { logout, updatePassword } from "../../api/user/user";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [passwords, setPasswords] = useState<{
    [key: string]: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate()

  let { oldPassword, newPassword, confirmPassword } = passwords;
  useEffect(() => {
    if (
      oldPassword &&
      PASSWORD_REGEX.test(newPassword) &&
      newPassword === confirmPassword
    ) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }, [passwords]);

  return (
    <div>
      <h1>UpdatePassword</h1>

      <div className="flex flex-col gap-2">
        {Object.keys(passwords).map((key: string) => {
          let placeholder: string[] | string = key.split("Password");
          placeholder =
            placeholder[0].charAt(0).toUpperCase() + placeholder[0].slice(1);
          return (
            <input
              type="password"
              key={key}
              placeholder={
                placeholder !== "Password"
                  ? placeholder + " Password"
                  : placeholder
              }
              className="border-blue-400 rounded-md border-2"
              value={passwords[key]}
              onChange={(e: React.SyntheticEvent) =>
                setPasswords({
                  ...passwords,
                  [key]: (e.target as HTMLInputElement).value,
                })
              }
            />
          );
        })}
      </div>

      <button
        disabled={disableButton}
        className="mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400"
        onClick={async () => {
          const { isSuccess, _message } = await updatePassword(
            oldPassword,
            newPassword,
            confirmPassword
          );
          
          if (!isSuccess && _message) {
            alert(_message);
          }
          if(isSuccess){
            logout()
            return navigate("/account/login")
          }
          setDisableButton(true);
          setPasswords({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }}
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
