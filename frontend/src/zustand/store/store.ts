import { create } from "zustand";
import { AuthSliceTS } from "@/types";
import createAuthSlice from "../slices/auth-slice";

const useStore = create<AuthSliceTS>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore;
