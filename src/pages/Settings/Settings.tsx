import React from "react";
import Notifications from "../../components/Notifications";
import UpdatePassword from "../../components/UpdatePassword";

const Settings = () => {
  return (
    <div>
      Settings
      <div className="flex self-start justify-start">
        {/* <Notifications /> */}
        <UpdatePassword />
      </div>
    </div>
  );
};

export default Settings;
