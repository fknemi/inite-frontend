import { atom, RecoilState } from "recoil";
import { Atoms, NotificationSettings } from "../@types/types";

let user = JSON.parse(localStorage.getItem("user") as string);

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
    localStorage.getItem("redirect") === "/dashboard" ? "/dashboard" : "/login",
});
export const loggedInStatusAtom = atom({
  key: "loggedInStatus",
  default: false,
});
export const loginAtom = atom({
  key: "login",
  default: {
    email: "test@gmail.com",
    password: "test",
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
  default: user || {},
});
export const instagramUserAtom = atom({
  key: "instagramUser",
  default: JSON.parse(localStorage.getItem("instagramUser") as string) || {},
});
export const followingAtom = atom({
  key: "following",
  default:
    user && user.following
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
  default: JSON.parse(localStorage.getItem("user") as string).notifications || {
    newAccountNameChange: true,
    newPosts: true,
    newFollowers: true,
    startedFollowingNewUsers: true,
    newBiography: true,
    newAvatar: true,
    newAccountPrivacyChange: true,
  },
});
