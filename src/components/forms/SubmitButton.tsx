import { useFormContext } from "@/hooks/form-context";

type SubmitButtonProps = {
  label: string;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          {props.label}
        </button>
      )}
    </form.Subscribe>
  );
}
