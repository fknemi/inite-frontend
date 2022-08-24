import { atom, RecoilState } from "recoil";
import {
  ADMIN,
  Atoms,
  INSTAGRAM_USER,
  NotificationSettings,
  USER,
} from "../@types/types";

const parseJSON = (item: string) => {
  try {
    return JSON.parse(item);
  } catch {
    return {};
  }
};

let user = localStorage.getItem("user")
  ? parseJSON(localStorage.getItem("user") as string)
  : {};
let admin = localStorage.getItem("admin")
  ? parseJSON(localStorage.getItem("admin") as string)
  : {};
let instagramUser = localStorage.getItem("instagramUser")
  ? parseJSON(localStorage.getItem("instagramUser") as string)
  : {};

export const registerAtom: RecoilState<Atoms["registerForm"]> = atom({
  key: "register",
  default: {
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
  },
});
export const redirectAtom = atom({
  key: "redirect",
  default:
    localStorage.getItem("redirect") === "/dashboard"
      ? "/dashboard"
      : "/account/login",
});
export const loggedInStatusAtom = atom({
  key: "loggedInStatus",
  default: false,
});
export const loginAtom = atom({
  key: "login",
  default: {
    email: "owner@gmail.com",
    password: "1234",
  },
});
export const tokensAtom = atom({
  key: "tokens",
  default: {
    token: localStorage.getItem("x-token") || "",
    refreshToken: localStorage.getItem("x-refresh-token") || "",
  },
});

export const userAtom = atom({
  key: "user",
  default: user,
});
export const instagramUserAtom = atom({
  key: "instagramUser",
  default: instagramUser,
});
export const followingAtom = atom({
  key: "following",
  default:
    Object.keys(user).length && user.following
      ? user.following.map(
          (followedUser: { username: string }) => followedUser.username
        )
      : [],
});
export const recentChangesAtom = atom({
  key: "recentChanges",
  default: {
    name: { isRecent: false, value: undefined },
    biography: { isRecent: false, value: undefined },
    avatar: { isRecent: false, value: undefined },
    isPrivate: { isRecent: false, value: undefined },
    followedByCount: { isRecent: false, value: undefined },
    followingCount: { isRecent: false, value: undefined },
    postsCount: { isRecent: false, value: undefined },
  },
});
export const notificationSettingsAtom = atom<NotificationSettings>({
  key: "notificationSettings",
  default: Object.keys(user).length
    ? user.notifications || {
        newAccountNameChange: true,
        newPosts: true,
        newFollowers: true,
        startedFollowingNewUsers: true,
        newBiography: true,
        newAvatar: true,
        newAccountPrivacyChange: true,
      }
    : null,
});
export const notifyEmailAtom = atom<boolean>({
  key: "notifyEmail",
  default: user.notifyEmail || true,
});
export const adminAtom = atom<ADMIN>({
  key: "admin",
  default: {
    ...admin,
    loginTimestamp: parseInt(localStorage.getItem("loggedInAt") as string),
  },
});
