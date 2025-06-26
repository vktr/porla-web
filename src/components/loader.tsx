import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="h-[182px] flex items-center justify-center text-gray-300">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  );
}
