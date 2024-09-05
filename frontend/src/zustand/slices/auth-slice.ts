import { AuthSliceTS, UserProfileTS } from "@/types";
import { StateCreator } from "zustand";

const localUserData: UserProfileTS = JSON.parse(
  localStorage.getItem("userData")!,
);

export const createAuthSlice: StateCreator<AuthSliceTS> = (set) => ({
  userInfo: localUserData || null,
  setUserInfo: (userInfo: UserProfileTS) => set(() => ({ userInfo })),
});

export default createAuthSlice;
