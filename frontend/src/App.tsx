import { lazy, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import AuthRoute from "./routes/AuthRoute";
import PrivateRoute from "./routes/PrivateRoute";
import useAppStore from "./zustand/store/store";
import ApiClient from "./lib/api-client";
import { UserProfileTS } from "./types";
import { USER_INFO_ROUTE } from "./utils/constants";

const Chat = lazy(() => import("@/pages/chat/Chat"));
const Profile = lazy(() => import("@/pages/profile/Profile"));

function App() {
  const { setUserInfo } = useAppStore();
  const localUserData: UserProfileTS = JSON.parse(
    localStorage.getItem("userData")!,
  );

  useEffect(() => {
    if (localUserData && localUserData.password) {
      const getUserData = async (): Promise<void> => {
        console.log("first");
        const data = await ApiClient.get<{
          message: string;
          data: UserProfileTS;
        }>(USER_INFO_ROUTE, {
          withCredentials: true,
        });
        console.log(data.data.data);
        const { data: newUserData } = data.data;
        setUserInfo(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
      };
      getUserData();
    }
    // return () => {
    //   setUserInfo(localUserData);
    // };
  }, [localUserData, setUserInfo]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
