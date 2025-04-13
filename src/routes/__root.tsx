import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/about"}>About</Link>
      </nav>
      <Outlet />
      <footer>Copyright ©{new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}
