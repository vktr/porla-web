import { useJsonRpc } from "@/api/jsonrpc";
import Sidebar from "@/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

type SystemStatusQueryType = {
  status: "ok" | "setup";
};

function RouteComponent() {
  const systemQuery = useQuery<SystemStatusQueryType>({
    queryFn: () => fetch("/api/v1/system").then((r) => r.json()),
    queryKey: ["system"],
  });

  if (systemQuery.isLoading) {
    return <p>Loading system status</p>;
  }

  if (systemQuery.data?.status === "setup") {
    return <Navigate to="/setup" />
  }

  return <Versions />
}

function Versions() {
  const versionsQuery = useJsonRpc("sys.versions");

  if (versionsQuery.isLoading) {
    return <p>Loading Porla</p>
  }

  // TODO: better 401 handling
  if (versionsQuery.error?.message.includes("401")) {
    return <Navigate to="/login" />
  }

  return <MainLayout />
}

function MainLayout() {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
}
