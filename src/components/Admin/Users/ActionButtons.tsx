import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { banUser, unbanUser } from "../../../api/admin/admin";
import {
  deleteUser,
  deleteUserMedia,
  getUserDetails,
} from "../../../api/owner/owner";
import { usersAtom } from "../../../statedrive/atoms";
import styled from "styled-components";
import {
  resetUserPassword,
  promoteAdmin,
  removeAdmin,
} from "../../../api/owner/owner";

let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";

export const ActionButtonsContainer = styled.div`
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(27, 31, 35, 0.15),
    0px 0px 3px rgba(27, 31, 35, 0.25);
  border-radius: 10px;
  right: 1.5rem;
  &.report {
    right: 10rem;
    width: 18rem;
  }

  &,
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  button {
    width: 18rem;
    background: none;
    font-size: 1.6rem;
    width: 100%;
    text-align: left;
    padding: 1rem;
    padding-right: 1rem;
  }
  button:hover {
    background: rgba(246, 246, 246, 1);
    backdrop-filter: blur(10px);
  }
  button:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  button:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const ActionButtons = ({ _isBanned, _isOwner, username }: any) => {
  const [isBanned, setIsBanned]: any = useState(_isBanned);
  const [isOwner, setIsOwner]: any = useState(_isOwner);
  const [deleteMedia, setDeleteMedia]: any = useState(undefined);
  const [users, setUsers]: any = useRecoilState(usersAtom);
  const [userDetails, setUserDetails]: any = useState({});
  const [hideActions, setHideActions] = useState(false);

  return (
    <ActionButtonsContainer>
      {!isBanned ? (
        <button
          className={BUTTON_STYLE}
          onClick={async () => {
            const { isSuccess, wasAuthorized } = await banUser(username);
            if (!isSuccess && !wasAuthorized) {
              alert("NOT AUTHORIZED FOR THIS ACTION");
              return setHideActions(true);
            }
            if (isSuccess) {
              return setIsBanned(true);
            }
          }}
        >
          Ban
        </button>
      ) : (
        <button
          className={BUTTON_STYLE}
          onClick={async () => {
            const { isSuccess, wasAuthorized } = await unbanUser(username);
            if (!isSuccess && !wasAuthorized) {
              alert("NOT AUTHORIZED FOR THIS ACTION");
              return setHideActions(true);
            }
            if (isSuccess) {
              return setIsBanned(false);
            }
          }}
        >
          Unban
        </button>
      )}

      {isOwner ? (
        <div>
          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              const { isSuccess, wasAuthorized, data } = await getUserDetails(
                _isOwner,
                username
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }

              

              setUserDetails(data);
            }}
          >
            Get User Details
          </button>

          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              setDeleteMedia(true);
              const { isSuccess, wasAuthorized } = await deleteUser(
                _isOwner,
                username,
                deleteMedia
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }

              return setUsers(
                users.filter((user: any) => user.username !== username)
              );
            }}
          >
            Delete User
          </button>

          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await deleteUserMedia(
                _isOwner,
                username
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
            }}
          >
            Delete User Media
          </button>

          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await promoteAdmin(
                _isOwner,
                username,
                userDetails.email
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
              if (!isSuccess) {
                return alert("FAILED TO PROMOTE ADMIN");
              }
              return alert(`${username} PROMOTED TO ADMIN`);
            }}
          >
            Promote To Admin
          </button>

          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await removeAdmin(
                _isOwner,
                username,
                userDetails.email
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
              if (!isSuccess) {
                return alert("FAILED TO REMOVE ADMIN");
              }
              return alert(`${username} REMOVED FROM ADMIN`);
            }}
          >
            Remove Admin
          </button>

          <button
            className={BUTTON_STYLE}
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await resetUserPassword(
                _isOwner,
                username,
                userDetails.email
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
            }}
          >
            Reset User Password
          </button>
        </div>
      ) : null}
    </ActionButtonsContainer>
  );
};

export default ActionButtons;
