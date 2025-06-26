import { useGetSessionSettings } from "@/api/jsonrpc";
import type { SessionsSettingsGetData } from "@/api/types";
import Loader from "@/components/loader";
import { useAppForm } from "@/hooks/form";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, Suspense } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute(
  "/_auth/settings/sessions/$session/_layout/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useParams();
  const sessionSettings = useGetSessionSettings({ name: session });

  const form = useAppForm({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="m-5 border rounded border-gray-700 bg-gray-800">
        <div className="p-5 flex justify-between items-center border-b border-b-gray-700">
          <h2 className="font-medium text-white text-lg">{session}</h2>

          <form.AppForm>
            <form.SubmitButton label="Save" />
          </form.AppForm>
        </div>

        {sessionSettings.isLoading && <Loader />}

        {!sessionSettings.isLoading && sessionSettings.data && (
          <Suspense fallback={<Loader />}>
            <Settings data={sessionSettings.data.settings} />
          </Suspense>
        )}
      </div>
    </form>
  );
}

type SettingsProps = {
  data: SessionsSettingsGetData;
};

function Settings(props: SettingsProps) {
  const { t } = useTranslation("libtorrent");

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="grid grid-cols-[auto_1fr] m-5 space-y-5">
        {Object.entries(props.data).map((k) => (
          <Fragment key={k[0]}>
            <div className="text-white font-medium text-base/8">{k[0]}</div>
            <div className="text-gray-300">
              <input
                className="w-full outline outline-gray-500 focus:outline-gray-300 dark:bg-gray-700 text-white p-1 rounded-md"
                type="text"
                value={k[1]}
              />
              <div className="mt-2 text-gray-500 text-sm">
                {t(`descriptions.${k[0]}`)}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </Suspense>
  );
}
