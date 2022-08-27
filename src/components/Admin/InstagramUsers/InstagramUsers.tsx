import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getInstagramUsers } from "../../../api/admin/admin";
import { adminAtom, instagramUsersAtom } from "../../../statedrive/atoms";
import InstagramUser from "./InstagramUser";

const InstagramUsers = ({ timeFormat }: { timeFormat: boolean }) => {
  const [instagramUsers, setInstagramUsers] = useRecoilState(instagramUsersAtom);
  const [admin, setAdmin] = useRecoilState(adminAtom);

  useEffect(() => {
    (async () => {
      const { isSuccess, data }: any = await getInstagramUsers();
      if (isSuccess) {
        return setInstagramUsers(data);
      }
      return setInstagramUsers([]);
    })();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        {instagramUsers.map((user: any) => {
          return (
            <InstagramUser
              key={user.username}
              isOwner={admin.isOwner || false}
              instagramUser={user}
              timeFormat={timeFormat}
            />
          );
        })}
      </div>
    </>
  );
};

export default InstagramUsers;
