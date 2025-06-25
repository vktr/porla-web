import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppForm } from "@/hooks/form";
import axios from "axios";

export const Route = createFileRoute("/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const authInit = useMutation({
    mutationFn: (data: any) => axios.post("/api/v1/auth/init", data),
    mutationKey: ["auth-init"],
  });

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authInit.mutateAsync(value);
      await navigate({ to: "/login" });
    },
  });

  return (
    <Suspense fallback={<p>Loading setup form</p>}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="username"
          children={(field) => <field.TextField label="Username" />}
        />

        <form.AppField
          name="password"
          children={(field) => <field.PasswordField label="Password" />}
        />

        <form.AppForm>
          <form.SubmitButton label="Create user account" />
        </form.AppForm>
      </form>
    </Suspense>
  );
}
