import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { verifyEmail, verifyEmailToken } from "../../api/user/user";
import { userAtom } from "../../statedrive/atoms";

const VerifyEmail = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [didVerify, setDidVerify] = useState(false);
  const [message, setMessage] = useState(user.emailVerified ? "Email has already been verified" : "");
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      (async () => {
        const { isSuccess, message } = await verifyEmailToken(token);
        if ({ isSuccess }) {
          if (user.emailVerified && !message) {
            return setMessage("Email has already verified");
          }
          setMessage(message);
          setUser({ ...user, emailVerified: true });
          setDidVerify(true);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setMessage(message);
        }
      })();
    }
  }, []);

  return (
    <div>
      <h1>VerifyEmail</h1>
      <div>
        <h1 className="font-bold">{message}</h1>
        <button
          className="bg-blue-800 mt-5"
          onClick={async () => {
            const isSuccess = await verifyEmail();
            if (isSuccess) {
              console.log("Send Email Success");
            } else {
              console.log("Send Email Failed");
            }
          }}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
