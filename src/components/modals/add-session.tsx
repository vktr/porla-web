import { useAddSessionMutation } from "@/api/jsonrpc";
import { useAppForm } from "@/hooks/form";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { House, LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { z } from "zod";

type AddSessionProps = {
  open: boolean;
  onClose: (didAdd: boolean) => void;
}

export default function AddSession(props: AddSessionProps) {
  const sessionsAdd = useAddSessionMutation();

  const form = useAppForm({
    defaultValues: {
      name: `session-${new Date().getSeconds()}`,
      settings_preset: "default"
    },
    validators: {
      onChange: z.object({
        name: z.string().max(30),
        settings_preset: z.union([
          z.literal("default"),
          z.literal("min_memory_usage"),
          z.literal("high_performance_seed")
        ])
      })
    },
    onSubmit: async ({ value }) => {
      await sessionsAdd.mutateAsync({
        name: value.name,
        settings: {}
      });

      props.onClose(true);
      form.reset();
    }
  });

  return (
    <Dialog open={props.open} onClose={() => props.onClose(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-700/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}

            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100">
                  <House aria-hidden="true" className="size-6 text-blue-700" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-lg font-semibold text-gray-300">
                    Add session
                  </DialogTitle>
                  <div className="mt-2 space-y-5">
                    <Suspense fallback={<div className="h-[182px] flex items-center justify-center text-gray-300"><LoaderCircle className="size-8 animate-spin" /></div>}>
                      <form.AppField
                        name="name"
                        children={(field) => <field.TextField label="Session name" />}
                      />

                      <form.AppField
                        name="settings_preset"
                        children={(field) => (
                          <label className="flex flex-col">
                            <div className="text-left font-medium text-gray-300 mb-2">
                              Settings
                            </div>
                            <select
                              className="grow w-full appearance-none rounded-md border border-gray-700 dark:bg-gray-700 dark:text-white p-3 text-base outline outline-gray-500 focus:outline-gray-300"
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              value={field.state.value}
                            >
                              <option value="default">Default</option>
                              <option value="min_memory_usage">Min. memory usage</option>
                              <option value="high_performance_seed">High performance seed</option>
                            </select>
                          </label>
                        )}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-700 p-3 text-sm font-semibold text-white shadow-sm hover:outline hover:outline-blue-500 cursor-pointer"
                  disabled={!form.state.isValid || form.state.isSubmitted}
                >
                  Add
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}