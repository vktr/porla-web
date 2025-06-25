import { lazy } from "react";

import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/hooks/form-context";

const PasswordField = lazy(() => import("@/components/forms/PasswordField.tsx"))
const SubmitButton = lazy(() => import("@/components/forms/SubmitButton.tsx"))
const TextField = lazy(() => import("@/components/forms/TextField.tsx"))

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
