import React, { useEffect } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { resetUserPassword } from "../../api/user/user";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/.test(email) &&
      captcha
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, captcha]);

  return (
    <div>
      ForgotPassword
      <div>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <ReCAPTCHA
          sitekey=""
          onChange={() => {
            setCaptcha(true);
          }}
          onErrored={() => setCaptcha(false)}
          onExpired={() => setCaptcha(false)}
        />

        <button
          disabled={disableButton}
          className="disabled:bg-red-500 bg-green-500"
          onClick={async () => {
            const isSuccess = await resetUserPassword(email);
            setDisableButton(true);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
