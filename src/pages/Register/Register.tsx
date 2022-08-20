import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { registerAtom } from "../../statedrive/atoms";
import { RecoilState, SetRecoilState, useRecoilState } from "recoil";
import { register } from "../../api/user/user";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerForm, setRegisterForm]: any = useRecoilState(registerAtom);
  const [disableButton, setDisableButton] = useState(false); // true
  const navigate = useNavigate();
  const updateRegisterForm = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className="">
        <div>Register</div>
        <div>
          {Object.keys(registerForm).map((key: string) => {
            return (
              <input
                type="text"
                key={key}
                name={key}
                value={registerForm[key]}
                autoComplete="off"
                placeholder={
                  key === "confirmPassword"
                    ? "Confirm Password"
                    : key.charAt(0).toUpperCase() + key.slice(1)
                }
                onChange={(e) => updateRegisterForm(e)}
              />
            );
          })}
        </div>
        <button
          disabled={disableButton}
          className="bg-blue-500"
          onClick={async () => {
            const { name, username, email, password, confirmPassword, gender } =
              registerForm;

            const isSuccess: Boolean | unknown = await register(
              name,
              username,
              email,
              password,
              gender
            );
            if (isSuccess) {
              return navigate("/dashboard");
            }
          }}
        >
          Register
        </button>
      </div>
    </Layout>
  );
};

export default Register;
