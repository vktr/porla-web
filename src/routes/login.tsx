import { createFileRoute } from '@tanstack/react-router'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'

import { SubmitButton } from '@/components/forms/SubmitButton';
import { TextField } from '@/components/forms/TextField';

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <form>

    </form>
  )
}
