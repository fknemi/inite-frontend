import instance from "../axios";
import { addInstagramUser } from "../instagram/instagram";
import { AxiosError } from "axios";
import axios from "axios";
import { NotificationSettings } from "../../@types/types";

export const register = async (
  name: string,
  username: string,
  email: string,
  password: string,
  gender: string
) => {
  const req = await instance.post("/user/register", {
    name,
    username,
    email,
    password,
    gender,
  });
  if (req.status === 200) {
    return true;
  }
  return false;
};

export const login = async (email: string, password: string) => {
  const req = await instance.post("/user/login", {
    email,
    password,
  });

  if (req.status === 200) {
    return { isSuccess: true, user: req.data };
  }
  return { isSuccess: false, user: {} };
};

export const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("x-token");
  localStorage.removeItem("x-refresh-token");
  localStorage.removeItem("notifications");
  localStorage.removeItem("userChanges");
  localStorage.removeItem("recentChanges");
  localStorage.removeItem("readNotifications");
  localStorage.removeItem("instagramUser");
};

export const verifyEmailToken = async (token: string) => {
  try {
    const req = await instance.post("/user/account/email/verify/token", {
      token: token,
    });

    if (req.status === 200) {
      return { isSuccess: true, message: "Email Verified" };
    }
  } catch (err: any) {
    if (
      err.response.status === 404 &&
      err.response.data.name === "TokenExpiredError"
    ) {
      return { isSuccess: false, message: "Token Expired" };
    }

    if (err.response.status === 404) {
      return { isSuccess: false, message: "Invalid Token" };
    }
    if (err.response.status === 400) {
      return { isSuccess: false, message: "Email has already been verified" };
    }
  }
  return { isSuccess: false, message: "Invalid Token" };
};

export const verifyEmail = async () => {
  try {
    const req = await instance.post("/user/account/email/verify", {});

    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
};

export const fetchUser = async () => {
  try {
    const req = await instance.post("/user/get");
    if (req.status === 200) {
      localStorage.setItem("user", JSON.stringify(req.data));
      return { isSuccess: true, data: req.data };
    }
  } catch {
    return { isSuccess: false, data: {} };
  }
  return { isSuccess: false, data: {} };
};

export const followInstagramUser = async (instagramUser: {
  username: string;
}) => {
  try {
    const req: any = await instance.post("/user/instagram/follow", {
      ...instagramUser,
    });

    if (req.status === 200) {
      return true;
    }
  } catch (err: any) {
    return false;
  }
  return false;
};

export const unfollowInstagramUser = async (username: string) => {
  try {
    const req = await instance.post("/user/instagram/unfollow", {
      username,
    });

    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

export const resetUserPassword = async (email: string) => {
  try {
    const req = await instance.post("/account/forgot/password", {
      email,
    });
    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

export const verifyPasswordToken = async (token: string) => {
  try {
    const req = await instance.post("/account/verify/password/token", {
      token,
    });
    if (req.status === 200) {
      return { isSuccess: true, _message: "" };
    }
  } catch (err: any) {
    if (
      err.response.status === 400 &&
      err.response.data.name === "TokenExpiredError"
    ) {
      return {
        isSuccess: false,
        _message: "The password reset link has expired. Please try again.",
      };
    }
    return {
      isSuccess: false,
      _message: "",
    };
  }
  return {
    isSuccess: false,
    _message: "",
  };
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const req = await instance.post("/user/account/reset/password", {
      token,
      password,
    });
    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

export const updateNotificationSettings = async (
  notificationSettings: NotificationSettings
) => {
  try {
    const req = await instance.post("/user/update/settings/notifications", {
      notifications: notificationSettings,
    });
    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const req = await instance.post("/user/update/password", {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    if (req.status === 200) {
      return {
        isSuccess: true,
        _message: "",
      };
    }
  } catch (err) {
    err = (err as { [key: string]: { [key: string]: string } }).response.data;
    if (err === "SamePassword") {
      return {
        isSuccess: false,
        _message: "Old Password cannot be the same as New Password",
      };
    }
    if (err === "InvalidPassword") {
      return {
        isSuccess: false,
        _message: "Invalid Password",
      };
    }
    if (err === "PasswordsDoNotMatch") {
      return {
        isSuccess: false,
        _message: "Passwords Do Not Match",
      };
    }
  }

  return { isSuccess: false, _message: "" };
};
export const updateEmailSettings = async (notifyEmail: boolean) => {
  try {
    const req = await instance.post("/update/email/settings", { notifyEmail });
    if (req.status === 200) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
