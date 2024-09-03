import { Outlet, Navigate } from "react-router-dom";
import useStore from "../zustand/store/store";

export default function PrivateRoute() {
  const { userInfo } = useStore();
  console.log("userInfo => ", userInfo && userInfo.profile_setup);

  return userInfo && userInfo.profile_setup !== undefined ? (
    <Navigate to={"/profile"} />
  ) : (
    <Outlet />
  );
}
