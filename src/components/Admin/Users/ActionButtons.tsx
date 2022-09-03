import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { banUser, unbanUser } from "../../../api/admin/admin";
import {
  deleteUser,
  deleteUserMedia,
  getUserDetails,
} from "../../../api/owner/owner";
import { usersAtom } from "../../../statedrive/atoms";
import {
  resetUserPassword,
  promoteAdmin,
  removeAdmin,
} from "../../../api/owner/owner";

let BUTTON_STYLE = "mt-5 disabled:bg-gray-400 w-40 h-7 rounded-md bg-green-400";

const ActionButtons = ({ _isBanned, _isOwner, username }: any) => {
  const [isBanned, setIsBanned]: any = useState(_isBanned);
  const [isOwner, setIsOwner]: any = useState(_isOwner);
  const [deleteMedia, setDeleteMedia]: any = useState(undefined);
  const [users, setUsers]: any = useRecoilState(usersAtom);
  const [userDetails, setUserDetails]: any = useState({});
  const [hideActions, setHideActions] = useState(false);

  return (
    <div>
      <div className={`${hideActions ? "hidden" : ""} flex flex-col gap-2`}>
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

        <div className={`${!isOwner ? "hidden" : ""} flex flex-col gap-2`}>
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

              console.log(data);

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
      </div>
    </div>
  );
};

export default ActionButtons;
