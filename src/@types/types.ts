export interface Atoms {
  registerForm: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
  };
}

export interface Props {
  children: React.ReactNode;
}

export interface NotificationSettings {
  [key: string]: boolean;
  newAccountNameChange: boolean;
  newPosts: boolean;
  newFollowers: boolean;
  startedFollowingNewUsers: boolean;
  newBiography: boolean;
  newAvatar: boolean;
  newAccountPrivacyChange: boolean;
}

export interface NotificationsDescriptions {
  [key: string]: { name: string; desc: string };
  newAccountNameChange: {
    name: string;
    desc: string;
  };
  newPosts: {
    name: string;
    desc: string;
  };
  newFollowers: {
    name: string;
    desc: string;
  };
  startedFollowingNewUsers: {
    name: string;
    desc: string;
  };
  newBiography: {
    name: string;
    desc: string;
  };
  newAvatar: {
    name: string;
    desc: string;
  };
  newAccountPrivacyChange: {
    name: string;
    desc: string;
  };
}

export interface RecentChanges {
  name: { isRecent: boolean; value: string | undefined };
  biography: { isRecent: boolean; value: string | undefined };
  avatar: { isRecent: boolean; value: string | undefined };
  isPrivate: { isRecent: boolean; value: string | undefined };
  followedByCount: { isRecent: boolean; value: string | undefined };
  followingCount: { isRecent: boolean; value: string | undefined };
  postsCount: { isRecent: boolean; value: string | undefined };
}

export type changedUser = {
  username: string;
  name:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  biography:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  avatar:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  isPrivate:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  followedByCount:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  followingCount:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  postsCount:
    | {
        didChange: boolean;
        newValue: string;
        oldValue: string;
      }
    | undefined;
  timestamp: number;
  id: string;
};

export type getUser = Promise<{
  username: string;
  data: changedUser[];
  following: string[];
}>;










export interface USER {
  name: string;
  password: string;
  username: string;
  avatar: string;
  email: string;
  gender: string;
  emailVerified: boolean;
  instagramVerified: boolean;
  media: [];
  followLimit: number;
  followingCount: number;
  following: { instagramUser: INSTAGRAM_USER; timestamp: string }[];
  followingHistory: { instagramUser: INSTAGRAM_USER; timestamp: string }[];
  isBanned: boolean;
  banReason: string;
  reports: REPORT[];
  instagramProfile: INSTAGRAM_USER;
  isAdmin: ADMIN;
  isOwner: OWNER;
  notifyEmail: boolean;
  notifications: NotificationSettings;
  timestamp: string;
}

export interface INSTAGRAM_USER {
  name: string;
  username: string;
  biography: {
    recent: boolean;
    text: string;
    externalUrls: string[];
    timestamp: string;
  }[];
  avatars: { url: string; recent: boolean; timestamp: string }[];
  isPrivate: boolean;
  media: {
    type: { [key: string]: any; type: string; url: string; timestamp: string };
  }[];
  postsCount: number;
  followingCount: number;
  followedByCount: number;
  isBanned: boolean;
  isCollect: boolean;
  recentlyAdded: boolean;
  followedBy: { user: USER; timestamp: string }[];
}

export interface REPORT {
  userInfo: USER;
  reason: string;
  description: string;
  accountReported: INSTAGRAM_USER;
  accountReportedUsername: string;
  readStatus: boolean;
  timestamp: string;
}

export interface ADMIN {
  userInfo: USER;
  isAdmin: boolean;
  adminPermissions: {
    banUser: boolean;
    unbanUser: boolean;
    banInstagramUser: boolean;
    unbanInstagramUser: boolean;
  };
}
export interface OWNER {
  userInfo: USER;
  isAdmin: boolean;
  ownerPermissions: {
    changeSelfUsername: boolean;
    deleteUser: boolean;
    deleteInstagramUser: boolean;
    deleteInstagramUserMedia: boolean;
  };
}
