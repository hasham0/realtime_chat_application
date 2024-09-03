import { Navigate, Outlet } from "react-router-dom";
import useStore from "../zustand/store/store";

export default function AuthRoute() {
  const { userInfo } = useStore();
  console.log("userInfo => ", userInfo);
  return userInfo !== undefined ? <Navigate to={"/chat"} /> : <Outlet />;
}
