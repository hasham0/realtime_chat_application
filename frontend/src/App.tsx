import { lazy, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
const Chat = lazy(() => import("@/pages/chat"));
const Profile = lazy(() => import("@/pages/profile"));

function App() {
  const [view, setview] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setview(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <div className="fixed top-0 z-40 h-20 w-full bg-black py-5 text-center text-2xl sm:bg-violet-700 md:bg-red-700 lg:bg-green-700 xl:bg-pink-700 2xl:bg-blue-700">
        {view}
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
