import React, { useEffect } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { resetUserPassword } from "../../api/user/user";
import { EMAIL_REGEX } from "../../common/regex";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

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

    div:first-child {
      padding-top: 2rem;

      height: 20%;
      p {
        color: #858585;
        font-size: 1.3rem;
        text-align: center;
      }
      h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 2.5rem;
        font-weight: 500;
        
        span {
          width: 8rem;
          height: 8rem;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    > div {
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 8rem;
      gap: 1.2rem;
      width: 100%;

      input {
        position: relative;
        z-index: 999;
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
        background: #36ae46;
        width: 70%;
        border: none;
        outline: none;
        color: #fff;
        height: 4rem;
        font-size: 1.6rem;
        font-weight: 500;
        border-radius: 5px;
        position: relative;
        z-index: 999;
        top: -10rem;

        &:disabled {
          opacity: 0.6;
        }
      }
      .captcha-visible {
        top: 0;
      }
      
      .recaptcha {
        position: relative;
        z-index: 10;
        top: -7rem;
        height: 10rem;
      }
      a {
        position: relative;
        z-index: 777;
        top: -5rem;

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [reCaptcha, setReCaptcha] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  useEffect(() => {
    if (EMAIL_REGEX.test(email) && reCaptcha) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, reCaptcha]);

  return (
    <Layout>
      <FormContainer>
        <div>
          <div>
            <h1>
              <span>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 106 107"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M53.22 68.7373H55.22C55.22 67.6327 54.3245 66.7373 53.22 66.7373V68.7373ZM53.22 69.179L53.2195 71.179C53.75 71.1791 54.2588 70.9684 54.634 70.5933C55.0092 70.2183 55.22 69.7095 55.22 69.179H53.22ZM52.78 69.1788H50.78C50.78 70.2832 51.6752 71.1786 52.7795 71.1788L52.78 69.1788ZM52.78 68.7373V66.7373C51.6755 66.7373 50.78 67.6327 50.78 68.7373H52.78ZM55 37.8206C55 36.716 54.1046 35.8206 53 35.8206C51.8954 35.8206 51 36.716 51 37.8206H55ZM51 55.4873C51 56.5919 51.8954 57.4873 53 57.4873C54.1046 57.4873 55 56.5919 55 55.4873H51ZM53 91.25C32.1512 91.25 15.25 74.3487 15.25 53.5H11.25C11.25 76.5579 29.9421 95.25 53 95.25V91.25ZM15.25 53.5C15.25 32.6512 32.1512 15.75 53 15.75V11.75C29.9421 11.75 11.25 30.4421 11.25 53.5H15.25ZM53 15.75C73.8487 15.75 90.75 32.6512 90.75 53.5H94.75C94.75 30.4421 76.0579 11.75 53 11.75V15.75ZM90.75 53.5C90.75 74.3487 73.8487 91.25 53 91.25V95.25C76.0579 95.25 94.75 76.5579 94.75 53.5H90.75ZM51.22 68.7373V69.179H55.22V68.7373H51.22ZM53.2205 67.179L52.7805 67.1788L52.7795 71.1788L53.2195 71.179L53.2205 67.179ZM54.78 69.1788V68.7373H50.78V69.1788H54.78ZM52.78 70.7373H53.22V66.7373H52.78V70.7373ZM51 37.8206V55.4873H55V37.8206H51Z"
                    fill="#1665D8"
                  />
                </svg>
              </span>
              Forgot Password
            </h1>
            <p>
              Enter your email address in the form below and we’ll
              <br />
              send you a link to reset your password
            </p>
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setShowRecaptcha(true);
              }}
            />

            <div className="recaptcha">
              {showRecaptcha ? (
                <ReCAPTCHA
                  style={{ height: "100%", width: "100%" }}
                  sitekey="6Lf4n5YhAAAAAA-SNgwfmRkJ707XvDTACSSxC-Xp"
                  onChange={() => {
                    setReCaptcha(true);
                  }}
                  onErrored={() => setReCaptcha(false)}
                  onExpired={() => setReCaptcha(false)}
                />
              ) : null}
            </div>

            <button
              className={showRecaptcha ? "captcha-visible" : ""}
              disabled={disableButton}
              onClick={async () => {
                const isSuccess = await resetUserPassword(email);
                setDisableButton(true);
              }}
            >
              Submit
            </button>
            <Link to="" className={showRecaptcha ? "captcha-visible" : ""}>
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

export default ForgotPassword;
// ForgotPassword
// <div>
//   <input
//     type="email"
//     name="email"
//     placeholder="email"
//     onChange={(e) => setEmail(e.target.value)}
//   />
// <ReCAPTCHA
//   sitekey="6Lf4n5YhAAAAAA-SNgwfmRkJ707XvDTACSSxC-Xp"
//   onChange={() => {
//     setReCaptcha(true);
//   }}
//   onErrored={() => setReCaptcha(false)}
//   onExpired={() => setReCaptcha(false)}
// />

//   <button
//     disabled={disableButton}

//     onClick={async () => {
//       const isSuccess = await resetUserPassword(email);
//       setDisableButton(true);
//     }}
//   >
//     Submit
//   </button>
// </div>
