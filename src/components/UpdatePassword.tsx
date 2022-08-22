import React, { useState } from "react";

const UpdatePassword = () => {
  const [passwords, setPasswords] = useState<{
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }>({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { oldPassword, password, confirmPassword } = passwords;

  return (
    <div>
      <h1>UpdatePassword</h1>

      <div className="flex flex-col gap-2">
        {Object.keys(passwords).map((key: string) => {
          let placeholder: any = key.split("Password");
          placeholder =
            placeholder[0].charAt(0).toUpperCase() + placeholder[0].slice(1);
          return (
            <input
              type="text"
              key={key}
              placeholder={
                placeholder !== "Password"
                  ? placeholder + " Password"
                  : placeholder
              }
              className="border-blue-400 rounded-md border-2"
              value={oldPassword}
              onChange={(e: React.SyntheticEvent) =>
                setPasswords({
                  ...passwords,
                  oldPassword: (e.target as HTMLInputElement).value,
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpdatePassword;
