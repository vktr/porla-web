import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

type SystemStatusQueryType = {
  status: "ok" | "setup";
};

function RouteComponent() {
  const navigate = useNavigate();

  const systemQuery = useQuery<SystemStatusQueryType>({
    queryFn: () => fetch("/api/v1/system").then((r) => r.json()),
    queryKey: ["system"],
  });

  const [token, setToken] = useState<string>();

  if (systemQuery.isLoading) {
    return <p>Loading system status</p>;
  }

  if (systemQuery.data?.status === "setup") {
    return <Navigate to="/setup" />
  }
  if (token) {
    return <Outlet />;
  }
}
