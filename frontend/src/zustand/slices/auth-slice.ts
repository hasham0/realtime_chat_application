import { AuthSliceTS, UserProfileTS } from "@/types";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthSliceTS> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: UserProfileTS) => set(() => ({ userInfo })),
});

export default createAuthSlice;
