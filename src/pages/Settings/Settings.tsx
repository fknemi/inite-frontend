import React, { useState } from "react";
import NotificationSettings from "../../components/Settings/NotificationSettings";
import UpdatePassword from "../../components/Settings/UpdatePassword";
import Account from "../../components/Settings/Account";
import EmailNotifications from "../../components/Settings/EmailNotifications";
import Help from "../../components/Settings/Help";
import LinkAccounts from "../../components/Settings/LinkAccounts";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import { useRecoilState } from "recoil";
import { userAtom } from "../../statedrive/atoms";
import { useEffect } from "react";
import { INSTAGRAM_USER } from "../../@types/types";
import FollowedAccounts from "../../components/Settings/FollowedAccounts";

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 4rem;
  padding-left: 4rem;

  > div > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
      cursor: pointer;
      font-size: 3rem;
      font-wight: 400;
      color: #fff;
    }

    p {
      font-size: 2rem;
      font-family: "DM Sans";
      color: #fff;
      margin-top: -2rem;
      margin-left: 0.2rem;
    }
  }

  h1 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 2rem;
    font-weight: 400;
    color: #fff;
    gap: 1rem;
    span {
      width: 2.8rem;
      height: 2.8rem;
      svg {
        position: relative;
        /* left: 0.2rem; */

        width: 100%;
        height: 100%;
        path {
          fill: #d9d9d9;
        }
      }
    }
  }

  > div div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* padding-left: 0.5rem; */
    gap: 2rem;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1rem;

      a {
        text-decoration: none;
        font-size: 1.6rem;
        font-weight: 500;
        font-family: "DM Sans", sans-serif;
        padding: 1rem;
        color: #000;
        background: #ffffff;
        box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
          0px 0px 3px rgba(27, 31, 35, 0.25);
        border-radius: 5px;
        width: 100%;
        height: 2rem;
      }
    }
    div:nth-child(2) {
      h1 {
        span {
          width: 2.4rem;
          height: 2.4rem;
        }
      }
    }
    div:nth-child(3) {
      h1 {
        span {
          width: 4rem;
          height: 4rem;
        }
      }
    }
  }
`;

const Section = styled.section`
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  width: 60%;
  margin-top: 20rem;
  margin-left: -10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;

  > div:first-child {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    div {
      padding: 1rem;

      h1 {
        font-size: 2rem;
        color: #000;
        font-weight: 500;
        font-size: 2rem;
      }
      p {
        font-size: 1.6rem;
        font-family: "DM Sans";
        font-weight: 400;
        margin-top: -1rem;
      }
    }

    img {
      width: 10rem;
      height: 10rem;
      border-radius: 200px;
      padding: 2rem;
    }
  }
  > div:nth-child(2) {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const Settings = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [details, setDetails] = useState([
    {
      name: "Email Address",
      key: "email",
      link: user.emailVerified ? "Verified" : "Not Verified",
    },
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Username",
      key: "username",
    },
    {
      name: "Gender",
      key: "gender",
    },
    {
      name: "Follow Limit",
      key: "followLimit",
    },
    {
      name: "Currently Following",
      key: "following",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <SettingsContainer>
        <div>
          <div>
            <h1>Settings</h1>
            <p>Manage your account settings and preferences</p>
          </div>

          <div>
            <div>
              <h1>
                <span>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4166 19.75C16.4166 20.3023 16.8643 20.75 17.4166 20.75C17.9689 20.75 18.4166 20.3023 18.4166 19.75H16.4166ZM3.58325 19.75C3.58325 20.3023 4.03097 20.75 4.58325 20.75C5.13554 20.75 5.58325 20.3023 5.58325 19.75H3.58325ZM18.4166 19.75C18.4166 15.6539 15.096 12.3333 10.9999 12.3333V14.3333C13.9915 14.3333 16.4166 16.7585 16.4166 19.75H18.4166ZM10.9999 12.3333C6.90381 12.3333 3.58325 15.6539 3.58325 19.75H5.58325C5.58325 16.7585 8.00838 14.3333 10.9999 14.3333V12.3333ZM10.9999 9.58333C9.52716 9.58333 8.33325 8.38943 8.33325 6.91667H6.33325C6.33325 9.494 8.42259 11.5833 10.9999 11.5833V9.58333ZM8.33325 6.91667C8.33325 5.44391 9.52716 4.25 10.9999 4.25V2.25C8.42259 2.25 6.33325 4.33934 6.33325 6.91667H8.33325ZM10.9999 4.25C12.4727 4.25 13.6666 5.44391 13.6666 6.91667H15.6666C15.6666 4.33934 13.5772 2.25 10.9999 2.25V4.25ZM13.6666 6.91667C13.6666 8.38943 12.4727 9.58333 10.9999 9.58333V11.5833C13.5772 11.5833 15.6666 9.494 15.6666 6.91667H13.6666Z"
                      fill="black"
                    />
                  </svg>
                </span>
                Personal
              </h1>
              <div>
                <Link to="">Profile</Link>
                <Link to="">Notifications</Link>
                <Link to="">Email Notifications</Link>
                <Link to="">Update Password</Link>
              </div>
            </div>
            <div>
              <h1>
                <span>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66667 5.33333C2.29848 5.33333 2 5.63181 2 6C2 6.36819 2.29848 6.66667 2.66667 6.66667V5.33333ZM13.3333 6.66667C13.7015 6.66667 14 6.36819 14 6C14 5.63181 13.7015 5.33333 13.3333 5.33333V6.66667ZM2.66667 9.33333C2.29848 9.33333 2 9.6318 2 10C2 10.3682 2.29848 10.6667 2.66667 10.6667V9.33333ZM13.3333 10.6667C13.7015 10.6667 14 10.3682 14 10C14 9.6318 13.7015 9.33333 13.3333 9.33333V10.6667ZM7.32927 2.07362C7.36993 1.70768 7.1062 1.37808 6.74027 1.33742C6.37435 1.29676 6.04474 1.56044 6.00408 1.92638L7.32927 2.07362ZM4.67075 13.9264C4.63009 14.2923 4.89377 14.6219 5.25971 14.6626C5.62565 14.7033 5.95526 14.4395 5.99592 14.0736L4.67075 13.9264ZM11.3293 2.07362C11.3699 1.70768 11.1062 1.37808 10.7403 1.33742C10.3743 1.29676 10.0447 1.56044 10.0041 1.92638L11.3293 2.07362ZM8.67073 13.9264C8.63007 14.2923 8.8938 14.6219 9.25973 14.6626C9.62567 14.7033 9.95527 14.4395 9.99593 14.0736L8.67073 13.9264ZM2.66667 6.66667H13.3333V5.33333H2.66667V6.66667ZM2.66667 10.6667H13.3333V9.33333H2.66667V10.6667ZM6.00408 1.92638L4.67075 13.9264L5.99592 14.0736L7.32927 2.07362L6.00408 1.92638ZM10.0041 1.92638L8.67073 13.9264L9.99593 14.0736L11.3293 2.07362L10.0041 1.92638Z"
                      fill="black"
                    />
                  </svg>
                </span>
                Workspace
              </h1>
              <div>
                <Link to="">Following</Link>
                <Link to="">Connected Accounts</Link>
              </div>
            </div>
            <div>
              <h1>
                <span>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 12.5H16C16 13.6046 16.8954 14.5 18 14.5V12.5ZM18 12.5V14.5C19.1046 14.5 20 13.6046 20 12.5H18ZM18 12.5H20C20 11.3954 19.1046 10.5 18 10.5V12.5ZM18 10.5C16.8954 10.5 16 11.3954 16 12.5H18V10.5ZM12 12.5H10C10 13.6046 10.8954 14.5 12 14.5V12.5ZM12 12.5V14.5C13.1046 14.5 14 13.6046 14 12.5H12ZM12 12.5H14C14 11.3954 13.1046 10.5 12 10.5V12.5ZM12 10.5C10.8954 10.5 10 11.3954 10 12.5H12V10.5ZM6 12.5H4C4 13.6046 4.89543 14.5 6 14.5V12.5ZM6 12.5V14.5C7.10457 14.5 8 13.6046 8 12.5H6ZM6 12.5H8C8 11.3954 7.10457 10.5 6 10.5V12.5ZM6 10.5C4.89543 10.5 4 11.3954 4 12.5H6V10.5Z"
                      fill="black"
                    />
                  </svg>
                </span>
                Other
              </h1>
              <div>
                <Link to="">Help</Link>
                <Link to="">Terms and Services</Link>
                <Link to="">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        <Section>
          <div>
            <div>
              <h1>Your Profile</h1>
              <p>
                {" "}
                Here you can view your private account information about
                yourself.
              </p>
            </div>
            <img src={user.avatar} alt="" />
          </div>

          <div>
            {/* <NotificationSettings /> */}
            {/* {<EmailNotifications/>} */}
            {/* {<FollowedAccounts />} */}
            {<UpdatePassword />}
          </div>
        </Section>
      </SettingsContainer>
    </Layout>
  );
};

export default Settings;
{
  /* <Help />

<Account />
<EmailNotifications />
<Notifications />
<UpdatePassword />
<Link to=""Accounts /> */
}

// {details.map((details) => {
//   let detail = user[details.key as any as keyof typeof user];
//   if (typeof detail === "object") {
//     detail = (detail as Array<INSTAGRAM_USER>).length;
//   }
//   return (
//     <DetailsCard key={details.key}>
//       <span>{details.name}</span>
//       <p>{detail}</p>
//       <Link to="">{details.link || ""}</Link>
//     </DetailsCard>
//   );
// })}
