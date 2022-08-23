import React, { useEffect } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { resetUserPassword } from "../../api/user/user";
import { EMAIL_REGEX } from "../../common/regex";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [reCaptcha, setReCaptcha] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (EMAIL_REGEX.test(email) && reCaptcha) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, reCaptcha]);

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
          sitekey="6Lf4n5YhAAAAAA-SNgwfmRkJ707XvDTACSSxC-Xp"
          onChange={() => {
            setReCaptcha(true);
          }}
          onErrored={() => setReCaptcha(false)}
          onExpired={() => setReCaptcha(false)}
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
