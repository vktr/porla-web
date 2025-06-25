import { useGetSessionSettings } from '@/api/jsonrpc';
import type { SessionsSettingsGetData } from '@/api/types';
import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from "react";

export const Route = createFileRoute(
  '/_auth/settings/sessions/$session/_layout/',
)({
  component: RouteComponent
})

function RouteComponent() {
  const { session } = Route.useParams();
  const { section } = Route.useSearch();

  const sessionSettings = useGetSessionSettings({ name: session });

  return (
    <div>
      <div className="m-5 border rounded border-gray-700 bg-gray-800">
        <div className="p-5 flex justify-between items-center border-b border-b-gray-700">
          <h2 className="font-medium text-white text-lg">{session}</h2>
          <span>save</span>
        </div>

        {sessionSettings.isLoading && <p>Loading settings</p>}

        {!sessionSettings.isLoading && sessionSettings.data && (
          <Settings data={sessionSettings.data.settings} />
        )}
      </div>
    </div>
  )
}

type SettingsProps = {
  data: SessionsSettingsGetData;
}

function Settings(props: SettingsProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] m-5 space-y-5">
      {Object.entries(props.data).map(k => (
        <Fragment key={k[0]}>
          <div className="text-white font-medium text-base/8">{k[0]}</div>
          <div className="text-gray-300">
            <input className="w-full outline outline-gray-500 focus:outline-gray-300 dark:bg-gray-700 text-white p-1 rounded-md" type="text" value={k[1]} />
            <div className="mt-2 text-gray-500 text-sm">description</div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
