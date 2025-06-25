import { useFieldContext } from "@/hooks/form-context";

type TextFieldProps = {
  label: string;
};

export default function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label className="flex flex-col">
        <div className="text-left font-medium text-gray-300 mb-2">
          {props.label}
        </div>

        <input
          type="text"
          className="outline outline-gray-500 focus:outline-gray-300 dark:bg-gray-700 text-white p-3 rounded-md"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </label>

    </div>
  );
}
