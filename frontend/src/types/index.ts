interface UserProfileTS {
  password?: string;
  first_name: string;
  last_name: string;
  image: string;
  color: number;
  email: string;
  profile_setup: boolean;
  _id: string;
}
interface AuthSliceTS {
  userInfo: UserProfileTS | null;
  setUserInfo: (userInfo: UserProfileTS) => void;
}

export type { UserProfileTS, AuthSliceTS };
