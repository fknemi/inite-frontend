import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { registerAtom } from "../../statedrive/atoms";
import { RecoilState, SetRecoilState, useRecoilState } from "recoil";
import { register } from "../../api/user/user";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-family: "Inter", "sans-serif";

  h1 {
    font-weight: 500;
    font-size: 4rem;
    margin-bottom: 8rem;
    color: #ffff;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 50%;
    input {
      width: 100%;
    }
  }
  div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50%;
      input {
        width: calc(100% - 1.4rem);
      }
      gap: 1rem;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
  input[type="text"] {
    font-family: inherit;
    width: 40%;
    height: 42px;
    padding: 0 0 0 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 20px 1px rgba(48, 110, 230, 0.25);
    border-radius: 5px;
    font-size: 1.6rem;
    border-color: transparent;
    &::placeholder {
      color: #5c6877;
    }
  }
`;

const GenderInputContainer = styled.div`
  margin-top: 1rem;
  div:nth-child(1) {
    align-items: center;
    justify-content: flex-start;
    display: flex;
    align-self: flex-start;
    flex-direction: column;

    div:first-child {
      display: flex;
      flex-direction: row;
      margin-left: -0.3rem;

      label {
        white-space: nowrap;
        border-radius: 50px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
        gap: 1rem;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        -webkit-tap-highlight-color: transparent;

        &:hover,
        &:focus-within {
          /* background: rgba(255, 255, 255, 0.1); */
        }
        span {
          font-size: 1.4rem;
          margin-top: 0.3rem;
        }
      }

      input[type="radio"] {
        vertical-align: middle;
        width: 2rem;
        height: 2rem;
        border-radius: 10px;
        background: none;
        border: 0;
        box-shadow: inset 0 0 0 1px #ffff;
        box-shadow: inset 0 0 0 1.5px #ffff;
        appearance: none;
        transition: box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25);
        pointer-events: none;

        &:focus {
          outline: none;
        }

        &:checked {
          box-shadow: inset 0 0 0 6px #25ce82;
        }
      }
    }
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;

  div:first-child {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    svg {
      width: 2.3rem;
      height: 2.3rem;
    }

    input[type="checkbox"] {
      position: absolute;
      cursor: pointer;
      width: 2.3rem;
      height: 2.3rem;
      opacity: 0;
      display: block;
    }

    p {
      font-size: 1.6rem;
      color: #fff;
      a {
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }

  div:last-child {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 22.5rem;
    font-size: 1.6rem;
    color: #fff;

    span {
      font-weight: 500;
    }
    button {
      width: 12rem;
      height: 4rem;
      background: #152e4d;
      border-radius: 5px;
      color: #fff;
      font-family: inherit;
      font-weight: 500;
    }
  }
`;

const Register = () => {
  const [registerForm, setRegisterForm]: any = useRecoilState(registerAtom);
  const [disableButton, setDisableButton] = useState(true); // true
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const genders = ["Male", "Female", "Other", "Prefer Not To Say"];
  const updateRegisterForm = (e: React.SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  return (
    <Layout>
      <FormContainer>
        <h1>Create an account</h1>
        <Form className="form">
          <div>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <div>
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Password" />
              <input type="text" placeholder="Confirm Password" />
            </div>

            <GenderInputContainer>
              <div>
                <div>
                  {genders.map((gender: string) => {
                    return (
                      <label key={gender}>
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={registerForm.gender === gender}
                          onChange={(e) => updateRegisterForm(e)}
                        />
                        <span>{gender}</span>
                      </label>
                    );
                  })}
                </div>
                {registerForm.gender === "Other" ? (
                  <input type="text" placeholder="Other, Specify Your Gender" />
                ) : null}
              </div>
            </GenderInputContainer>
          </div>

          <SubmitContainer>
            <div>
              <span>
                <input
                  type="checkbox"
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                {acceptedTerms ? (
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="30" rx="5" fill="#D2D2D2" />
                  </svg>
                ) : (
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="30" height="30" rx="5" fill="#25ce82" />
                    <path
                      d="M7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071L7.70711 14.2929ZM11.9497 19.9497L11.2426 20.6569C11.6332 21.0474 12.2663 21.0474 12.6568 20.6569L11.9497 19.9497ZM23.2639 10.0503C23.6544 9.65975 23.6544 9.02658 23.2639 8.63605C22.8734 8.24552 22.2402 8.2455 21.8497 8.63602L23.2639 10.0503ZM6.29289 15.7071L11.2426 20.6569L12.6569 19.2426L7.70711 14.2929L6.29289 15.7071ZM12.6568 20.6569L23.2639 10.0503L21.8497 8.63602L11.2427 19.2426L12.6568 20.6569Z"
                      fill="white"
                    />
                  </svg>
                )}
              </span>
              <p>
                I agree to the <Link to="/">Terms and Conditions</Link> and{" "}
                <Link to="/">Privacy Policy</Link>
              </p>
            </div>

            <div>
              <button>Sign Up</button>
              <Link to="/">
                Already have an account? <span>Login</span>
              </Link>
            </div>
          </SubmitContainer>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default Register;
// {Object.keys(registerForm).map((key: string) => {
//   return (
//     <input
//       type="text"
//       key={key}
//       name={key}
//       value={registerForm[key]}
//       autoComplete="off"
//       placeholder={
//         key === "confirmPassword"
//           ? "Confirm Password"
//           : key.charAt(0).toUpperCase() + key.slice(1)
//       }
//       onChange={(e) => updateRegisterForm(e)}
//     />
//   );
// })}

// <button
//           disabled={disableButton}
//           className="bg-blue-500"
//           onClick={async () => {
//             const { name, username, email, password, confirmPassword, gender } =
//               registerForm;

//             const isSuccess: Boolean | unknown = await register(
//               name,
//               username,
//               email,
//               password,
//               gender
//             );
//             if (isSuccess) {
//               return navigate("/dashboard");
//             }
//           }}
//         >
//           Register
//         </button>

// <div>
//             <div>
//               {genders.map((gender: string) => {
//                 return (
//                   <label>
//                     <input
//                       key={gender}
//                       type="radio"
//                       name="gender"
//                       value={gender}
//                       checked={registerForm.gender === gender}
//                       onClick={(e) => updateRegisterForm(e)}
//                     />
//                     <span>{gender}</span>
//                   </label>
//                 );
//               })}
//             </div>
//             {registerForm.gender === "Other" ? (
//               <input type="text" placeholder="Other, specify your gender" />
//             ) : null}
//           </div>
