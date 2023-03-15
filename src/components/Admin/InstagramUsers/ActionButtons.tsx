import React, { useState } from "react";
import { banInstagramUser, unbanInstagramUser } from "../../../api/admin/admin";
import {
  deleteInstagramUser,
  deleteInstagramUserMedia,
  getInstagramUserDetails,
} from "../../../api/owner/owner";
import Details from "./Details";
import { useRecoilState } from "recoil";
import { instagramUsersAtom } from "../../../statedrive/atoms";
import { ActionButtonsContainer } from "../Users/ActionButtons";





















const ActionButtons = ({
  _isBanned,
  _isOwner,
  username,
}: {
  _isBanned: boolean;
  _isOwner: boolean;
  username: string;
}) => {
  const [isBanned, setIsBanned]: any = useState(_isBanned);
  const [isOwner, setIsOwner]: any = useState(_isOwner);
  const [deleteMedia, setDeleteMedia]: any = useState(undefined);
  const [instagramUserDetails, setInstagramUserDetails]: any = useState({});
  const [instagramUsers, setInstagramUsers] =
    useRecoilState(instagramUsersAtom);

  const [hideActions, setHideActions] = useState(false);
  return (
    <ActionButtonsContainer>
      <div>
        {!isBanned ? (
          <button
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await banInstagramUser(
                username
              );
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
            
            onClick={async () => {
              const { isSuccess, wasAuthorized } = await unbanInstagramUser(
                username
              );
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

        <div className={`${!isOwner ? "hidden" : ""}`}>
          <button
            
            onClick={async () => {
              const { isSuccess, wasAuthorized, data } =
                await getInstagramUserDetails(_isOwner, username);
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
              return setInstagramUserDetails(data);
            }}
          >
            Get User Details
          </button>
        </div>

        <div>
          <button
            
            onClick={async () => {
              setDeleteMedia(true);
              const { isSuccess, wasAuthorized } = await deleteInstagramUser(
                _isOwner,
                deleteMedia,
                username
              );
              if (!isSuccess && !wasAuthorized) {
                alert("NOT AUTHORIZED FOR THIS ACTION");
                setIsOwner(false);
                return setHideActions(true);
              }
              if (!isSuccess) {
                return console.log("USER NOT DELETED");
              }
              return setInstagramUsers(
                instagramUsers.filter((user: any) => user.username !== username)
              );
            }}
          >
            Delete Instagram User
          </button>
        </div>

        <button
          
          onClick={async () => {
            setDeleteMedia(true);
            const { isSuccess, wasAuthorized } = await deleteInstagramUserMedia(
              _isOwner,
              deleteMedia,
              username
            );

            if (!isSuccess && !wasAuthorized) {
              alert("NOT AUTHORIZED FOR THIS ACTION");
              setIsOwner(false);
              return setHideActions(true);
            }
            if (!isSuccess) {
              return console.log("USER MEDIA NOT DELETED");
            }
          }}
        >
          Delete Instagram User Media
        </button>

        {/* {isOwner ? <Details  instagramUserDetails={instagramUserDetails} /> : ""} */}
      </div>
    </ActionButtonsContainer>
  );
};
export default ActionButtons;
