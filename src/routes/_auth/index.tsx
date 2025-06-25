import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Link to="/settings/sessions">Session settings</Link>
    </div>
  )
}
