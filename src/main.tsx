import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <div>
      <h1>You kidding ?? It is not found 🤣</h1>
      <Link to="/">Go home bro</Link>
    </div>
  ),
});

// we need to declare and register router instance for actual type safety in TS
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
