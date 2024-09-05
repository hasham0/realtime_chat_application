import { useNavigate } from "react-router-dom";
import useAppStore from "../zustand/store/store";
import { ReactNode, useEffect } from "react";
import { Suspense } from "react";
import { toast } from "sonner";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!userInfo;
    if (!isAuthenticated) {
      toast("please login...");
      return navigate("/auth");
    }

    const isProfileCompleted = !!(userInfo && userInfo.profile_setup);

    if (!isProfileCompleted) {
      toast("please complete profile to continue...");
      return navigate("/profile");
    }
  }, [navigate, userInfo]);

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
