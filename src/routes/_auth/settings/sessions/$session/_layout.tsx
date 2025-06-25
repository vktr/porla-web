import { useJsonRpc, useMutateMethod } from '@/api/jsonrpc'
import IconButton from '@/components/icon-button';
import AddSession from '@/components/modals/add-session';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { House } from "lucide-react";
import { useState } from 'react';

export const Route = createFileRoute('/_auth/settings/sessions/$session/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useParams();

  const navigate = useNavigate();
  const [addSessionOpen, setAddSessionOpen] = useState(false);

  const sessionsList = useJsonRpc("sessions.list");
  const sessionsRemove = useMutateMethod("sessions.remove");

  return (
    <div>
      <AddSession
        onClose={async (didAdd) => {
          if (didAdd) {
            await sessionsList.refetch();
          }
          setAddSessionOpen(false);
        }}
        open={addSessionOpen}
      />

      <div className="border-b border-b-gray-800 dark:text-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex p-4 space-x-4 items-center">
            <House />
            <h1 className='text-lg font-medium'>Sessions</h1>
          </div>

          <div className="flex space-x-4 pr-4">
            <select
              disabled={sessionsList.isLoading}
              className="grow w-full appearance-none rounded-md border border-gray-700 dark:bg-gray-800 dark:text-gray-300 py-1.5 pl-3 pr-8 text-base -outline-offset-1 outline-gray-300"
              value={session}
              onChange={e => {
                navigate({ to: "/settings/sessions/$session", params: { session: e.target.value } })
              }}
            >
              {sessionsList.data && sessionsList.data.sessions.map((s: any) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
            <div>
              <IconButton onClick={() => setAddSessionOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}
