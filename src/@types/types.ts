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
