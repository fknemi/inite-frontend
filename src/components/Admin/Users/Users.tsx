import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getUsers } from "../../../api/admin/admin";
import { adminAtom, usersAtom } from "../../../statedrive/atoms";
import User from "./User";

const Users = ({ timeFormat }: { timeFormat: boolean }) => {
  const [users, setUsers]: any = useRecoilState(usersAtom);
  const [admin, setAdmin] = useRecoilState(adminAtom);

  useEffect(() => {
    (async () => {
      const { isSuccess, data }: any = await getUsers();

      if (isSuccess) {
        return setUsers(data);
      }
      return setUsers([]);
    })();
  }, []);

  return (
    <>
      {users.map((user: any) => {
        return (
          <User
            key={user.username}
            _isOwner={admin.isOwner}
            user={user}
            timeFormat={timeFormat}
          />
        );
      })}





      
    </>
  );
};

export default Users;
