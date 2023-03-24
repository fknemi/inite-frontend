import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { verifyEmail, verifyEmailToken } from "../../api/user/user";
import { userAtom } from "../../statedrive/atoms";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  position: relative;

  > div {
    background: #fff;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    height: auto;
    width: 60rem;
    svg {
      width: 15rem;
      height: 15rem;
    }

    > span {
      position: relative;
      width: 100%;
      height: 100%;
      top: -16%;
      left: 0;

      svg {
        width: 4rem;
        position: absolute;
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: 60%;
      margin-top: 6rem;
      margin-left: 6rem;

      h1 {
        margin: 0;
        padding: 0;
        font-weight: 500;
        font-size: 2.5rem;
      }
      p {
        font-weight: 400;
        font-family: "DM Sans";
        font-size: 1.6rem;
      }
    }
    > div:nth-child(3) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      button {
        font-family: "DM Sans";
        background: none;
        font-size: 1.6rem;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    > div {
      width: 90%;
      svg {
        width: 14rem;
        height: 14rem;
      }
      > span
       {
        top: -17%;
        left: -1%;
        svg{

          width: 4rem;
        }
      }
      > div:nth-child(2) {
        width: 100%;
        margin-left: 2rem;

        h1 {
          font-size: 2rem;
        }
        p {
          font-size: 1.4rem;
        }
      }
      > div:nth-child(3) button {
        font-size: 1.4rem;
      }
    }
  }
`;

const VerifyEmail = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [didVerify, setDidVerify] = useState(false);
  const [message, setMessage] = useState(
    user.emailVerified ? "Email has already been verified" : ""
  );
  const [displayMessage, setDisplayMessage] = useState(false);

  let navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      (async () => {
        const { isSuccess, message } = await verifyEmailToken(token);

        if (isSuccess) {
          setUser({ ...user, emailVerified: true });

          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, emailVerified: true })
          );
          return window.location.replace("/dashboard");
        }
      })();
      //     const { isSuccess, message } = await verifyEmailToken(token);
      //     if (isSuccess) {
      //       if (user.emailVerified) {
      //         return navigate("/dashboard");
      //       }

      // setDidVerify(true);
      //       if (user) {
      //         setUser({ ...user, emailVerified: true });
      //         localStorage.setItem("user", JSON.stringify(user));
      //       }
      //       return navigate("/dashboard");
      //     } else {
      //       setDisplayMessage(true);
      //     }
      //   })();
    }
  }, []);

  return (
    <Layout>
      {!displayMessage ? (
        <FormContainer>
          <div>
            <span>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 40 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20.5" r="20" fill="#152E4D" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7031 15.4C19.7031 11.5448 24.3906 9.0625 29.6562 9.0625C29.8634 9.0625 30.0622 9.14481 30.2087 9.29132C30.3552 9.43784 30.4375 9.63655 30.4375 9.84375C30.4375 15.1104 27.9552 19.7969 24.1 22.7979C24.2603 23.8023 24.2008 24.8296 23.9256 25.8088C23.6504 26.788 23.166 27.6958 22.5059 28.4696C21.8458 29.2434 21.0256 29.8648 20.102 30.2909C19.1784 30.7169 18.1734 30.9376 17.1562 30.9375C16.949 30.9375 16.7503 30.8552 16.6038 30.7087C16.4573 30.5622 16.375 30.3634 16.375 30.1562V25.8531C15.3624 25.0535 14.4471 24.1379 13.6479 23.125H9.34375C9.13655 23.125 8.93784 23.0427 8.79132 22.8962C8.64481 22.7497 8.5625 22.5509 8.5625 22.3437C8.56242 21.3265 8.78306 20.3214 9.20919 19.3977C9.63532 18.474 10.2568 17.6538 11.0307 16.9937C11.8047 16.3335 12.7126 15.8492 13.692 15.574C14.6713 15.2989 15.6986 15.2395 16.7031 15.4V15.4ZM22.625 14.5312C22.0034 14.5312 21.4073 14.7782 20.9677 15.2177C20.5282 15.6573 20.2812 16.2534 20.2812 16.875C20.2812 17.4966 20.5282 18.0927 20.9677 18.5323C21.4073 18.9718 22.0034 19.2187 22.625 19.2187C23.2466 19.2187 23.8427 18.9718 24.2823 18.5323C24.7218 18.0927 24.9687 17.4966 24.9687 16.875C24.9687 16.2534 24.7218 15.6573 24.2823 15.2177C23.8427 14.7782 23.2466 14.5312 22.625 14.5312V14.5312Z"
                  fill="white"
                />
                <path
                  d="M12.479 25.4604C12.5613 25.3991 12.6307 25.3221 12.6832 25.2339C12.7357 25.1458 12.7704 25.0481 12.7852 24.9465C12.8 24.845 12.7947 24.7415 12.7695 24.642C12.7443 24.5425 12.6997 24.4489 12.6384 24.3667C12.577 24.2844 12.5001 24.215 12.4119 24.1625C12.3237 24.1099 12.2261 24.0753 12.1245 24.0605C12.0229 24.0457 11.9194 24.051 11.82 24.0762C11.7205 24.1014 11.6269 24.1459 11.5446 24.2073C10.7455 24.8017 10.1242 25.6033 9.74783 26.5253C9.37145 27.4473 9.25435 28.4547 9.4092 29.4385C9.43438 29.6024 9.51104 29.754 9.62807 29.8714C9.74511 29.9888 9.89646 30.066 10.0602 30.0917C11.0441 30.2464 12.0516 30.1291 12.9736 29.7526C13.8957 29.376 14.6972 28.7545 15.2915 27.9552C15.3548 27.8731 15.4012 27.7793 15.4279 27.6791C15.4546 27.579 15.4611 27.4745 15.447 27.3718C15.4329 27.2691 15.3986 27.1702 15.3459 27.081C15.2932 26.9917 15.2233 26.9138 15.1402 26.8518C15.0572 26.7898 14.9626 26.7449 14.862 26.7199C14.7614 26.6948 14.6569 26.69 14.5544 26.7057C14.452 26.7214 14.3537 26.7574 14.2652 26.8115C14.1768 26.8656 14.1001 26.9368 14.0394 27.0208C13.6761 27.5094 13.2035 27.9061 12.6595 28.1792C12.1154 28.4524 11.5149 28.5943 10.9061 28.5937C10.9061 27.3125 11.5227 26.174 12.479 25.4604V25.4604Z"
                  fill="white"
                />
              </svg>
            </span>

            <div>
              <h1>Verify your account</h1>
              <p>
                Account activation link has been sent to the
                <br />
                email address you provided
              </p>
            </div>

            <div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 120 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="1"
                  width="119"
                  height="99"
                  rx="9.5"
                  fill="#F9F4FE"
                  stroke="#F7F1FE"
                />
                <path
                  d="M32.3858 33.2684L33.2768 33.7224L32.3858 33.2684ZM34.9344 30.7191L35.3884 31.6101L34.9344 30.7191ZM34.9344 70.2808L35.3884 69.3898L34.9344 70.2808ZM32.3858 67.7318L31.4948 68.1857L32.3858 67.7318ZM83.6148 67.7318L82.7238 67.2778L83.6148 67.7318ZM81.0644 70.2808L80.6104 69.3898L81.0644 70.2808ZM83.6148 33.2684L82.7238 33.7224V33.7224L83.6148 33.2684ZM81.0644 30.7191L81.5184 29.8281L81.0644 30.7191ZM35.2558 32.192C34.8096 31.8666 34.1841 31.9646 33.8587 32.4108C33.5333 32.8571 33.6312 33.4826 34.0775 33.808L35.2558 32.192ZM58.6667 50.5L58.0775 51.308C58.4368 51.57 58.9258 51.5633 59.2778 51.2915L58.6667 50.5ZM81.9443 33.7915C82.3814 33.454 82.4622 32.826 82.1247 32.3889C81.7872 31.9517 81.1592 31.8709 80.7221 32.2085L81.9443 33.7915ZM83.25 39.4165V61.5832H85.25V39.4165H83.25ZM74.9172 69.9167H41.0839V71.9167H74.9172V69.9167ZM32.75 61.5832V39.4165H30.75V61.5832H32.75ZM41.0839 31.0833H74.9172V29.0833H41.0839V31.0833ZM32.75 39.4165C32.75 37.7665 32.7508 36.5892 32.8262 35.6667C32.9006 34.7559 33.0427 34.1819 33.2768 33.7224L31.4948 32.8145C31.0931 33.6028 30.9173 34.4693 30.8328 35.5039C30.7492 36.5267 30.75 37.7995 30.75 39.4165H32.75ZM41.0839 29.0833C39.4669 29.0833 38.1937 29.0826 37.1706 29.1661C36.1358 29.2506 35.2689 29.4264 34.4804 29.8281L35.3884 31.6101C35.8478 31.3761 36.4221 31.2339 37.3334 31.1595C38.2563 31.0841 39.4339 31.0833 41.0839 31.0833V29.0833ZM33.2768 33.7224C33.7403 32.8127 34.4792 32.0734 35.3884 31.6101L34.4804 29.8281C33.1944 30.4834 32.1498 31.5289 31.4948 32.8145L33.2768 33.7224ZM41.0839 69.9167C39.4339 69.9167 38.2563 69.9159 37.3334 69.8405C36.4221 69.766 35.8478 69.6238 35.3884 69.3898L34.4804 71.1718C35.2688 71.5735 36.1358 71.7493 37.1705 71.8338C38.1937 71.9174 39.4669 71.9167 41.0839 71.9167V69.9167ZM30.75 61.5832C30.75 63.2002 30.7492 64.4731 30.8328 65.4961C30.9173 66.5307 31.0931 67.3973 31.4948 68.1857L33.2768 67.2778C33.0427 66.8183 32.9006 66.2442 32.8262 65.3332C32.7508 64.4106 32.75 63.2332 32.75 61.5832H30.75ZM35.3884 69.3898C34.4791 68.9265 33.7403 68.1874 33.2768 67.2778L31.4948 68.1857C32.1498 69.4714 33.1945 70.5166 34.4804 71.1718L35.3884 69.3898ZM83.25 61.5832C83.25 63.2333 83.2494 64.4107 83.1741 65.3334C83.0999 66.2444 82.9579 66.8184 82.7238 67.2778L84.5058 68.1857C84.9076 67.3972 85.0832 66.5305 85.1675 65.4959C85.2509 64.473 85.25 63.2001 85.25 61.5832H83.25ZM74.9172 71.9167C76.5342 71.9167 77.8068 71.9174 78.8295 71.8338C79.8638 71.7493 80.7301 71.5734 81.5184 71.1718L80.6104 69.3898C80.1509 69.6239 79.577 69.766 78.6665 69.8405C77.7443 69.9159 76.5672 69.9167 74.9172 69.9167V71.9167ZM82.7238 67.2778C82.2607 68.1867 81.5204 68.9261 80.6104 69.3898L81.5184 71.1718C82.8036 70.5169 83.8504 69.472 84.5058 68.1857L82.7238 67.2778ZM85.25 39.4165C85.25 37.7996 85.2509 36.5268 85.1675 35.504C85.0832 34.4696 84.9076 33.6029 84.5058 32.8145L82.7238 33.7224C82.9579 34.1818 83.0999 34.7557 83.1741 35.6666C83.2494 36.5891 83.25 37.7664 83.25 39.4165H85.25ZM74.9172 31.0833C76.5672 31.0833 77.7443 31.0841 78.6665 31.1595C79.5771 31.2339 80.1509 31.376 80.6104 31.6101L81.5184 29.8281C80.73 29.4264 79.8638 29.2507 78.8294 29.1661C77.8068 29.0826 76.5342 29.0833 74.9172 29.0833V31.0833ZM84.5058 32.8145C83.8505 31.5283 82.8037 30.483 81.5184 29.8281L80.6104 31.6101C81.5202 32.0737 82.2606 32.8134 82.7238 33.7224L84.5058 32.8145ZM34.0775 33.808L58.0775 51.308L59.2558 49.692L35.2558 32.192L34.0775 33.808ZM59.2778 51.2915L81.9443 33.7915L80.7221 32.2085L58.0555 49.7085L59.2778 51.2915Z"
                  fill="black"
                />
              </svg>

              <button
                onClick={async () => {
                  const isSuccess = await verifyEmail();
                  if (isSuccess) {
                    setUser({ ...user, emailVerified: true });
                  } else {
                    alert("Failed to Send Email");
                  }
                }}
              >
                Didn’t get the mail? Send it again
              </button>
            </div>
          </div>
        </FormContainer>
      ) : (
        <h3 style={{ paddingLeft: "1rem" }}>Invalid Token</h3>
      )}
    </Layout>
  );
};

export default VerifyEmail;
