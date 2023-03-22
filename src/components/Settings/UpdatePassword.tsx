import React, { useEffect, useState } from "react";
import { PASSWORD_REGEX } from "../../common/regex";
import { logout, updatePassword } from "../../api/user/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const UpdatePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
  div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 2rem;
    input {
      font-family: inherit;
      width: 70%;
      height: 42px;
      padding: 0 0 0 1rem;
      background: #ffffff;
      font-size: 1.6rem;
      outline-color: transparent;
      border-radius: 5px;
      border-color: transparent;
      box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
        0px 0px 3px rgba(27, 31, 35, 0.25);

      &::placeholder {
        color: #a29d9d;
      }
      outline: none;
    }
  }

  button {
    
    height: 4rem;
    border-radius: 5px;
    border-color: transparent;
    color: #fff;
    font-family: inherit;
    font-weight: 500;
    background: #152e4d;
    font-size: 1.6rem;
    white-space: nowrap;
    margin-right: 20rem;
  }
`;

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
  const navigate = useNavigate();

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
    <UpdatePasswordContainer>
      <div>
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
        onClick={async () => {
          const { isSuccess, _message } = await updatePassword(
            oldPassword,
            newPassword,
            confirmPassword
          );

          if (!isSuccess && _message) {
            alert(_message);
          }
          if (isSuccess) {
            logout();
            return navigate("/account/login");
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
    </UpdatePasswordContainer>
  );
};

export default UpdatePassword;

// <div>
//   <h1>UpdatePassword</h1>

//   <div className="flex flex-col gap-2">
//     {Object.keys(passwords).map((key: string) => {
//       let placeholder: string[] | string = key.split("Password");
//       placeholder =
//         placeholder[0].charAt(0).toUpperCase() + placeholder[0].slice(1);
//       return (
//         <input
//           type="password"
//           key={key}
//           placeholder={
//             placeholder !== "Password"
//               ? placeholder + " Password"
//               : placeholder
//           }
//           className="border-blue-400 rounded-md border-2"
//           value={passwords[key]}
//           onChange={(e: React.SyntheticEvent) =>
//             setPasswords({
//               ...passwords,
//               [key]: (e.target as HTMLInputElement).value,
//             })
//           }
//         />
//       );
//     })}
//   </div>

//   <button
//     disabled={disableButton}
//     className="mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400"
//     onClick={async () => {
//       const { isSuccess, _message } = await updatePassword(
//         oldPassword,
//         newPassword,
//         confirmPassword
//       );

//       if (!isSuccess && _message) {
//         alert(_message);
//       }
//       if(isSuccess){
//         logout()
//         return navigate("/account/login")
//       }
//       setDisableButton(true);
//       setPasswords({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     }}
//   >
//     Update Password
//   </button>
// </div>
