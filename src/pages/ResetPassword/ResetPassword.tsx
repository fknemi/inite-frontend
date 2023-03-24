import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { verifyPasswordToken, resetPassword } from "../../api/user/user";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  > div {
    background: #fff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 55rem;
    width: 50rem;
    padding-bottom: 2rem;

    h1 {
      padding-top: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 2.5rem;
      font-weight: 500;
      gap: 2rem;
      span {
        width: 8rem;
        height: 8rem;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }

    input {
      font-family: inherit;
      width: 80%;
      height: 42px;
      padding: 0 0 0 1rem;
      background: #ffffff;
      border: 2px solid #306ee6;
      box-shadow: 0px 0px 20px 2px rgba(48, 110, 230, 0.25);
      border-radius: 5px;
      font-size: 1.6rem;
      &::placeholder {
        color: #5c6877;
      }
      outline: none;
    }

    button {
      margin-top: 2rem;
      background: #36ae46;
      width: 70%;
      border: none;
      outline: none;
      color: #fff;
      height: 4rem;
      font-size: 1.6rem;
      font-weight: 500;
      border-radius: 5px;

      &:disabled {
        opacity: 0.6;
      }
    }

    div:last-child {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      a {
        margin-top: 2rem;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20rem;
        height: 4rem;
        text-decoration: none;
        font-size: 1.6rem;
        gap: 2rem;
        border-radius: 5px;
        span {
          width: 3rem;
          height: 3rem;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;

const ResetPasswordForm = ({
  token,
  validToken,
}: {
  token: string;
  validToken: boolean;
}) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [disableButton, setDisableButton] = useState(true);

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
    <Layout>
      <FormContainer>
        <div>
          <h1>
            <span>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 60 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="30"
                  cy="30.5"
                  r="28"
                  stroke="#1665D8"
                  strokeWidth="4"
                />
                <path
                  d="M24 29.5C24 30.0523 24.4477 30.5 25 30.5C25.5523 30.5 26 30.0523 26 29.5H24ZM25 25.5H24H25ZM30 20.5V19.5V20.5ZM34 29.5C34 30.0523 34.4477 30.5 35 30.5C35.5523 30.5 36 30.0523 36 29.5H34ZM23 30.5H37V28.5H23V30.5ZM37 30.5C37.5523 30.5 38 30.9477 38 31.5H40C40 29.8431 38.6569 28.5 37 28.5V30.5ZM38 31.5V38.5H40V31.5H38ZM38 38.5C38 39.0523 37.5523 39.5 37 39.5V41.5C38.6569 41.5 40 40.1569 40 38.5H38ZM37 39.5H23V41.5H37V39.5ZM23 39.5C22.4477 39.5 22 39.0523 22 38.5H20C20 40.1569 21.3431 41.5 23 41.5V39.5ZM22 38.5V31.5H20V38.5H22ZM22 31.5C22 30.9477 22.4477 30.5 23 30.5V28.5C21.3431 28.5 20 29.8431 20 31.5H22ZM26 29.5V25.5H24V29.5H26ZM26 25.5C26 24.4391 26.4214 23.4217 27.1716 22.6716L25.7574 21.2574C24.6321 22.3826 24 23.9087 24 25.5H26ZM27.1716 22.6716C27.9217 21.9214 28.9391 21.5 30 21.5V19.5C28.4087 19.5 26.8826 20.1321 25.7574 21.2574L27.1716 22.6716ZM30 21.5C31.0609 21.5 32.0783 21.9214 32.8284 22.6716L34.2426 21.2574C33.1174 20.1321 31.5913 19.5 30 19.5V21.5ZM32.8284 22.6716C33.5786 23.4217 34 24.4391 34 25.5H36C36 23.9087 35.3679 22.3826 34.2426 21.2574L32.8284 22.6716ZM34 25.5V29.5H36V25.5H34Z"
                  fill="#1665D8"
                />
              </svg>
            </span>
            Reset Password
          </h1>

          <div>
            <input
              type="password"
              placeholder="New Password"
              value={passwords.password}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  password: e.target.value.trim(),
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value.trim(),
                })
              }
            />

            <button
              disabled={disableButton}
              onClick={async () => {
                if (!token) {
                  return setDisableButton(true);
                }
                const { password, confirmPassword } = passwords;
                if (password !== confirmPassword) {
                  setDisableButton(true);
                }
                const didResetPassword = await resetPassword(
                  token,
                  passwords.password
                );
                if (didResetPassword) {
                  alert("Password Update???");
                }
                setDisableButton(true);
              }}
            >
              Update Password
            </button>
            <Link to="">
              <span>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2929 19.7071C14.6834 20.0976 15.3166 20.0976 15.7071 19.7071C16.0976 19.3166 16.0976 18.6834 15.7071 18.2929L14.2929 19.7071ZM8 12L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L8 12ZM15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L15.7071 5.70711ZM15.7071 18.2929L8.70711 11.2929L7.29289 12.7071L14.2929 19.7071L15.7071 18.2929ZM8.70711 12.7071L15.7071 5.70711L14.2929 4.29289L7.29289 11.2929L8.70711 12.7071Z"
                    fill="white"
                  />
                </svg>
              </span>
              Back to Login
            </Link>
          </div>
        </div>
      </FormContainer>
    </Layout>
  );
};

const InvalidToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  > div {
    border: 2px solid red;
    background: #fff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 55rem;
    width: 50rem;
    padding-bottom: 2rem;
  }
`;

const ResetPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [message, setMessage] = useState("");
  let { token }: any = useParams();
  useEffect(() => {
    verifyPasswordToken(token).then((res: any) => {
      setMessage(res._message);
      setValidToken(res.isSuccess);
    });
  }, [token]);

  return (
    <>
      {validToken ? (
        <ResetPasswordForm token={token} validToken={false} />
      ) : (
        <InvalidToken>
          <div>
            <h1>{message}</h1>
            <Link to="">
              <span>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2929 19.7071C14.6834 20.0976 15.3166 20.0976 15.7071 19.7071C16.0976 19.3166 16.0976 18.6834 15.7071 18.2929L14.2929 19.7071ZM8 12L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L8 12ZM15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L15.7071 5.70711ZM15.7071 18.2929L8.70711 11.2929L7.29289 12.7071L14.2929 19.7071L15.7071 18.2929ZM8.70711 12.7071L15.7071 5.70711L14.2929 4.29289L7.29289 11.2929L8.70711 12.7071Z"
                    fill="white"
                  />
                </svg>
              </span>
              Back to Login
            </Link>
          </div>
        </InvalidToken>
      )}
    </>
  );
};

export default ResetPassword;

// <h1>Update Password</h1>
//       {validToken ? "Valid Token" : "Invalid Token"}
//       <h2>{message}</h2>

//       <button
//         disabled={disableButton}
//         onClick={async () => {
//           const { password, confirmPassword } = passwords;
//           if (password !== confirmPassword) {
//             setDisableButton(true);
//           }
//           const didResetPassword = await resetPassword(
//             token,
//             passwords.password
//           );
//           if (didResetPassword) {
//             alert("Password Update???");
//           }
//           setDisableButton(true);
//           token = null;
//         }}
//       >
//         Update Password
//       </button>
