import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/settings/sessions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/settings/sessions/$session" params={{ session: "default" }} />
}
