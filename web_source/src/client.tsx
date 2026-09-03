import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashHistory } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
router.update({
  history: createHashHistory(),
});

(window as any).__onAndroidBack = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("/play/")) {
    router.navigate({ to: "/levels" });
    return true;
  } else if (hash === "/levels" || hash === "/settings" || hash === "/achievements") {
    router.navigate({ to: "/" });
    return true;
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);
