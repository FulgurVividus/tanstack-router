# TanStack Router Tutorial (v1+)

## 🚦 What is TanStack Router?

TanStack Router (formerly React Location) is a powerful, typesafe, file-agnostic router for React apps. Unlike React Router, it's fully type-safe, data-first, and works seamlessly with TanStack Query.

> ✅ Latest version supports full TypeScript, nested layouts, route loaders, error boundaries, and more.

---

## ⚙️ Installation

```bash
npm install @tanstack/react-router
```

> Make sure you're using React 18+

---

## 📁 Folder Structure (Example)

```
src/
├── routes/
│   ├── index.tsx
│   └── about.tsx
├── App.tsx
└── main.tsx
```

---

## 🧭 1. Define Routes

### routes/index.tsx

```tsx
import { Outlet } from "@tanstack/react-router";

export const Index = () => {
  return (
    <div>
      <h1>Welcome to Home!</h1>
    </div>
  );
};

export const indexRoute = {
  path: "/",
  component: Index,
};
```

### routes/about.tsx

```tsx
export const About = () => {
  return <h1>About Page</h1>;
};

export const aboutRoute = {
  path: "/about",
  component: About,
};
```

---

## 🗺 2. Create Router

### App.tsx

```tsx
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";

import { indexRoute } from "./routes/index";
import { aboutRoute } from "./routes/about";

const rootRoute = new RootRoute({
  component: () => (
    <div>
      <h1>My App</h1>
      <hr />
      <Outlet />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: indexRoute.component,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: aboutRoute.component,
  }),
]);

const router = new Router({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
```

---

## 🧩 3. Setup Main Entry

### main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🔄 Navigating Between Routes

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

---

## 📦 Route Loaders (Data Fetching)

```tsx
const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/users",
  loader: async () => {
    const res = await fetch("/api/users");
    return res.json();
  },
  component: ({ useLoader }) => {
    const users = useLoader();
    return (
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    );
  },
});
```

---

## ❌ Error Boundaries

```tsx
const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/error-test",
  component: () => {
    throw new Error("Oops");
  },
  errorComponent: ({ error }) => <p>Error: {error.message}</p>,
});
```

---

## ⚙️ Params & Dynamic Routing

```tsx
const userRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/user/:userId",
  component: ({ params }) => {
    return <div>User ID: {params.userId}</div>;
  },
});
```

---

## 🔁 Redirects

```tsx
import { redirect } from "@tanstack/react-router";

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  loader: async () => {
    const isAuth = false;
    if (isAuth) throw redirect({ to: "/" });
  },
  component: () => <div>Login Page</div>,
});
```

---

## 🧠 Summary

- ✅ Type-safe routes & navigation
- 📦 Built-in route loaders
- 🔥 SSR/streaming ready
- 🔄 Built-in error handling
- ⚛️ Seamless React integration
