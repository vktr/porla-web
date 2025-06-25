import { Plus } from "lucide-react";

type IconButtonProps = {
  onClick?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      className="size-10 cursor-pointer hover:outline hover:outline-blue-500 dark:bg-blue-700 flex items-center justify-center rounded-md"
      onClick={props.onClick}
    >
      <Plus />
    </button>
  )
}