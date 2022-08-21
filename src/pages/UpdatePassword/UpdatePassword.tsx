import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { verifyPasswordToken, updatePassword } from "../../api/user/user";

const UpdatePassword = () => {
  let { token }: any = useParams();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [validToken, setValidToken] = useState(false);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    verifyPasswordToken(token).then((res: any) => {
      setMessage(res._message);
      setValidToken(res.isSuccess);
    });
  }, [token]);

  useEffect(() => {
    if (
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}/.test(
        passwords.password
      ) &&
      passwords.password === passwords.confirmPassword
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [passwords.confirmPassword, passwords.password]);

  return (
    <div className="bg-blue-500">
      <h1>Update Password</h1>
      {validToken ? "Valid Token" : "Invalid Token"}
      <h2>{message}</h2>

      <input
        type="password"
        placeholder="password"
        value={passwords.password}
        onChange={(e) =>
          setPasswords({ ...passwords, password: e.target.value.trim() })
        }
      />

      <input
        type="password"
        placeholder="password"
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({ ...passwords, confirmPassword: e.target.value.trim() })
        }
      />

      <button
        className="disabled:bg-red-600 bg-green-500 mt-5"
        disabled={disableButton}
        onClick={async () => {
          const { password, confirmPassword } = passwords;
          if (password !== confirmPassword) {
            setDisableButton(true);
          }
          const didUpdatePassword = await updatePassword(
            token,
            passwords.password
          );
          if (didUpdatePassword) {
            alert("Password Update???");
          }
          setDisableButton(true);
          token = null;
        }}
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
