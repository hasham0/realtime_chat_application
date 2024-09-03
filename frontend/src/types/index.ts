interface UserProfileTS {
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  password: string;
  profile_setup: boolean;
  _id: string;
}
interface AuthSliceTS {
  userInfo: UserProfileTS | undefined;
  setUserInfo: (userInfo: UserProfileTS) => void;
}

export type { UserProfileTS, AuthSliceTS };
