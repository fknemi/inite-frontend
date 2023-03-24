import { atom, RecoilState } from "recoil";

import {
  ADMIN,
  Atoms,
  INSTAGRAM_USER,
  LOG,
  NotificationSettings,
  REPORT,
  USER,
} from "../@types/types";
import { parseJSON } from "../common/utils";

let user = parseJSON(localStorage.getItem("user") as string) || {};
let admin = parseJSON(localStorage.getItem("admin") as string) || {};
let instagramUser =
  parseJSON(localStorage.getItem("instagramUser") as string) || {};

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
export const loggedInStatusAtom = atom({
  key: "loggedInStatus",
  default: parseJSON(localStorage.getItem("user") as string),
});
export const loginAtom = atom({
  key: "login",
  default: {
    email: "",
    password: "",
  },
});
export const tokensAtom = atom({
  key: "tokens",
  default: {
    token: localStorage.getItem("x-token") || "",
    refreshToken: localStorage.getItem("x-refresh-token") || "",
  },
});

export const userAtom = atom<USER>({
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
export const instagramUsersAtom = atom<INSTAGRAM_USER[] | []>({
  key: "instagramUsers",
  default: [],
});
export const usersAtom = atom<USER | []>({
  key: "users",
  default: [],
});
export const showReportModalAtom = atom<boolean>({
  key: "reportUser",
  default: false,
});
export const readReportsIDsAtom = atom<Set<string>>({
  key: "readReportsIDs",
  default: new Set(parseJSON("readReportsIDs")) || new Set([]),
});
export const notificationsAtom = atom<any[]>({
  key: "notifications",
  default: parseJSON(localStorage.getItem("notifications") as string) || [],
});
export const showNotificationsAtom = atom<Set<string>>({
  key: "showNotifications",
  default: new Set([]),
});

export const newNotificationsAlertAtom = atom({
  key: "newNotificationsAlert",
  default: localStorage.getItem("newNotificationsAlert") || false,
});
export const reportsAtom = atom<REPORT[] | []>({
  key: "reports",
  default: parseJSON(sessionStorage.getItem("reports") as string) || [],
});
export const readReportsAtom = atom<REPORT[] | []>({
  key: "readReports",
  default: parseJSON(sessionStorage.getItem("readReports") as string) || [],
});

export const logsAtom = atom<LOG[] | []>({
  key: "logs",
  default: parseJSON(sessionStorage.getItem("logs") as string) || [],
});
export const deleteMultipleReportIdsAtom = atom<Set<string>>({
  key: "deleteMultipleReportIds",
  default: new Set([]),
});
export const deleteMultipleLogsIdsAtom = atom<Set<string>>({
  key: "deleteMultipleLogsIds",
  default: new Set([]),
});
