import useStore from "@/zustand/store/store";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { toast } from "sonner";

export default function AuthRoute({ children }: { children: ReactNode }) {
  const { userInfo } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const isProfileCompleted = !!(userInfo && userInfo.profile_setup);

    if (isProfileCompleted) {
      return navigate("/chat");
    } else {
      if (userInfo) {
        toast("already login please complete profile to continue...");
        return navigate("/profile");
      }
    }
  }, [navigate, userInfo]);

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
