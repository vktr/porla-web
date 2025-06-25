import { useFieldContext } from "@/hooks/form-context";

type PasswordFieldProps = {
  label: string;
};

export default function PasswordField(props: PasswordFieldProps) {
  const field = useFieldContext<string>();

  return (
    <fieldset>
      <label>{props.label}</label>
      <input
        type="password"
        className="border"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </fieldset>
  );
}
