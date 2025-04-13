import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Contact Page</h1>
    </div>
  );
}
