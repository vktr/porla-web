import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { useAppForm } from "@/hooks/form";
import { Suspense } from "react";
import { useAuthLogin } from "@/api/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const authLogin = useAuthLogin();
  const navigate = useNavigate();

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onChange: z.object({
        username: z.string(),
        password: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      await authLogin.mutateAsync(value);
      await navigate({ to: "/" });
    },
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
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
          <form.SubmitButton label="Sign in" />
        </form.AppForm>
      </form>
    </Suspense>
  );
}
