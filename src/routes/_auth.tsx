import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      navigate({ to: "/login" });
    }
  }, []);

  if (token) {
    return <Outlet />
  }
}
