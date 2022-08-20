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

export interface RecentChanges {
  name: { isRecent: Boolean; value: string | undefined };
  biography: { isRecent: Boolean; value: string | undefined };
  avatar: { isRecent: Boolean; value: string | undefined };
  isPrivate: { isRecent: Boolean; value: string | undefined };
  followedByCount: { isRecent: Boolean; value: string | undefined };
  followingCount: { isRecent: Boolean; value: string | undefined };
  postsCount: { isRecent: Boolean; value: string | undefined };
}
