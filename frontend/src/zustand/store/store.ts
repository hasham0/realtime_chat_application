import { create } from "zustand";
import { AuthSliceTS } from "@/types";
import createAuthSlice from "../slices/auth-slice";

const useAppStore = create<AuthSliceTS>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useAppStore;
