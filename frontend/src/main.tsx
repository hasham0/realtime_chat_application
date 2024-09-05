import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./providers/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <QueryProvider>
      <App />
      <Toaster closeButton={true} />
    </QueryProvider>
  </>,
);
